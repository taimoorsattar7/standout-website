import React from "react"
import { navigate } from "gatsby-link"

import axios from "axios"

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&")
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { data } = await axios.post("/api/checkout", {
      email: state?.email,
      name: state?.name,
      message: state?.message,
    })

    // const form = e.target
    // fetch('/', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //   body: encode({
    //     'form-name': form.getAttribute('name'),
    //     ...state,
    //   }),
    // })
  }

  return (
    <div className="container mx-auto">
      <h1 className="my-3 text-3xl font-semibod text-gray-700">Contact Me</h1>
      <p className="text-gray-400">Fill in this form to send me a message.</p>

      <form
        className="pt-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 mb-8"
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        // data-netlify-recaptcha="true"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />

        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            placeholder="Taimoor Sattar"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
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
          ></textarea>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
