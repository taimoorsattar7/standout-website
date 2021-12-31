import Axios from "axios"
import validator from "validator"
import jwt from "jsonwebtoken"

export default async function handler(
  req,
  res
) {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"]

    const productRef = req.body.productRef || req.query.productRef

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

    let response = await Axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
      {
        query: `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${decoded.email}']._id]{price->{_id, content}}`,
      }
    )

    if (response.data.result[0].price.content._ref == productRef) {
      res.status(200).json({
        refid: response.data.result[0].price.content._ref,
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
