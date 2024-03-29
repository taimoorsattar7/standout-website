import React, { useEffect, useState } from "react"

import { querySanity } from "@lib/querySanity"

import Layout from "@components/layout"
import Seo from "@components/seo"

import { navigate, Link } from "gatsby"
import { isLoggedIn, getCurrentUser } from "@utils/auth"

import PortableText from "@components/portabletext/portableText"

export default function Modules({ location, params, slug }) {
  const [content, setcontent] = useState(null)

  useEffect(() => {
    if (isLoggedIn()) {
      fetchData()
    } else {
      navigate("/login")
    }
  }, [])

  async function fetchData() {
    try {
      let usr = getCurrentUser()

      let data = await querySanity(`
        *[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${usr.email}']._id]{'module': price->content->{_id, title, exerpt, 'image': image.asset->{_updatedAt, extension, originalFilename, url}, slug}}
      `)

      setcontent(data)
    } catch (e) {
      setcontent(false)
    }
  }

  if (content == null) {
    return (
      <Layout location={location}>
        <h3 className="text-base font-normal text-gray-700">
          Please wait your data is loading...
        </h3>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <Seo title="Modules" location={location} description="Modules Page." />

      {content === false ? (
        <h3 className="text-base font-normal text-gray-700">Nothing Found</h3>
      ) : (
        <div className="container max-w-2xl px-3 mx-auto">
          <h1 className="mb-2 text-3xl font-extrabold leading-snug">
            You course
          </h1>

          <h3 className="mb-6 text-base font-normal text-gray-700">
            You can manage the subsciptions on the{" "}
            <Link className="text-blue-500" to="/settings">
              settings page &#8594;
            </Link>
          </h3>
          <section className="flex flex-wrap justify-between gap-4 antialiased">
            {content.map((data, index) => {
              let imageURL = data?.module?.image?.url
              return (
                <div key={index} className="w-5/12 h-full">
                  <div className="max-w-xs mx-auto">
                    <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-lg">
                      <Link
                        className="block focus:outline-none focus-visible:ring-2"
                        to={`/modules/${data.module?.slug?.current}`}
                      >
                        {imageURL ? (
                          <figure className="relative h-0 pb-[56.25%] overflow-hidden">
                            <img
                              className="absolute inset-0 object-cover w-full h-full transition duration-700 ease-out transform hover:scale-105"
                              src={data?.module?.image?.url}
                              alt="Paris"
                              loading="lazy"
                            />
                          </figure>
                        ) : (
                          <></>
                        )}
                      </Link>
                      <div className="flex flex-col flex-grow p-5">
                        <div className="flex-grow">
                          <header className="mb-3">
                            <a
                              className="block focus:outline-none focus-visible:ring-2"
                              href="#0"
                            >
                              <h3 className="mb-4 text-xl font-extrabold leading-snug text-gray-900">
                                {data.module.title}
                              </h3>

                              <p className="text-sm leading-snug text-gray-500">
                                <PortableText blocks={data.module.exerpt} />
                              </p>
                            </a>
                          </header>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Link
                            className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
                            to={`/modules/${data.module.slug.current}`}
                          >
                            Go to the course »
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </section>
        </div>
      )}
    </Layout>
  )
}
