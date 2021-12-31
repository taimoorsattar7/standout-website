import Airtable from "airtable"
import validator from "validator"
import normalizeEmail from "validator/lib/normalizeEmail"
import sendEmailSG from "../lib/sendEmailSG"


export default function handler(req, res) {
  
  const email = String(normalizeEmail(req.body.email || req.query.token))
  const subject = String(normalizeEmail(req.body.subject || req.query.subject))
  const text = String(normalizeEmail(req.body.text || req.query.text))

  try {
   
    sendEmailSG(
      { email: email, subject: subject, html: text }
    )

  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
