import Axios from "axios"

export const querySanity = async query => {
  let sanityRef
  try {
    sanityRef = await Axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
      {
        query: query,
      }
    )

    return sanityRef.data?.result
  } catch (err) {
    return []
  }
}
