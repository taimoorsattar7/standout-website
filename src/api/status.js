export default function handler(req, res) {
  // https://docs.netlify.com/configure-builds/environment-variables/
  res.status(200).send({
    NETLIFY: String(process.env.NETLIFY),
    BUILD_ID: String(process.env.BUILD_ID),
    CONTEXT: String(process.env.GATSBY_CONTEXT),
    NODE_VERSION: String(process.env.NODE_VERSION),
    NODE_ENV: String(process.env.NODE_ENV),
    URL: String(process.env.URL),
    DEPLOY_URL: String(process.env.DEPLOY_URL),
    msg: `hello world`,
  })
}
