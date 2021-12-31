import React from "react"

const Post = ({ post }) => {
  const { html } = post
  const { title, date } = post.frontmatter

  return (
    <>
      <h1 className="text-4xl font-bold text-center uppercase mb-6">{title}</h1>
      <div className="text-center italic text-sm mb-5">
        Sent by Bojan Gabric on
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

export default Post
