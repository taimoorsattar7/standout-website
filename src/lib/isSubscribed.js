import stripeAPI from "stripe"

export const isSubscribed = async (email, priceId) => {
  try {
    const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
      apiVersion: "2022-11-15",
    })
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      price: priceId,
      limit: 1,
    })

    return {
      cusid: customers?.data[0]?.id,
      subid: subscriptions?.data[0]?.id,

      status: subscriptions?.data[0]?.status,
      cancel_at_period_end: subscriptions?.data[0]?.cancel_at_period_end,
      canceled_at: subscriptions?.data[0]?.canceled_at,
      cancel_at: subscriptions?.data[0]?.cancel_at,
      start_date: subscriptions?.data[0]?.start_date,

      livemode: subscriptions?.data[0]?.livemode,

      priceId: priceId,
      message: "success",
    }
  } catch (err) {
    return { message: err }
  }
}
