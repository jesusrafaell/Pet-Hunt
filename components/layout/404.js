import React from 'react'
import {css} from '@emotion/react'

const Error404 = () => {
  return (
    <h1
      css={css`
        margin-top: 4rem;
        text-align: center;
        color: darkred;
        font-family: Arial;
      `}
    >Invalid Page</h1>
  )
}

export default Error404
