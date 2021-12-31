import Axios from "axios"

// import { useQuery } from "react-query"

import get_gravatar_image_url from "@lib/get_gravatar_image_url"

const isBrowser = typeof window !== `undefined`

const getUser = () => {
  return window.localStorage.gatsbyUser
    ? JSON.parse(window.localStorage.gatsbyUser)
    : {}
}

const setUser = user => (window.localStorage.gatsbyUser = JSON.stringify(user))

export const handleLogin = async ({ email, password = "" }) => {
  if (!isBrowser) return false

  let { data } = await Axios.post(`/api/login`, {
    email: email,
    password: password,
  })

  if (data.message == "success") {
    return setUser({
      name: data.name,
      email: data.email,
      avatar: get_gravatar_image_url(data.email, 120, "mm", "g", "y"),
      token: data.token,
    })
  }

  return false
}

export const isLoggedIn = () => {
  if (!isBrowser) return "false"
  const user = getUser()

  return !!user.email
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = callback => {
  if (!isBrowser) return
  setUser({})
  if (callback) {
    callback()
  }
}

export const cVerifyToken = async token => {
  if (!isBrowser) return "false"
  try {
    let { data } = await Axios.post(`/api/verifyToken`, {
      token: token,
    })

    return setUser({
      email: data.email,
      token: data.token,
    })
  } catch (error) {
    console.log(error)
  }
}
