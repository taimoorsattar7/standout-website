import Axios from "axios"

export default async function archieveSubscription({ email = "" }) {
  try {
    let { data } = await Axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
      {
        query: `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${email}']._id]{_id, _type, customer, status, cancel_at_period_end, canceled_at, cancel_at, start_date, price, 'module': price->content->{_id, _type, title, seo, 'img': seo.image.asset->{_updatedAt, extension, originalFilename, url}, slug}}`,
      }
    )
    return { data: data.result }
  } catch (e) {
    return null
  }
}
