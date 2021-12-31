import React from "react"

export default ({ node }) => {
  if (!node || !node.code) {
    return null
  }
  return (
    <div>This is table</div>
  )
}
