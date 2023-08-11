import { sanityRequest, sanityUpdate } from "../lib/sanity/sanityActions"

export default async function handler(req, res) {
  const action = req?.body?.action || req?.query?.action
  const query = req?.body?.query || req?.query?.query
  const updatedobj = req?.body?.updatedobj || req?.query?.updatedobj
  const _id = req?.body?._id || req?.query?._id

  let data = null
  if (action == "get") {
    data = await sanityRequest(query)
  } else if (action == "update") {
    data = await sanityUpdate(_id, updatedobj)
  } else {
    data = null
  }

  res.status(200).send({
    action: action,
    data: data,
  })
}
