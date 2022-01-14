import React, { useEffect } from "react"

import { cVerifyToken, isLoggedIn, logout, getCurrentUser } from "@utils/auth"

import { Link, useStaticQuery, graphql, navigate } from "gatsby"

import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import queryString from "query-string"

export default function Header({ location }) {
  const dataImg = useStaticQuery(graphql`
    query biosQueryAndBioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData
          original {
            src
          }
        }
        publicURL
      }
    }
  `)
  const avatar = dataImg?.avatar?.childImageSharp?.gatsbyImageData

  useEffect(() => {
    const queriedTheme = queryString.parse(location.search)

    if (queriedTheme.token) {
      checkToken(queriedTheme.token)
    }
  }, [])

  async function checkToken(token) {
    await cVerifyToken(token)
    // getCurrentUser()
  }

  function handleLogout() {
    logout(navigate("/login"))
  }
  return (
    <header className="container max-w-2xl mx-auto px-3 pt-10">
      <nav
        className="relative flex items-center justify-between sm:h-10"
        aria-label="Global"
      >
        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/">
              <span className="sr-only">Author</span>
              {/* <Image
                fixed={avatar}
                alt={"logo"}
                className="bio-avatar"
                imgStyle={{
                  borderRadius: `50%`,
                }}
              /> */}

              {/* <StaticImage
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={"http://localhost:8000/gradienta.jpg"}
                alt="A dinosaur"
                placeholder="blurred"
              /> */}

              {/* <GatsbyImage
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                image={avatar}
                alt={"heading"}
              /> */}
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
              location.pathname === "/blogs"
                ? "font-medium text-blue-500"
                : "hover:text-blue-800"
            }
            to="/blogs"
          >
            Blogs
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

      <div className="nav flex py-3 text-sm font-medium border-b"></div>
    </header>
  )
}
