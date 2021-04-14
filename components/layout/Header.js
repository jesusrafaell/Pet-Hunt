import React, {useContext} from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import Search from '../ui/Search'
import Navigation from './Navigation'
import Button from '../ui/Button'
import {FirebaseContext} from '../../firabase'

const ContainerHeader = styled.div` 
	max-width: 1300px; 
	width: 95%; 
	margin: 0 auto; 
	@media (min-width:700px) { 
		display: flex; 
		justify-content: space-between; 
	}
`

const Logo = styled.a`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700; 
  font-family:'Kiwi Maru', serif;
  margin-right: 2rem;
`

export default function Header() {


	const {user, app} = useContext(FirebaseContext)

	return (
		<header
			css={css` 
			  border-bottom: 2px solid var(--gris3); 
			  padding: 1rem 0; 
		  `}
		>
			<ContainerHeader>
				<div
					css={css`
					  display: flex;
					  align-items: center;
					  &:hover{
						cursor: pointer;
					  }
					`}
				>
					<Link href="/">
						<Logo>P</Logo>
					</Link>
					<Search />
					<Navigation />

				</div>

				<div
					css={css`
				  display: flex;
				  align-items: center;
				`}
				>
					{user ? (
						<>
							<p
								css={css`
								  margin-right: 3rem; 
								`}
							>Hello: {user.displayName}</p>
							<Button
								bgColor="true"
								onClick={() => app.signOut()}
							>SignOut</Button>
						</>
					) : (
						<>
							<Link href="/login">
								<Button
									bgColor="true"
								>Login</Button>
							</Link>

							<Link href="/signup">
								<Button>Sign Up</Button>
							</Link>
						</>
					)}
				</div>
			</ContainerHeader>
		</header>
	)
}

