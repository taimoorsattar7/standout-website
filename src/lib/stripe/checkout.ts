import stripeAPI from "stripe"

export const createSession = async ({
  successUrl,
  cancelUrl,
  email,
  priceId,
  mode,
  metadata = {},
}: any) => {
  const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
    apiVersion: "2020-08-27",
  })

  // Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: mode,
    metadata: metadata,
  })

  return session
}

export const retrieveSession = async ({ id }: any) => {
  const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
    apiVersion: "2020-08-27",
  })
  const session = await stripe.checkout.sessions.retrieve(id)
  return session
}
