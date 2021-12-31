import Axios, { AxiosResponse } from "axios"

export const createSubscription = async data => {
  try {
    let mutation = [
      {
        createIfNotExists: {
          _id: data.cusid,
          _type: "customer",
          email: data.email,
          password: data.password,
          name: data.name,
          cusid: data.cusid,
        },
      },
      {
        createIfNotExists: {
          _type: "subscriptions",
          _id: data.subid,
          customer: {
            _ref: data.cusid,
            _type: "reference",
          },
          price: {
            _ref: data.priceRef,
            _type: "reference",
          },

          status: data?.status,
          cancel_at_period_end: data.cancel_at_period_end,
          canceled_at: data?.canceled_at,
          cancel_at: data?.cancel_at,
          start_date: data?.start_date,
          livemode: data?.livemode,

          subID: data.subid,
          title: `${data.email} ${data.start_date}`,
        },
      },
    ]

    let results = await Axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.GATSBY_SANITY_DATASET}`,
      {
        mutations: mutation,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_SANITY_BEARER_TOKEN}`,
        },
      }
    )

    return results.data
  } catch (e) {
    return {
      message: null,
    }
  }
}
