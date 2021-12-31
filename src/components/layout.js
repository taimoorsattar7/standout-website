import React from "react"
import { Link, navigate } from "gatsby"

import { isLoggedIn, logout } from "@utils/auth"

import Header from "@components/header"
import Footer from "@components/footer"

const Layout = ({ location, children }) => {
  return (
    <>
      <Header location={location} />

      <main className="container max-w-2xl mx-auto px-5 py-10">{children}</main>

      <Footer />
    </>
  )
}

export default Layout
