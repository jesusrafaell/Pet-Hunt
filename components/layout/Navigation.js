import {useContext} from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {FirebaseContext} from '../../firabase'

const Nav = styled.nav`
  padding-left: 2rem;
  a{
    font-size: 1.8rem;
    margin-left: 2rem;
    padding: 2rem;
    color: var(--gris2);
    font-family: 'Soucer Sans Pro', sans-serif;

    &:last-of-type{
      margin-right: 0; 
    }

    &:hover{
      color: black; 
      font-family:'Kiwi Maru', serif; 
      font-size: 1.6rem;
    }
  }
`

export default function Navigation() {

  const {user} = useContext(FirebaseContext)

  return (
    <Nav>
      {user && (
        <div>
          <Link href="/">Home</Link>
          <Link href="/populars">Populars</Link>
          <Link href="/new-pet">New Pet</Link>
        </div>
      )}
    </Nav>
  )
}

