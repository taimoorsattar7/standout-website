import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import axios from "axios"

const Form = ({ location, productPrice }) => {
  const [state, setState] = useState({})
  const [disable, setDisable] = useState(false)

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function checkout(e) {
    try {
      e.preventDefault()
      setDisable(true)
      let priceId = productPrice.priceID
      const {
        data: { url },
      } = await axios.post("/api/checkout", {
        email: state?.email,
        name: state?.name,
        mode: "subscription",
        priceId: priceId,
        metadata: {
          priceId: priceId,
          priceRef: `${productPrice._id}`,
        },
        cancelUrl: `${location?.href}?state=fail`,
        successUrl: `${location.origin}/api/createSubscription?name=${state?.name}&email=${state?.email}&priceId=${priceId}&priceRef=${productPrice._id}&redirectOrigin=${location.href}`,
      })
      window.location = url

      setDisable(false)
    } catch (error) {
      setDisable(false)
    }
  }

  return (
    <form onSubmit={checkout}>
      <h1 className="title-font text-lg font-medium text-gray-900 mb-5">
        Continue to Payment
      </h1>
      <input
        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
        name="name"
        type="text"
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="Email"
      />

      <div className="container mx-auto pt-5">
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            type="submit"
            className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
          >
            {disable && (
              <svg
                className="spinner -ml-1 mr-2 h-5 w-5"
                viewBox="0 0 66 66"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="path"
                  fill="none"
                  stroke="white"
                  stroke-width="6"
                  stroke-linecap="round"
                  cx="33"
                  cy="33"
                  r="30"
                ></circle>
              </svg>
            )}
            Proceed to checkout
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
