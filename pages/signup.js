import {useState} from 'react'
import Router from 'next/router'
import {css} from '@emotion/react'
import Layout from '../components/layout/Layout'
import {FormAp, Camp, InputSubmit, Error} from '../components/ui/FormAp'
import app from '../firabase'
//validations
import useValidation from '../hooks/useValidation'
import validateSignUp from '../validation/validateSignUp'

const STATE_INIT = {
	name: '',
	email: '',
	password: ''
}
export default function SignUp() {

	const [error, saveError] = useState(false)

	const {values, errors, handleChange, handleSubmit, handleBlur} = useValidation(STATE_INIT, validateSignUp, createAccount)

	const {name, email, password} = values

	async function createAccount() {
		try {
			await app.signup(name, email, password)
			Router.push('/')
		} catch (e) {
			console.error(e.message)
			saveError(e.message)
		}
	}

	return (
		<div>
			<Layout>
				<h1
					css={css`
					  text-align: center;
					  margin-top: 5rem;
					  &:hover {
							color: var(--orange)
					  }
					`}
				>Sign Up</h1>
				<FormAp
					onSubmit={handleSubmit}
				>
					<Camp>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							placeholder="Your name"
							name="name"
							value={name}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.name && <Error>{errors.name}</Error>}
					</Camp>

					<Camp>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							placeholder="example@email.com"
							name="email"
							value={email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.email && <Error>{errors.email}</Error>}
					</Camp>

					<Camp>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							placeholder="******"
							name="password"
							value={password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Camp>
					{errors.password && <Error>{errors.password}</Error>}
					{error && <Error>{error}</Error>}

					<InputSubmit
						type="submit"
						value="Sign Up"
					/>
				</FormAp>
			</Layout>
		</div>
	)
}
