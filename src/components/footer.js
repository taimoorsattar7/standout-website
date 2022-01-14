import React from "react"

import { isLoggedIn, logout } from "@utils/auth"

import { Link, useStaticQuery, graphql, navigate } from "gatsby"

import Image from "gatsby-image"

export default function Footer({ location }) {
  return (
    <footer className="w-full border-t border-indigo-500 p-6 text-center pin-b">
      <p>
        Created by <a href="https://taimoorsattar.dev">Taimoor Sattar</a> &bull;
        &copy; 2021
      </p>
    </footer>
  )
}
