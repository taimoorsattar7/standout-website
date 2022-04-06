import { mutateSanity } from "../lib/sanity/mutateSanity"

export default async function handler(req, res) {
  let mutationRequest = [
    {
      createIfNotExists: {
        _id: "cus_12131231",
        _type: "customer",
        email: "example@example.com",
        password: "example",
        name: "Example",
      },
    },
  ]
  let results = await mutateSanity(mutationRequest)

  res.status(200).send({
    results: results,
  })
}
