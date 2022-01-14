import React, { useEffect, useState } from "react"

import { querySanity } from "@lib/querySanity"
import { getCurrentUser, isLoggedIn } from "@utils/auth"

import Axios from "axios"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Files from "@components/files"

export default function ModulePrd({ location, params }) {
  let [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        let contentData = await querySanity(`
          *[_type =='content' && slug.current=='${params.product}']{
            _id,
            title,
            exerpt,
            'documents': documents[].asset->{
              url, originalFilename
            },
          }
        `)

        let contentRef = contentData._id

        let { token } = getCurrentUser()
        let { data } = await Axios.get(
          `/api/isSubscribe?token=${token}&contentRef=${contentRef}`
        )

        if (data?.is) {
          setData(contentData)
        }
      } catch (error) {
        console.log(error)
        setData(null)
      }
    }

    if (isLoggedIn()) {
      fetchData()
    }
  }, [])

  return (
    <Layout location={location}>
      <Seo title="All posts" />
      {data ? <Files data={data} /> : <p>Not Found</p>}
    </Layout>
  )
}
