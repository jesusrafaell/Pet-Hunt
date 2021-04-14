import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import firebaseConfig from './config'

class Firebase {
	constructor() {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		this.auth = firebase.auth()
		this.db = firebase.firestore()
		this.storage = firebase.storage()
	}

	async signup(name, email, password) {
		const newUser = await this.auth.createUserWithEmailAndPassword(email, password)
		return await newUser.user.updateProfile({
			displayName: name
		})
	}

	async login(email, password) {
		return await this.auth.signInWithEmailAndPassword(email, password)
	}

	async signOut() {
		await this.auth.signOut()
	}
}

const app = new Firebase()
export default app
