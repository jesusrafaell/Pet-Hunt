import app, {FirebaseContext} from '../firabase'
import useAuth from '../hooks/useAuth'

function MyApp({Component, pageProps}) {
	const user = useAuth()
	return (
		<FirebaseContext.Provider
			value={{
				app,
				user
			}}
		>
			<Component {...pageProps} />
		</FirebaseContext.Provider>
	)
}

export default MyApp
