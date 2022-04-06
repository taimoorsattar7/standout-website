import { querySanity } from "../lib/querySanity"
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  try {
    const email = req?.body?.email || req?.query?.email
    const password = req?.body?.password || req?.query?.password

    if (!email && !password) {
      return res.status(403).send("Missing data")
    } else {
      let cusData = await querySanity(`
        *[_type =='customer' && email=="${email}"]
      `)

      if (cusData[0].password === password) {
        var token = jwt.sign(
          {
            name: cusData[0].name,
            email: cusData[0].email,
            password: cusData[0].password,
          },
          String(process.env.jwt),
          { expiresIn: "7d" }
        )

        res.status(200).json({
          message: "success",
          token: token,
          email: cusData[0].email,
          name: cusData[0].name,
        })
      } else {
        throw {
          status: 500,
          message: "wrong Password",
        }
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
