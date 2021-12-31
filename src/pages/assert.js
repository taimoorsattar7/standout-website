import React from "react"

import Layout from "@components/layout"
import Contact from "@components/contact"

const ASSERT = ({ location }) => (
  <>
    <Layout location={location} title="Contact Me">
      <Contact />
    </Layout>
  </>
)

export default ASSERT
