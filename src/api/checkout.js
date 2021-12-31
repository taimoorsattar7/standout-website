import Joi from "joi"

// @ts-ignore
import { createSession, retrieveSession } from "../lib/stripe/checkout"

/**
 * Checkout handler, used to retreive Stripe checkout sessions (GET)
 * and create Stripe checkout sessions (POST).
 *
 */

export default async function handler(
  req,
  res
) {
  try {
    if (req.method === "POST") {
      await createStripeSession(req, res)
    } else if (req.method === "GET") {
      await fetchStripeSession(req, res)
    } else {
      throw {
        status: 500,
        message: `${req.method} not allowed`,
      }
    }
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    // Respond with error code and message
    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}

/**
 * Create a Stripe checkout session with Github username added as metadata.
 * Uses env variables GITHUB_REPO_OWNER, GITHUB_REPO and STRIPE_PRICE_ID.
 *
 * @param  {string} req.body.successUrl Passed to Stripe checkout session
 * @param  {string} req.body.cancelUrl Passed to Stripe checkout session
 */

const createStripeSession = async (
  req,
  res
) => {
  // 1. Validate the data coming in
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().required(),
    priceId: Joi.string(),
    mode: Joi.string(),
    metadata: Joi.object(),
    successUrl: Joi.string().required(),
    cancelUrl: Joi.string().required(),
  }).required()

  const { value, error } = schema.validate(req.body)
  if (error) {
    throw {
      status: 422,
      message: error,
    }
  }

  // 2. Create a Stripe Checkout Session with the Github username as metadata
  const session = await createSession({
    email: value.email,
    priceId: value.priceId,
    mode: value.mode,
    metadata: value.metadata,
    successUrl: value.successUrl,
    cancelUrl: value.cancelUrl,
  })

  // 3. Response with url to session url
  res.json({ url: session.url })
}

/**
 * Retreive a Stripe checkout session.
 *
 * @param  {string} req.query.sessionId Stripe checkout id
 */

const fetchStripeSession = async (
  req,
  res
) => {
  // 1. Validate the data coming in
  const schema = Joi.object({
    sessionId: Joi.string().required(),
  }).required()

  const { value, error } = schema.validate(req.query)
  if (error) {
    throw {
      status: 422,
      message: error,
    }
  }

  // Retrieve the Stripe Session
  const sessionFromStripe = await retrieveSession({
    id: value.sessionId,
  })

  // Make sure we have the GitHub username needed
  const metadata = sessionFromStripe.metadata
  if (!metadata) {
    throw {
      status: 402,
      message: "metatags not found",
    }
  }

  // Make sure the session is paid for
  if (sessionFromStripe.payment_status !== "paid") {
    throw {
      status: 402,
      message: "Payment still required",
    }
  }

  // 3. Respond
  res.status(200).json({
    message: "Yeh!!!",
  })
}
