import { querySanity } from "../lib/querySanity"

export default async function handler(req, res) {
  let sanityData = await querySanity(`*`)

  res.status(200).send({
    sanityData: sanityData,
  })
}
