import generator from "generate-password"
import { format } from "date-fns"

import { isSubscribed } from "../lib/isSubscribed"
import { sendEmailSG } from "../lib/sendEmailSG"

import { sanityCreate, sanityRequest } from "../lib/sanity/sanityActions"

export default async function handler(req, res) {
  const email = req?.body?.email || req?.query?.email
  const stripePriceId = req?.body?.stripePriceId || req?.query?.stripePriceId
  const name = req?.body?.name || req?.query?.name
  const sanityPriceId = req?.body?.sanityPriceId || req?.query?.sanityPriceId
  const redirectOrigin = req?.body?.redirectOrigin || req?.query?.redirectOrigin

  // Check if the subscription actually exist in Stripe
  let isSubscribe = await isSubscribed(email, stripePriceId)

  try {
    if (
      typeof isSubscribe?.cusid == "string" &&
      typeof isSubscribe?.subid == "string"
    ) {
      // Query customer from Sanity Server
      let cusData = await sanityRequest(`
        *[_type =='customer' && email=="${email}"]
      `)

      // Generate random password
      let genPassword = generator.generate({ length: 10, numbers: true })

      let cusPassword = cusData[0]?.password
        ? cusData[0]?.password
        : genPassword

      let cusRef = cusData[0]?._id ? cusData[0]?._id : isSubscribe.cusid

      // Define mutation request for Sanity

      let cusSanity = await sanityCreate("createIfNotExists", {
        _id: cusRef,
        _type: "customer",
        email: email,
        password: cusPassword,
        name: name,
        cusid: cusRef,
      })

      let subSanity = await sanityCreate("createIfNotExists", {
        _type: "subscriptions",
        _id: isSubscribe.subid,
        customer: { _ref: cusRef, _type: "reference" },
        price: { _ref: sanityPriceId, _type: "reference" },
        status: isSubscribe?.status,
        cancel_at_period_end: isSubscribe.cancel_at_period_end,
        canceled_at: isSubscribe?.canceled_at
          ? format(new Date(isSubscribe?.canceled_at * 1000), "yyyy-MM-dd")
          : "",
        cancel_at: isSubscribe?.cancel_at
          ? format(new Date(isSubscribe?.cancel_at * 1000), "yyyy-MM-dd")
          : "",
        start_date: isSubscribe.start_date
          ? format(new Date(isSubscribe.start_date * 1000), "yyyy-MM-dd")
          : "",
        livemode: isSubscribe?.livemode,
        subID: isSubscribe.subid,
        title: `${email}`,
      })

      if (
        typeof cusSanity?._id == "string" &&
        typeof subSanity?._id == "string"
      ) {
        try {
          // Send email to customer for their login details
          await sendEmailSG({
            email: email,
            subject: "You credential for the course",
            html: `
            <p>Email: ${email}</p>
            <p>Password: ${cusPassword}</p>
            `,
          })
        } catch (error) {}

        if (redirectOrigin) {
          // Redirect to the success URL
          res.redirect(`${redirectOrigin}?state=success`)
        } else {
          res.status(200).json({
            message: "success",
          })
        }
      } else {
        if (redirectOrigin) {
          res.redirect(`${redirectOrigin}?state=fail`)
        } else {
          res.status(400).json({
            message: null,
          })
        }
      }
      return
    } else {
      throw {
        status: 400,
        message: "You're not subscribed!!!",
      }
    }
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
