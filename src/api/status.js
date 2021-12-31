export default function handler(
  req,
  res
) {
  // https://docs.netlify.com/configure-builds/environment-variables/
  res.status(200).send({
    NETLIFY: process.env.NETLIFY,
    BUILD_ID: process.env.BUILD_ID,
    CONTEXT: process.env.GATSBY_CONTEXT,
    NODE_VERSION: process.env.NODE_VERSION,
    NODE_ENV: process.env.NODE_ENV,
    URL: process.env.URL,
    DEPLOY_URL: process.env.DEPLOY_URL,
    msg: `hello world`,
  })
}
