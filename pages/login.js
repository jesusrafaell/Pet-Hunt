import {useState, useContext} from 'react'
import Router, {useRouter} from 'next/router'
import {css} from '@emotion/react'
import Layout from '../components/layout/Layout'
import {FormAp, Camp, InputSubmit, Error} from '../components/ui/FormAp'
import app, {FirebaseContext} from '../firabase'
//validations
import useValidation from '../hooks/useValidation'
import validateLogin from '../validation/validateLogin'

const STATE_INIT = {
	email: '',
	password: ''
}

export default function Login() {

	const router = useRouter()
	const {user} = useContext(FirebaseContext)
	user && router.push('/')

	const [error, saveError] = useState(false)

	const {values, errors, handleChange, handleSubmit, handleBlur} = useValidation(STATE_INIT, validateLogin, LoginUser)

	const {email, password} = values

	async function LoginUser() {
		try {
			const user = await app.login(email, password)
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
							color: var(--blue)
					  }
					`}
				>Login</h1>
				<FormAp
					onSubmit={handleSubmit}
				>
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
						value="Login"
					/>
				</FormAp>
			</Layout>
		</div>
	)
}
