import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"

import ArchiveBlog from "@components/archiveBlog"

const Blogs = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="All posts" />
      <ArchiveBlog />
    </Layout>
  )
}

export default Blogs
