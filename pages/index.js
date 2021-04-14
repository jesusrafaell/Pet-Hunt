import Layout from '../components/layout/Layout';
import DetailsPet from '../components/layout/DetailsPet'
import usePets from '../hooks/usePets'

export default function Home() {
	
	const { pets } = usePets('create')

	return (
		<div>
			<Layout>
				<div className="list-pet">
					<div className="container">
						<ul className="bg-white">
							{pets.map(pet => (
								<DetailsPet
									key={pet.id}
									pet={pet}
								/>
							))}
						</ul>
					</div>
				</div>
			</Layout>
		</div>
	)
}
