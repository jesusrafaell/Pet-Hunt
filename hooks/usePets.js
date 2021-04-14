import {useState, useEffect, useContext} from 'react'
import {FirebaseContext} from '../firabase'

const usePets = order => {

	const [pets, savePets] = useState([])

	const {app} = useContext(FirebaseContext)

	useEffect(() => {
		const getPets = () => {
			app.db.collection('pets').orderBy(order, 'desc').onSnapshot(snapsManager)
		}
		getPets()
		//eslint-disable-next-line
	}, [])

	function snapsManager(snapshot) {
		const pets = snapshot.docs.map(data => {
			return {
				id: data.id,
				...data.data()
			}
		})
		savePets(pets)
	}

	return {
		pets
	}
}

export default usePets
