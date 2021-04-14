import React, {useEffect, useContext, useState} from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {useRouter} from 'next/router'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import Layout from '../../components/layout/Layout'
import {FirebaseContext} from '../../firabase'
import Error404 from '../../components/layout/404'
import { Camp, InputSubmit } from '../../components/ui/FormAp'
import Button from '../../components/ui/Button'

const ContainerPet = styled.div` 
	@media (min-width:768px) { 
		display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem; 
	}
	img{
    width: 80%;
    margin-right: 1rem;
	}
`

const CreatePet = styled.p` 
	padding: .5rem 2rem;
	background-color: #DA552F;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	display: inline-block;
	text-align: center;
`

const AuthorPet = styled.p`
	margin-top: -40px;
	padding: .4rem 3rem;
	color: #636363;
	font-weight: bold;
	margin-left: 80%;
	position: relative;
`

const Pet = () => {

	const [pet, savePet] = useState('')
	const [error, saveError] = useState(false)
	const [ comment, saveComment ] = useState({})
	const [ consultDB, saveConsultDB ] = useState(true)

	const router = useRouter()
	const {query: {id}} = router

	const {user, app} = useContext(FirebaseContext)

	useEffect(() => {
		if (id && consultDB) {
			const getPet = async () => {
				const petQuery = await app.db.collection('pets').doc(id)
				const pet = await petQuery.get()
				if (pet.exists){
					savePet(pet.data())
					saveConsultDB(false)
				}
				else
					saveError(true)
					saveConsultDB(false)
			}
			getPet()
		}
	}, [id, consultDB])

	if (Object.keys(pet).length === 0 && !error) return <h1>Loading...</h1>

	const {comments, create, description, likes, name, owner, url, urlimg, author, userLikes} = pet

	const likePet = () => {
		if(!user) 
			return router.push('/login')
		//check user liked
		//dislike
		if(userLikes.includes(user.uid)) {
			const newLikes = likes - 1
			const newUserLikes = [...userLikes]
			let index = newUserLikes.indexOf(user.uid)
			if(index !== -1){
				newUserLikes.splice(index,1)
				//update
				savePet({
					...pet,
					likes: newLikes
				})
				app.db.collection('pets').doc(id).update({likes: newLikes, userLikes: newUserLikes})
			saveConsultDB(true)
			}
		}else{
			const newLikes = likes + 1
			const newUserLikes = [...userLikes, user.uid]
			//update
			savePet({
				...pet,
				likes: newLikes
			})
			app.db.collection('pets').doc(id).update({likes: newLikes, userLikes: newUserLikes})
			saveConsultDB(true)
		}
	}

	const commnetOnChange = e => {
		saveComment({
			...comment,
			[e.target.name]: e.target.value
		})
	}

	//comments from author
	const isAuthor = id => {
		if(author.id == id){
			return true;
		}
	}

	const isAdmin = () => {
		if(!user) return false
		if(author.id === user.uid)
			return true
	}

	const deletePet = async() => {
		if(!user)
			return router.push('/login')
		if(author.id !== user.uid)
			return router.push('/')
		try{
			await app.db.collection('pets').doc(id).delete()
			router.push('/')
		}catch(e){
			console.log(e)
		}
	}

	const addCommnet = e => {
		e.preventDefault()
		if(!user) 
			return router.push('/login')
		comment.userId = user.uid
		comment.userName = user.displayName
		comment.date = Date.now()

		const newComments = [...comments, comment]
		app.db.collection('pets').doc(id).update({
			comments: newComments
		})
		savePet({
			...pet,
			comments: newComments
		})
		saveConsultDB(true)
	}

	return (
		<Layout>
			<>
				{error ? <Error404 /> : (
					<div className="container">
						<h1 css={css`
							text-align: center;
							margin-top: 5rem;
						`}
						>{name}</h1>
						<ContainerPet>
							<div>
								<p>Post {formatDistanceToNow(new Date(create))} ago</p>
								<p>Owner: {owner}</p>
								<img src={urlimg} />
								<p css={css`
									margin-top: auto;
									font-size: 2rem;
								`}>Posted By {author.name} </p>
								<p>{description}</p>

								{user && ( 
									<form
										onSubmit={addCommnet}
									>
										<Camp>
											<input  
												placeholder="Add a comment"
												type="text"
												name="message"
												onChange={commnetOnChange}
											/>
										</Camp>
										<InputSubmit
											type="submit"
											value="Comment"
										/>
									</form>
								)}

								<h2 css={css`
									margin: 2rem 0;
								`}>Comments</h2>

								{comments.length === 0 ? "No comments yet" : (
									<ul>
										{comments.map((comment, i) => (
											<li
												key={`${comment.userId}-${i}`}
												css={css`
													border: 1px solid #d1d1d1;
													margin-top: 0.5rem;
													padding: 2rem;
												`}
											>
												<div css={css`
														display: flex;
													`}>
													<span
														css={css`
															margin-top: 1.5rem;
															font-weight: bold;
															margin-right: 1rem;
														`}
													>{comment.userName}</span>
													<p>{formatDistanceToNow(new Date(comment.date))} ago</p>
												</div>
												<p
													css={css`
														margin: auto;
													`}
												>{comment.message}</p>
												{ isAuthor(comment.userId) && 
													<AuthorPet>&#10040;</AuthorPet>
												}
											</li>
										))}
									</ul>
									)}
							</div>
							<aside>
								<Button
									target="_blank"
									bgColor="true"
									href={url}
								>View URL</Button>
								<div css={css`
									display: flex;
									p{
										margin-top: 3rem;
										margin-right: 2rem ;
										font-size: 2rem;
									}
									a{
										width: 50%;
										background-color: white;
									}
								`}>
									<p css={css`
										text-align: "center";
									`}>{likes} Likes </p>
									{user && (
										<Button
											onClick={likePet}
										>Like</Button>
									)}
								</div>
								{ isAdmin() && 
									<Button
										onClick={deletePet}
									>Delete Pet</Button>
								}
							</aside>
						</ContainerPet>
					</div>
				)}
			</>
		</Layout>
	)
}

export default Pet
