import React from "react"
import { Link } from "gatsby"

const Success = ({ url }) => {
  return (
    <>
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
        <svg
          className="w-6 h-6 text-green-600"
          x-description="Heroicon name: outline/check"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <h3
          className="text-lg font-medium leading-6 text-gray-900"
          id="modal-title"
        >
          Payment successful
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Thanks!!! Your payment is received. Please check your email and
            click the below button to navigate to the login page.
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        >
          <Link to={"/login"}>Proceed to login &raquo;</Link>
        </button>
      </div>
    </>
  )
}

export default Success
