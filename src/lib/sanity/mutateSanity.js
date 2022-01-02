import Axios, { AxiosResponse } from "axios"

export const mutateSanity = async mutationRequest => {
  try {
    let results = await Axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.GATSBY_SANITY_DATASET}`,
      {
        mutations: mutationRequest,
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
