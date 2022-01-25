import React, { useEffect } from "react"

import { cVerifyToken, isLoggedIn, logout } from "@utils/auth"

import { Link, useStaticQuery, graphql, navigate } from "gatsby"

import queryString from "query-string"

export default function Header({ location }) {
  useEffect(() => {
    const queriedTheme = queryString.parse(location.search)

    if (queriedTheme.token) {
      checkToken(queriedTheme.token)
    }
  }, [])

  async function checkToken(token) {
    await cVerifyToken(token)
  }

  function handleLogout() {
    logout(navigate("/login"))
  }
  return (
    <header className="container max-w-2xl px-3 pt-10 mx-auto">
      <nav
        className="relative flex items-center justify-between sm:h-10"
        aria-label="Global"
      >
        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/">
              <span className="sr-only">Author</span>

              <img
                className="w-auto h-10"
                src="/avatar.png"
                alt="avatar"
                loading="lazy"
              />
            </a>
          </div>
        </div>
        <div className="md:block md:ml-10 md:pr-4 md:space-x-8">
          <Link
            className={
              location.pathname === "/"
                ? "font-medium text-blue-500"
                : "hover:text-blue-800"
            }
            to="/"
          >
            Home
          </Link>

          <Link
            className={
              location.pathname === "/product"
                ? "font-medium text-blue-500"
                : "hover:text-blue-800"
            }
            to="/product"
          >
            Product
          </Link>

          <Link
            className={
              location.pathname === "/contact"
                ? "font-medium text-blue-500"
                : "hover:text-blue-800"
            }
            to="/contact"
          >
            Contact
          </Link>

          {isLoggedIn() === true ? (
            <div className="inline-flex md:space-x-8">
              <Link
                className={
                  location.pathname === "/modules"
                    ? "font-medium text-blue-500"
                    : "hover:text-blue-800"
                }
                to="/modules"
              >
                Dashboard
              </Link>

              <Link
                onClick={() => {
                  handleLogout()
                }}
                className="font-medium"
                to="#"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link
              className={
                location.pathname === "/login"
                  ? "font-medium text-blue-500"
                  : "hover:text-blue-800"
              }
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className="flex py-3 text-sm font-medium border-b nav"></div>
    </header>
  )
}
