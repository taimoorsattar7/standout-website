import React, { useState } from "react"
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
      <h1 className="mb-5 text-lg font-medium text-gray-900 title-font">
        Continue to Payment
      </h1>
      <input
        className="block w-full p-2 mb-4 placeholder-gray-900 bg-gray-200 border rounded appearance-none focus:border-teal-500"
        name="name"
        type="text"
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        className="block w-full p-2 mb-4 placeholder-gray-900 bg-gray-200 border rounded appearance-none focus:border-teal-500"
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="Email"
      />

      <div className="container pt-5 mx-auto">
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            type="submit"
            className={`font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:pointer-events-none`}
            disabled={disable ? true : false}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
