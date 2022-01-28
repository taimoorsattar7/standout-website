import React from "react"
import Layout from "@components/layout"
import Seo from "@components/seo"
import Contact from "@components/contact"

const ContactUs = ({ location }) => (
  <>
    <Layout location={location} title="Contact">
      <Seo
        title="Contact"
        location={location}
        description="Fill the contact form."
      />
      <Contact />
    </Layout>
  </>
)

export default ContactUs
