import React from "react"
import { Link, navigate } from "gatsby"

const Success = ({ url }) => {
  return (
    <>
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <svg
          className="h-6 w-6 text-green-600"
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
          className="text-lg leading-6 font-medium text-gray-900"
          id="modal-title"
        >
          Payment successful
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Thanks!!! Your payment was already received. Please click the button
            below to access the files.
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
        >
          <Link to={url}>Get the files &raquo;</Link>
        </button>
      </div>
    </>
  )
}

export default Success
