import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout';
import DetailsPet from '../components/layout/DetailsPet'
import usePets from '../hooks/usePets'

export default function Search() { 

	const router = useRouter()
	const { query: {q} } = router

	const { pets } = usePets('create')

	const [ result, saveResult ] = useState([])

	useEffect(() => {
		const search = q.toLowerCase()
		const filter = pets.filter(pet => {
			return (
				pet.name.toLowerCase().includes(search) ||
				pet.owner.toLowerCase().includes(search) ||
				pet.breed.toLowerCase().includes(search) ||
				pet.description.toLowerCase().includes(search)
			)
		})
		saveResult(filter)
	}, [q, pets])

	return (
		<div>
			<Layout>
				{result.length == 0 ? <h1>No results found for your search: {q}</h1> : (
					<div className="list-pet">
						<div className="container">
							<ul className="bg-white">
								{result.map(pet => (
									<DetailsPet
										key={pet.id}
										pet={pet}
									/>
								))}
							</ul>
						</div>
					</div>
				)}
			</Layout>
		</div>
	)
}
