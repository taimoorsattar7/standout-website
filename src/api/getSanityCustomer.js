import { querySanity } from "../lib/querySanity"

export default async function handler(req, res) {
  try {
    let data = await querySanity(`
        *[_type =='customer'"]
    `)

    res.status(200).json({
      data: data,
    })
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
