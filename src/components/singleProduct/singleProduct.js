import React, { useState, useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Success from "./state/success"
import Fail from "./state/fail"
import Form from "./state/form"

import Modal from "@components/modal"

import queryString from "query-string"
import PortableText from "@components/portabletext/portableText"

const SingleProduct = ({
  data: { title, _rawExerpt, _rawBody, image, productPrice },
  location,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [modalState, setModalState] = useState("")

  useEffect(() => {
    const queriedTheme = queryString.parse(location.search)

    if (["form", "fail", "success"].includes(queriedTheme.state)) {
      setShowModal(true)
      setModalState(queriedTheme.state)
    }
  }, [location.search])

  function handleState() {
    setShowModal(true)
    setModalState("form")
  }

  return (
    <main className="grid place-items-center">
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalState === "form" && (
            <Form location={location} productPrice={productPrice} />
          )}
          {modalState === "success" && (
            <Success
              location={location}
              url={`/modules/${productPrice?.content?.slug?.current}`}
            />
          )}
          {modalState === "fail" && <Fail />}
        </Modal>
      )}

      <section className="body-font">
        <span className="block mb-3 text-sm font-extrabold leading-snug text-center text-gray-400 md:text-left">
          COURSE
        </span>
        <div className="flex flex-col items-center pb-24 md:flex-row md:items-start">
          <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-14 md:pr-10 md:items-start md:text-left md:mb-0">
            <h1 className="mb-4 text-4xl font-extrabold leading-snug sm:text-4xl">
              {title}
            </h1>
            <p className="mb-8 leading-relaxed">
              {_rawExerpt && <PortableText blocks={_rawExerpt} />}
            </p>
            <div className="flex items-center justify-center">
              <button
                className="flex-shrink-0 px-6 py-2 mr-10 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
                onClick={() => {
                  handleState()
                }}
              >
                Buy the course
              </button>

              <p className="flex-shrink-0 text-2xl font-medium leading-snug text-gray-400">
                10 USD
              </p>
            </div>
          </div>
          <div className="w-5/6 lg:max-w-xs lg:w-full md:w-1/2">
            <GatsbyImage
              className="object-cover object-center rounded"
              image={getImage(image.asset)}
              alt={"heading"}
            />
          </div>
        </div>
      </section>

      <small className="prose max-w-fit">
        {_rawBody && <PortableText blocks={_rawBody} />}
      </small>
    </main>
  )
}

export default SingleProduct
