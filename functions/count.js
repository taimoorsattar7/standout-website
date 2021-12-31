// IMPORT THE AIRTABLE.JS PACKAGE
const Airtable = require('airtable')

/** THIS IS YOUR SERVERLESS FUNCTION */
exports.handler = function (event, context, callback) {
  //pull the required information from your environment variables, which can be set in the Netlify UI
  const {API_CLIENT_ID, API_KEY} = process.env

  // THIS FUNCTION FORMATS AND SENDS YOUR RESPONSE BACK TO YOUR FRONT-END
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    })
  }

  // CONFIGURE YOUR AIRTABLE BASE CONNECTION
  Airtable.configure({
    apiKey: API_KEY,
  })

  var base = Airtable.base(API_CLIENT_ID)
  const table = base('table1')

  const all = table.select({
    view: 'emails',
  })

  //
  all.firstPage((error, records) => {
    send({
      count: records.length,
    })
  })
}
