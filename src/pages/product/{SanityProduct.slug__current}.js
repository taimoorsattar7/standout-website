import React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"

import SingleProduct from "@components/singleProduct/singleProduct"

export default function SingleProductPage({
  data: { sanityProduct },
  location,
}) {
  return (
    <>
      <Layout location={location}>
        <Seo title={sanityProduct.title} location={location} />

        <SingleProduct data={sanityProduct} location={location} />
      </Layout>
    </>
  )
}

export const query = graphql`
  query ($id: String) {
    sanityProduct(id: { eq: $id }) {
      _id
      title
      _rawBody
      _rawExerpt
      slug {
        current
      }
      productPrice {
        _id
        priceID
        content {
          _id
          slug {
            current
          }
        }
      }
      image {
        asset {
          id
          gatsbyImageData
        }
      }
    }
  }
`
