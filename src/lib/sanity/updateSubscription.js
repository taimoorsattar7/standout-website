import Axios from "axios"

export const updateSubscription = async (data) => {
  try {
    let mutation = [
      {
        patch: {
          _type: "subscriptions",
          _id: data.id,
          status: data.status,
          //   dates: [today],
          subID: data.id,
        },
      },
    ]
    await Axios.post(
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
    return true
  } catch (e) {
    return false
  }
}
