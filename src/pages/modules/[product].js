import React, { useEffect, useState } from "react"

import { querySanity } from "@lib/querySanity"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Files from "@components/files"

export default function ModulePrd({ location, params, slug }) {
  let [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      let fileData = await querySanity(`
        *[_type =='content' && slug.current=='${params.product}']{
          title,
          exerpt,
          'documents': documents[].asset->{
            url, originalFilename
          },
        }
      `)

      setData(fileData)
    } catch (error) {
      setData(null)
    }
  }
  return (
    <Layout location={location}>
      <Seo title="All posts" />
      <Files data={data} />
    </Layout>
  )
}
