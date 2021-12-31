import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import Axios from "axios"

import { isLoggedIn, getCurrentUser, logout } from "@utils/auth"

import Layout from "@components/layout"
import ProductList from "@components/productList"

const Dashboard = ({ data, location }) => {
  if (null) {
    return (
      <>
        <Layout location={location}>
          {/* <h1 class="text-4xl font-semibold ">You Subsciption.</h1>
      <div class="flex flex-wrap -m-4">

      <ProductList data={content}/>
      </div>*/}
        </Layout>
      </>
    )
  }

  return (
    <>
      <Layout location={location}>
        {/* {JSON.stringify(content)} */}

        {/* <section className="text-gray-700 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {content.map(data => {
                return <ProductList data={data.module} />
              })}
            </div>
          </div>
        </section> */}

        {/* <ProductList data={content[0].module}/> */}
      </Layout>
    </>
  )
}

export default Dashboard
