import React from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Link } from "gatsby"

import PortableText from "@components/portabletext/portableText"

export default function ProductList({ data }) {
  return (
    <div className="p-4 md:w-2/4">
      <section className="flex flex-col justify-center antialiased">
        <div className="h-full">
          <div className="max-w-xs mx-auto">
            <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-lg">
              <Link
                className="block focus:outline-none focus-visible:ring-2"
                to={`/modules/${data.slug.current}`}
              >
                <figure className="relative h-0 pb-[56.25%] overflow-hidden">
                  <GatsbyImage
                    className="absolute inset-0 object-cover w-full h-full transition duration-700 ease-out transform hover:scale-105"
                    image={getImage(data.image.asset)}
                    alt={"heading"}
                  />
                </figure>
              </Link>
              <div className="flex flex-col flex-grow p-5">
                <div className="flex-grow">
                  <header className="mb-3">
                    <a
                      className="block focus:outline-none focus-visible:ring-2"
                      href="#0"
                    >
                      <h3 className="text-xl font-extrabold leading-snug text-gray-900">
                        {data.title}
                      </h3>
                    </a>
                  </header>

                  <div className="mb-8">
                    <p className="overflow-hidden text-clip">
                      {data._rawExerpt && (
                        <PortableText blocks={data._rawExerpt} />
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Link
                    className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-none focus-visible:ring-2 hover:bg-indigo-600 text-white"
                    to={`/product/${data.slug.current}`}
                  >
                    Go to the page »
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
