import stripeAPI from "stripe"

export default async function handler(req, res) {
  try {
    const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
      apiVersion: "2020-08-27",
    })

    // Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      success_url: req.body.successUrl,
      cancel_url: req.body.cancelUrl,
      customer_email: req.body.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      mode: req.body.mode,
      metadata: req.body.metadata,
    })
    res.json({ url: session.url })
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
