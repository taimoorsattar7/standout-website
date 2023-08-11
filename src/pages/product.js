import React from "react"

import Layout from "@components/layout"
import Seo from "@components/seo"

import { useStaticQuery, graphql } from "gatsby"
import ProductList from "@components/productList"

const Product = ({ location }) => {
  const {
    allSanityProduct: { nodes },
  } = useStaticQuery(graphql`
    query ModulesSpace {
      allSanityProduct {
        nodes {
          title
          _rawExerpt
          slug {
            current
          }
          id
          image {
            asset {
              id
              gatsbyImageData
            }
          }
        }
      }
    }
  `)
  return (
    <>
      <Layout location={location}>
        <Seo
          title="Product"
          location={location}
          description="Product content."
        />
        <section className="text-gray-700 body-font">
          <div className="flex flex-wrap -m-4">
            {nodes.map((product, index) => {
              return <ProductList index={index} data={product} />
            })}
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Product
