import React from "react"

export default ({ node }: any) => {
  if (!node || !node.code) {
    return null
  }
  
  const { language, code } = node
  return (
    <pre className={`language-${language}`}>
  <code className={`language-${language}`}>
  {code}
  </code>
</pre>
  )
}