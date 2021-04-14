import React, {useState} from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import Router from 'next/router'

const InputText = styled.input`
  border: 2px solid var(--gris2);
  padding: 2rem;
  min-width: 300px;
`

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/static/img/search.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 2rem;
  top: 1rem;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`

export default function Search() { 

  const [search, saveSearch] = useState('')

  const handleSearch = e => {
    e.preventDefault()
    if(search.trim() === '') return
    //redirect to search
    Router.push({
      pathname: '/search',
      query: { q : search }
    })
  }

  return (
    <form
      css={css` 
       position: relative; 
      `}
      onSubmit={handleSearch}
    >
      <InputText
        type="text"
        placeholder="Search Pet"
        onChange={e => saveSearch(e.target.value)}
      />
      <InputSubmit type="submit">Search</InputSubmit>
    </form>
  )
}

