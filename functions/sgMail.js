// This project uses SendGrid as a email service
// but you can switch to any dedicated email service
// like Mailgun
const sgMail = require('@sendgrid/mail')

exports.handler = async function (event, context, callback) {
  //pull the required information from your environment variables, which can be set in the Netlify UI
  const {EMAIL_FROM} = process.env
  let data = JSON.parse(event.body)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  if (event.httpMethod == 'POST' && event.body == null) {
    send({emailSend: false})
  }

  // THIS FUNCTION FORMATS AND SENDS YOUR RESPONSE BACK TO YOUR FRONT-END
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    })
  }

  const msg = {
    to: data.email,
    from: process.env.EMAIL_FROM, // Use the email address or domain you verified above
    subject: data.subject,
    html: data.html,
  }

  try {
    await sgMail.send(msg)
    send({emailSend: true})
  } catch (e) {
    send({emailSend: e})
  }
}
