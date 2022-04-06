import Axios from "axios"
import validator from "validator"
import jwt from "jsonwebtoken"
import stripeAPI from "stripe"

import { formatDate } from "../lib/formatDate"
import { unix_timestamp_data } from "../lib/unix_timestamp_data"

export default async function handler(req, res) {
  const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
    apiVersion: "2020-08-27",
  })

  try {
    const token =
      req?.body?.token || req?.query?.token || req?.headers["x-access-token"]

    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }

    const subID = req.body.subID || req.query.subID
    const actionReq = req.body.actionReq || req.query.actionReq

    const decoded = jwt.verify(token, String(process.env.jwt))

    if (!validator.isEmail(decoded.email)) {
      throw {
        status: 400,
        message: "Bad Token",
      }
    }
    let action = {}

    if (actionReq == "dont_cancel") {
      action = {
        cancel_at: "",
      }
    } else {
      action = {
        cancel_at_period_end: true,
      }
    }

    let subscription = await stripe.subscriptions.update(subID, action)

    let { data } = await Axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.GATSBY_SANITY_DATASET}`,
      {
        mutations: [
          {
            patch: {
              id: subID,
              set: {
                status: subscription.status,
                cancel_at_period_end: subscription.cancel_at_period_end,
                canceled_at: formatDate(
                  unix_timestamp_data(subscription.canceled_at)
                ),
                cancel_at: formatDate(
                  unix_timestamp_data(subscription.cancel_at)
                ),
                livemode: subscription.livemode,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_SANITY_BEARER_TOKEN}`,
        },
      }
    )
    res.status(200).json({
      message: "success",
    })
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
