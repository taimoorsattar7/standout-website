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

// const mutations = [{
//   createOrReplace: {
//     _id: '123',
//     _type: 'cms.article',
//     title: 'An article'
//   }
// }]

// fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${datasetName}`, {
//   method: 'post',
//   headers: {
//     'Content-type': 'application/json',
//     Authorization: `Bearer ${tokenWithWriteAccess}`
//   },
//   body: JSON.stringify({mutations})
// })
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.error(error))
