import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "@components/layout"
import SEO from "@components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { previous, next } = data

  const featureImg =
    post.frontmatter?.featuredimage?.childImageSharp?.gatsbyImageData

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <article className="container w-full">
        <h1 className="text-4xl font-extrabold leading-snug mb-4">
          {post.frontmatter.title}
        </h1>

        <p className="text-base font-light italic py-3">
          Published {post.frontmatter.date}
        </p>

        {featureImg && (
          <GatsbyImage
            className="w-full h-auto mb-5"
            image={getImage(featureImg)}
            alt={"heading"}
          />
        )}

        <section
          className="prose max-w-fit"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />

        <hr className="border-b-2 border-grey-light mb-8" />

        <div className="font-sans flex justify-between content-center pb-12">
          <div className="text-left">
            {previous?.fields?.slug && (
              <>
                <span className="text-xs md:text-sm font-normal text-grey-dark">
                  {previous && (
                    <Link to={previous.fields.slug} rel="prev">
                      &laquo; Previous Post
                    </Link>
                  )}
                </span>
                <br />
                <p>
                  <Link
                    to={previous.fields.slug}
                    className="break-normal text-base md:text-sm text-teal font-bold no-underline hover:underline"
                  >
                    {previous.frontmatter.title}
                  </Link>
                </p>
              </>
            )}
          </div>

          <div className="text-right">
            {next?.fields?.slug && (
              <>
                <span className="text-xs md:text-sm font-normal text-grey-dark">
                  <Link to={next.fields.slug} rel="next">
                    Next Post &raquo;
                  </Link>
                </span>
                <br />
                <p>
                  <Link
                    to={next.fields.slug}
                    className="break-normal text-base md:text-sm text-teal font-bold no-underline hover:underline"
                  >
                    {next.frontmatter.title}
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredimage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
