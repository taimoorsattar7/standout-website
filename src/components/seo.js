import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, canonical, lang, meta, title, origin, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaCanonical = canonical || site.siteMetadata?.siteUrl

  const metaOrigin = origin || site.siteMetadata?.siteUrl
  const metaImage = image ? image : `${metaOrigin}/banner.jpg`

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
      >
        <meta name="yandex-verification" content="42cde140c0068db5" />
        <title>{defaultTitle}</title>
        <meta name="title" content={`${defaultTitle} | Taimoor Sattar`} />
        <meta name="author" content="Taimoor Sattar" />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={metaCanonical} />

        {/* Social: Twitter  */}
        {/* After inserting META need to validate at https://dev.twitter.com/docs/cards/validation/validator  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@taimoorsattar7" />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:url" content={metaCanonical} />

        {/* Open Graph */}
        <meta property="og:url" content={metaCanonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>
    </>
  )
}

export default Seo
