/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
//  import Image from 'gatsby-image'

const ArchiveBlog = () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  `)

  if (nodes.length === 0) {
    return (
      <div className="container max-w-2xl mx-auto px-3">
        <h3 className="font-normal text-base text-gray-400">nothing Here :)</h3>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto px-3">
      <h1 className="text-3xl font-extrabold leading-snug mb-4">
        Latest Posts
      </h1>
      <main>
        {nodes.map(blog => {
          return (
            <div className="py-4">
              <h2 class="text-xl text-gray-900 font-extrabold leading-snug">
                <a href={blog.fields.slug} className="text-indigo-600">
                  {blog.frontmatter.title}
                </a>
              </h2>

              <h3 className="font-normal text-base text-gray-700">
                {blog.excerpt}
              </h3>
              <h3 className="text-xs font-light italic py-1">
                {blog.frontmatter.date} by Taimoor Sattar
              </h3>
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default ArchiveBlog
