import React, { useEffect, useState } from "react"

import { querySanity } from "@lib/querySanity"

import Layout from "@components/layout"
import Seo from "@components/seo"

import { navigate } from "gatsby"
import Axios from "axios"

import { isLoggedIn, getCurrentUser, logout } from "@utils/auth"

import ProductList from "@components/productList"

export default function Modules({ location, params, slug }) {
  const [content, setcontent] = useState(null)

  useEffect(() => {
    if (isLoggedIn()) {
      fetchData()
    } else {
      navigate("/login")
    }
  }, [])

  async function fetchData() {
    try {
      let usr = getCurrentUser()

      let data = await querySanity(`
        *[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${usr.email}']._id]{'module': price->content->{_id, title, exerpt, 'image': image.asset->{_updatedAt, extension, originalFilename, url}, slug}}
      `)

      setcontent(data)
    } catch (e) {
      return null
    }
  }

  return (
    <Layout location={location}>
      <Seo title="All posts" />

      <div class="flex justify-center items-center">
        <div
          class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
      </div>

      {JSON.stringify(content)}

      {content && <ProductList data={content.module} />}
    </Layout>
  )
}
