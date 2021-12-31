import generator from "generate-password"
import normalizeEmail from "validator/lib/normalizeEmail"
import jwt from "jsonwebtoken"

import { isSubscribed } from "../lib/isSubscribed"

import { querySanity } from "../lib/querySanity"

import { sendEmailSG } from "../lib/sendEmailSG"

import { formatDate } from "../lib/formatDate"

import { createSubscription } from "../lib/sanity/createSubscription"

import { unix_timestamp_data } from "../lib/unix_timestamp_data"

export default async function handler(req, res) {
  const email = normalizeEmail(req.body.email || req.query.email)
  const priceId = req.body.priceId || req.query.priceId
  const name = req.body.name || req.query.name
  const priceRef = req.body.priceRef || req.query.priceRef
  const redirectOrigin = req.body.redirectOrigin || req.query.redirectOrigin

  let isSubscribe = await isSubscribed(email, priceId)

  try {
    if (
      typeof isSubscribe.cusid == "string" &&
      typeof isSubscribe.subid == "string"
    ) {
      let cusData = await querySanity(`
        *[_type =='customer' && email=="${email}"]
      `)

      let priceData = await querySanity(`
            *[_id=='${priceRef}']
          `)

      let password = ""
      if (cusData?.password === "") {
        password = generator.generate({
          length: 10,
          numbers: true,
        })
      } else {
        password = cusData?.password
      }

      let mutationData = {
        cusid: cusData?._id ? cusData?._id : isSubscribe.cusid,
        email: email,
        password: password,
        name: name,
        subid: isSubscribe.subid,
        priceRef: priceRef,
        start_date: isSubscribe.start_date
          ? formatDate(unix_timestamp_data(isSubscribe.start_date))
          : "",
        status: isSubscribe?.status,
        cancel_at_period_end: isSubscribe.cancel_at_period_end,
        canceled_at: isSubscribe?.canceled_at
          ? formatDate(unix_timestamp_data(isSubscribe?.canceled_at))
          : "",
        cancel_at: isSubscribe?.cancel_at
          ? formatDate(unix_timestamp_data(isSubscribe?.cancel_at))
          : "",
        livemode: isSubscribe?.livemode,
      }

      let results = await createSubscription(mutationData)
      if (typeof results.transactionId == "string") {
        var token = jwt.sign(
          {
            name: name,
            email: email,
          },
          String(process.env.jwt),
          { expiresIn: "7d" }
        )
        if (redirectOrigin) {
          res.redirect(`${redirectOrigin}?state=success&token=${token}`)
        } else {
          res.status(200).json({
            token: token,
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
