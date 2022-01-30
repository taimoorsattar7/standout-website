import React, { useEffect, useState } from "react"

import PortableText from "@components/portabletext/portableText"

import Layout from "@components/layout"
import { navigate } from "gatsby"
import { isLoggedIn, getCurrentUser } from "@utils/auth"
import { querySanity } from "@lib/querySanity"
// import archieveSubscription from "@lib/sanity/archieveSubscription"
import Axios from "axios"
import toast, { Toaster } from "react-hot-toast"

const Manage = ({ location }) => {
  const [subscriptions, setSubscriptions] = useState(null)
  const [disable, setDisable] = useState(false)
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login")
    } else {
      fetchSupscription()
    }
  }, [subscriptions])

  async function fetchSupscription() {
    let { email } = getCurrentUser()

    let data = await querySanity(`
      *[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${email}']._id]
      {_id, _type, customer, status, cancel_at_period_end, canceled_at, cancel_at, start_date, price,
        'module': price->content->{_id, _type, exerpt, title, seo,
          'img': seo.image.asset->{
            _updatedAt,
            extension,
            originalFilename,
            url},
        slug
      }}
    `)
    setSubscriptions(data)
  }

  async function cancelSubscription(req) {
    setDisable(true)
    let is = window.confirm(req.confirmMsg)

    if (is) {
      let { token } = getCurrentUser()
      try {
        let { data, status } = await Axios.post(`/api/cancelSubscription`, {
          token: token,
          subID: req._id,
          actionReq: req.actionReq,
        })

        setDisable(false)

        if (data.message === "success" && status === 200) {
          toast.success("Your request is fulfilled.")
        }

        setSubscriptions(null)

        return data
      } catch (error) {
        setDisable(false)
        toast.success("Something went wrong.", {
          icon: "⚠️",
        })
      }
    }
  }

  if (subscriptions === null) {
    return (
      <Layout location={location}>
        <p>Please wait the data is loading!!!</p>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <Toaster position="top-center" />

      <div className="container max-w-2xl px-3 mx-auto">
        <h1 className="mb-4 text-3xl font-extrabold leading-snug">
          Your's Subsciption
        </h1>

        <section className="flex flex-wrap justify-between gap-4 antialiased">
          {subscriptions.map(data => {
            return (
              <div className="w-5/12 h-full">
                <div className="max-w-xs mx-auto">
                  <div className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col flex-grow p-5">
                      <div className="flex-grow">
                        <header className="mb-6">
                          <a
                            className="block focus:outline-none focus-visible:ring-2"
                            href="#0"
                          >
                            <h3 className="text-xl font-extrabold leading-snug text-gray-900">
                              {data?.module?.title}
                            </h3>
                          </a>
                        </header>
                        {data?.cancel_at_period_end == true && (
                          <h3 className="py-1 text-xs italic font-light">
                            Canceled at {data?.canceled_at}
                          </h3>
                        )}

                        <div className="mb-8">
                          <p className="overflow-hidden text-clip">
                            {data?.module?.exerpt && (
                              <PortableText blocks={data?.module?.exerpt} />
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="relative flex justify-end space-x-2">
                        {data?.status && (
                          <button class="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-50 focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500">
                            {data.status}
                          </button>
                        )}

                        {data?.cancel_at_period_end == false && (
                          <button
                            className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-non text-white disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:pointer-events-none"
                            disabled={disable ? true : false}
                            onClick={() =>
                              cancelSubscription({
                                _id: data._id,
                                confirmMsg:
                                  "Do you want to cancel the subsciption at the end of trial period.",
                              })
                            }
                          >
                            😔 Cancel at period end
                          </button>
                        )}

                        {data?.cancel_at_period_end == true && (
                          <button
                            className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out bg-indigo-500 focus:outline-non text-white disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:pointer-events-none"
                            disabled={disable ? true : false}
                            onClick={() =>
                              cancelSubscription({
                                _id: data._id,
                                actionReq: "dont_cancel",
                                confirmMsg:
                                  "Do you want to resume the subsciption.",
                              })
                            }
                          >
                            Resume subscription »
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export default Manage
