import React from "react"
import { graphql } from "gatsby"
import Layout from "@components/layout"
import Seo from "@components/seo"

import ArchiveBlog from "@components/archiveBlog"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="Homepage"
        location={location}
        description="The Homepage to show blog posts."
      />

      <ArchiveBlog />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
