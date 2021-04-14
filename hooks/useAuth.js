import {useState, useEffect} from 'react'
import app from '../firabase'

const useAuth = () => {
	const [userAuth, saveUserAuth] = useState(null)

	useEffect(() => { 
		const unsuscribe = app.auth.onAuthStateChanged(user => {
			if (user) {
				saveUserAuth(user)
			} else {
				saveUserAuth(null)
			}
		})
		return () => unsuscribe()
		//eslint-disable-next-line
	}, [])
	return userAuth
}

export default useAuth
