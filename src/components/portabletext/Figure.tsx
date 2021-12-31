import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import clientConfig from "../../../client-config"

export const Figure = ({
  node,
}: {
  node: {
    asset: any
    alt: string | undefined
    caption:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
  }
}) => {
  if (!node || !node.asset || !node.asset._id) {
    return null
  }
  const gatsbyImageData = getGatsbyImageData(
    node,
    { maxWidth: 675 },
    clientConfig.sanity
  )
  return (
    <figure>
      <GatsbyImage
        className="fullwidth"
        image={gatsbyImageData}
        alt={node.alt}
      />
      <figcaption style={{ color: "gray", fontSize: "1rem" }}>
        {node.caption}
      </figcaption>
    </figure>
  )
}
