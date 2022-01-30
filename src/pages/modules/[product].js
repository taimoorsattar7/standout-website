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

        let contentRef = contentData[0]._id

        let { token } = getCurrentUser()
        console.log(`/api/isSubscribe?token=${token}&contentRef=${contentRef}`)
        let { data } = await Axios.get(
          `/api/isSubscribe?token=${token}&contentRef=${contentRef}`
        )

        if (data?.is) {
          setData(contentData[0])
        }
      } catch (error) {
        console.log(error)
        setData(false)
      }
    }

    if (isLoggedIn()) {
      fetchData()
    }
  }, [])

  if (data == null) {
    return (
      <Layout location={location}>
        <h3 className="text-base font-normal text-gray-700">
          Please wait your data is loading...
        </h3>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <Seo title={data.title} location={location} description="Modules Page." />

      {data == false ? (
        <h3 className="text-base font-normal text-gray-700">
          You are not authorize to view the content.
        </h3>
      ) : (
        <Files data={data} />
      )}
    </Layout>
  )
}
