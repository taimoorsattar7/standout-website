import React, { useState } from "react"
import { navigate } from "gatsby-link"

import toast, { Toaster } from "react-hot-toast"

import axios from "axios"

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&")
}

export default function Contact() {
  const [state, setState] = React.useState({
    email: "",
    subject: "",
    message: "",
  })
  const [disable, setDisable] = useState(false)

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setDisable(true)

    try {
      const { data } = await axios.post("/api/sendEmail", {
        subject: state?.subject,
        message: `
          <p>From Email: ${state?.email}</p>
          <p>${state?.message}</p>
        `,
      })

      if (data?.emailSend) {
        toast.success("Email sent 🎉")
        setState({
          email: "",
          subject: "",
          message: "",
        })
      }
      setDisable(false)
    } catch (error) {
      setDisable(false)
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="my-3 text-3xl font-semibod text-gray-700">Contact Me</h1>
      <p className="text-gray-400">Fill in this form to send me a message.</p>
      <Toaster position="top-center" />
      <form
        className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 mb-8"
        name="contact"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label htmlFor="subject" className="block mb-2 text-sm text-gray-600">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            onChange={handleChange}
            placeholder="Your Subject"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            value={state?.subject}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="you@email.com"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            value={state?.email}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm text-gray-600">
            Your Message
          </label>
          <textarea
            type="text"
            rows="5"
            name="message"
            id="message"
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            value={state?.message}
          ></textarea>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="group relative max-w-fit flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:pointer-events-none"
            disabled={disable ? true : false}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
