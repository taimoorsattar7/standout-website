import React, { useState, useEffect, useLayoutEffect } from "react"
import { Link, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Axios from "axios"

import Success from "./state/success"
import Fail from "./state/fail"
import Form from "./state/form"

import Modal from "@components/modal"

import "./singleProduct.css"

import { getCurrentUser, isLoggedIn } from "@utils/auth"

import queryString from "query-string"
import PortableText from "@components/portabletext/portableText"

const SingleProduct = ({
  data: { title, _rawExerpt, _rawBody, image, productPrice },
  location,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [modalState, setModalState] = useState("")
  let [isSub, setIsSub] = useState(false)

  async function isSubsciption() {
    try {
      if (isLoggedIn()) {
        const ourRequest = Axios.CancelToken.source()

        console.log(productPrice)

        let contentRef = productPrice.content._id
        let { token } = getCurrentUser()
        let { data, status } = await Axios.get(
          `/api/isSubscribe?token=${token}&contentRef=${contentRef}`,
          { cancelToken: ourRequest.token }
        )

        console.log(data)
        if (status >= 200 && status <= 300) {
          setIsSub(data.is)
        }

        return () => {
          ourRequest.cancel()
        }
      }
    } catch (e) {
      console.log(e)
      setIsSub(false)
    }
  }

  useLayoutEffect(() => {
    isSubsciption()
  }, [isLoggedIn()])

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
            <Form location={location} productPrice={productPrice} />
          )}
          {modalState == "success" && (
            <Success
              location={location}
              url={`/modules/${productPrice?.content?.slug?.current}`}
            />
          )}
          {modalState == "fail" && <Fail />}
        </Modal>
      )}

      <section className="body-font">
        <span className="block text-sm md:text-left text-center text-gray-400 font-extrabold leading-snug mb-3">
          COURSE
        </span>
        <div className="flex pb-24 md:flex-row flex-col md:items-start items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-14 md:pr-10 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="sm:text-4xl text-4xl font-extrabold leading-snug mb-4">
              {title}
            </h1>
            <p className="mb-8 leading-relaxed">
              {_rawExerpt && <PortableText blocks={_rawExerpt} />}
            </p>
            <div className="flex justify-center items-center">
              {!isSub ? (
                <button
                  className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-6 mr-10 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={() => {
                    handleState()
                  }}
                >
                  Buy the course
                </button>
              ) : (
                <button
                  className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-6 mr-10 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={() => {
                    handleState()
                  }}
                >
                  <Link to={`/modules/${productPrice?.content?.slug?.current}`}>
                    Get the files &raquo;
                  </Link>
                </button>
              )}
              {!isSub && (
                <p className="text-2xl text-gray-400 font-medium leading-snug flex-shrink-0">
                  10 USD
                </p>
              )}
            </div>
          </div>
          <div className="lg:max-w-xs lg:w-full md:w-1/2 w-5/6">
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
