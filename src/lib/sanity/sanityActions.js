import createClient from "@sanity/client"

const client = createClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.GATSBY_SANITY_BEARER_TOKEN, // Only if you want to update content with the client
})

export const sanityRequest = async query => {
  try {
    const request = await client.fetch(query)
    return request
  } catch (err) {
    throw err
    return []
  }
}

export const sanityCreate = async (action, post) => {
  try {
    let result
    if (action == "createOrReplace") {
      result = client.createOrReplace(post)
    } else if (action == "createIfNotExists") {
      result = client.createIfNotExists(post)
    } else {
      result = client.create(post)
    }
    return result
  } catch (err) {
    throw err
    return []
  }
}

export const sanityUpdate = async (_id, obj) => {
  try {
    const result = client.patch(_id).set(obj).commit()
    return result
  } catch (err) {
    throw err
    return []
  }
}
