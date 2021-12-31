import validator from "validator"

import { getSanityRef } from "../lib/getSanityRef.ts"
import { querySanity } from "../lib/querySanity"
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }

    const decoded: any = jwt.verify(token, String(process.env.jwt))

    if (!validator.isEmail(decoded.email)) {
      throw {
        status: 400,
        message: "Bad Token",
      }
    }

    let cusData = await querySanity(`
        *[_type =='customer' && email=="${decoded.email}"]
      `)

    if (cusData) {
      let token = jwt.sign(
        {
          name: cusData.name,
          email: cusData.email,
        },
        String(process.env.jwt),
        { expiresIn: "7d" }
      )

      res.status(200).json({
        message: "success",
        token: token,
        email: cusData.email,
        name: cusData.name,
      })
    } else {
      throw {
        status: 500,
        message: "bad Token",
      }
    }
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      // @ts-ignore
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
