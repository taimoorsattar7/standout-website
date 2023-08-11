import React, { useEffect, useState } from "react"

import { querySanity } from "@lib/querySanity"
import { getCurrentUser, isLoggedIn } from "@utils/auth"

import { FaPaperclip } from "react-icons/fa"
import PortableText from "@components/portabletext/portableText"

import Axios from "axios"

import Layout from "@components/layout"
import Seo from "@components/seo"

export default function ModulePrd({ location, params }) {
  let [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        let contentData = await querySanity(`
          *[_type =='content' && slug.current=='${params.product}']{
            _id, title, exerpt,
            'documents': documents[].asset->{
              url, originalFilename
            },}`)

        let contentRef = contentData[0]._id

        let { token } = getCurrentUser()
        let { data } = await Axios.get(
          `/api/isSubscribe?token=${token}&contentRef=${contentRef}`,
        )

        if (data?.is) {
          setData(contentData[0])
        }
      } catch (error) {
        setData(false)
      }
    }

    if (isLoggedIn()) {
      fetchData()
    }
  }, [params.product])

  if (data == null) {
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
      <Seo title={data.title} location={location} description="Modules Page." />

      {data === false ? (
        <h3 className="text-base font-normal text-gray-700">
          You are not authorize to view the content.
        </h3>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Course
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              Course details and attachment.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.title}
                </dd>
              </div>

              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.exerpt && <PortableText blocks={data.exerpt} />}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                    {data?.documents?.map(doc => {
                      return (
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex items-center flex-1 w-0">
                            <FaPaperclip
                              className="flex-shrink-0 w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="flex-1 w-0 ml-2 truncate">
                              {doc.originalFilename}
                            </span>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <a
                              href={doc.url}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </Layout>
  )
}
