import Axios from "axios"
import validator from "validator"
import jwt from "jsonwebtoken"

import { sanityRequest } from "../lib/sanity/sanityActions"

export default async function handler(req, res) {
  try {
    const token =
      req?.body?.token || req?.query?.token || req?.headers["x-access-token"]

    const contentRef = req?.body?.contentRef || req?.query?.contentRef

    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }

    var decoded = jwt.verify(token, process.env.jwt)

    if (!validator.isEmail(decoded.email)) {
      throw {
        status: 400,
        message: "Bad Token",
      }
    }

    let subData = await sanityRequest(
      `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${decoded.email}']._id]{price->{_id, content}}`,
    )

    var isExist = false

    subData.forEach(sub => {
      if (sub?.price?.content?._ref == contentRef) {
        isExist = true
      }
    })

    if (isExist) {
      res.status(200).json({
        is: true,
        message: "success",
      })
    } else {
      throw {
        is: false,
        status: 500,
        message: "not subscribe to the course",
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
