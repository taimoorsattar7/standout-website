import React, { useState, useEffect } from "react"

import "./singleProduct.css"
import Modal from "@components/modal"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Success from "./state/success"
import Fail from "./state/fail"
import Form from "./state/form"

import queryString from "query-string"
import PortableText from "@components/portabletext/portableText"

const SingleProduct = ({ data, location }) => {
  const [showModal, setShowModal] = useState(false)
  const [modalState, setModalState] = useState("")

  useEffect(() => {
    const queriedTheme = queryString.parse(location.search)

    if (["form", "fail", "success"].includes(queriedTheme.state)) {
      setShowModal(true)
      setModalState(queriedTheme.state)
    }
  }, [])

  function handleState() {
    setShowModal(true)
    setModalState("form")
  }

  return (
    <main className="grid place-items-center">
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalState == "form" && (
            <Form location={location} productPrice={data.productPrice} />
          )}
          {modalState == "success" && (
            <Success
              location={location}
              url={`/modules/${data?.productPrice?.content?.slug?.current}`}
            />
          )}
          {modalState == "fail" && <Fail />}
        </Modal>
      )}

      {JSON.stringify(data?.productPrice?.content?.slug?.current)}

      <section className="body-font">
        <span className="block text-sm md:text-left text-center text-gray-400 font-extrabold leading-snug mb-3">
          COURSE
        </span>
        <div className="flex pb-24 md:flex-row flex-col md:items-start items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-14 md:pr-10 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="sm:text-4xl text-4xl font-extrabold leading-snug mb-4">
              {data.title}
            </h1>
            <p className="mb-8 leading-relaxed">
              {data._rawExerpt && <PortableText blocks={data._rawExerpt} />}
            </p>
            <div className="flex justify-center items-center">
              <button
                className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-6 mr-10 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={() => {
                  handleState()
                }}
              >
                Buy the course
              </button>

              <p className="text-2xl text-gray-400 font-medium leading-snug flex-shrink-0">
                10 USD
              </p>
            </div>
          </div>
          <div className="lg:max-w-xs lg:w-full md:w-1/2 w-5/6">
            <GatsbyImage
              className="object-cover object-center rounded"
              image={getImage(data.image.asset)}
              alt={"heading"}
            />
          </div>
        </div>
      </section>

      <small className="prose max-w-fit">
        {data._rawBody && <PortableText blocks={data._rawBody} />}
      </small>
    </main>
  )
}

export default SingleProduct
