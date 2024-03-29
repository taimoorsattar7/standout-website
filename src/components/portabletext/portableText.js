import React from "react"
import clientConfig from "../../../client-config"
import BasePortableText from "@sanity/block-content-to-react"

const PortableText = props => (
  <BasePortableText blocks={props.blocks} {...clientConfig.sanity} />
)

export default PortableText
