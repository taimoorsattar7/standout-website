import React, {useState} from 'react'
import Axios from 'axios'
import Image from 'gatsby-image'

import {graphql} from 'gatsby'

import Layout from '@components/layout'

const FreeBie = ({data, location}) => {
  const [username, setUsername] = useState()
  const [useremail, setUseremail] = useState()
  const [msg, setmsg] = useState('')

  const [disable, setDisable] = useState(false)

  const box = data?.box?.childImageSharp?.fixed

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setDisable(true)

      const response = await Axios.post(`/.netlify/functions/addUser`, {
        name: username,
        email: useremail,
        id: '12344_abc',
      })

      if (response) {
        const mailSent = await Axios.post(
          `/.netlify/functions/nodemailerSend`,
          {
            email: useremail,
            subject: "Here's your box",
            html: `
              <p>Hi ${username}</p>
              <p>Thanks for checking your email.</p>
            `,
          },
        )

        if (mailSent) {
          setmsg('Thank! we have send you a mail. Kindly check your inbox.')
        }

        setUsername('')
        setUseremail('')
      } else {
        setmsg('Something went wrong.')
      }

      setDisable(false)
    } catch (err) {
      setmsg('Refresh the page and try Again...')
      setDisable(false)
    }
  }

  return (
    <>
      <Layout location={location} title="FreeBie">
        <h1>Download the freebie template</h1>
        <p>Enter Your Information to proceed for download.</p>

        {box && <Image fixed={box} alt="box" className="w-full" />}

        <form className="field" onSubmit={handleSubmit}>
          <input
            onChange={e => setUsername(e.target.value)}
            name="text"
            className="input"
            type="text"
            placeholder="John Doe"
            autoComplete="on"
          />

          <input
            onChange={e => setUseremail(e.target.value)}
            name="email"
            className="input"
            type="text"
            placeholder="example@email.com"
            autoComplete="on"
          />

          <button
            className="btn margin-bm"
            type="submit"
            onClick={handleSubmit}
            disabled={!!disable}
          >
            Click to recieve the box at your email inbox
          </button>

          <div>{msg}</div>
        </form>
      </Layout>
    </>
  )
}

export default FreeBie

export const boxQuery = graphql`
  query {
    box: file(absolutePath: {regex: "/box.jpg/"}) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
