import React, {useState, useContext} from 'react'
import {css} from '@emotion/react'
import {useRouter} from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import Layout from '../components/layout/Layout'
import {FormAp, Camp, InputSubmit, Error} from '../components/ui/FormAp'
import breeds from '../public/static/breed'
import { FirebaseContext } from '../firabase'
//validations
import useValidation from '../hooks/useValidation'
import validateNewPet from '../validation/validateNewPet'
import Error404 from '../components/layout/404'

const STATE_INIT = {
	name: '',
	owner: '',
	url: '',
	breed: '',
	description: ''
}

export default function NewPet() {

	const [nameimg, saveNameImg] = useState('')
	const [uploading, saveUploading] = useState(false)
	const [progress, saveProgress] = useState(0)
	const [urlimg, saveUrlImg] = useState('')
	const [error, saveError] = useState(false)

	const router = useRouter()

	const {user, app} = useContext(FirebaseContext)

	const {values, errors, handleChange, handleSubmit, handleBlur} = useValidation(STATE_INIT, validateNewPet, createNewPet)

	const {name, owner, url, breed, description} = values

	async function createNewPet() {
		if (!user)
			return router.push('/login')
		const pet = {
			name,
			owner,
			breed,
			url,
			urlimg,
			description,
			likes: 0,
			comments: [],
			create: Date.now(),
			author: {
				id: user.uid,
				name: user.displayName
			},
			userLikes: []
		}
		//Send database
		app.db.collection('pets').add(pet)
		return router.push('/')
	}

	const handleUploadStart = () => {
		saveProgress(0)
		saveUploading(true)
	}

	const handleProgress = progress => saveProgress({progress})

	const handleUploadError = error => {
		saveUploading(error)
		console.error(error)
	}

	const handleUploadSuccess = name => {
		saveProgress(100)
		saveUploading(false)
		saveNameImg(name)
		app.storage.ref("pets").child(name).getDownloadURL().then(url => {
			console.log(url)
			saveUrlImg(url)
		})
	}

	return (
		<div>
			<Layout>
				{!user ? <Error404 /> : (
					<>
						<h1
							css={css`
								text-align: center;
								margin-top: 5rem;
								&:hover {
								color: var(--orange)
								}
							`}
						>Pet</h1>
						<FormAp
							onSubmit={handleSubmit}
						>
							<fieldset>
								<legend>General Info</legend>
								<Camp>
									<label htmlFor="name">Name</label>
									<input
										type="text"
										id="name"
										placeholder="The Pet's Name"
										name="name"
										value={name}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</Camp>
								{errors.name && <Error>{errors.name}</Error>}

								<Camp>
									<label htmlFor="owner">Pet Owner</label>
									<input
										type="text"
										id="owner"
										placeholder="Your name"
										name="owner"
										value={owner}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.owner && <Error>{errors.owner}</Error>}
								</Camp>

								<Camp>
									<label htmlFor="breed">Breed</label>
									<select
										id="bredd"
										name="breed"
										value={breed}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<option>- - -</option>
										{breeds.map((op, i) => (
											<option key={i} value={op} >{op}</option>
										))}
									</select>
								</Camp>

								{errors.breed && <Error>{errors.breed}</Error>}

								<Camp>
									<label htmlFor="img">Photo</label>
									<FileUploader
										accept="image/*"
										id="img"
										name="img"
										randomizeFilename
										storageRef={app.storage.ref("pets")}
										onUploadStart={handleUploadStart}
										onUploadError={handleUploadError}
										onUploadSuccess={handleUploadSuccess}
										onProgress={handleProgress}
									/>
								</Camp>


								<Camp>
									<label htmlFor="url">URL</label>
									<input
										type="url"
										id="url"
										name="url"
										value={url}
										placeholder="http://www.example.com"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</Camp>
								{errors.url && <Error>{errors.url}</Error>}

							</fieldset>
							<fieldset>
								<legend>Pet Info</legend>
								<Camp>
									<label htmlFor="description">Description</label>
									<textarea
										id="description"
										name="description"
										value={description}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{errors.description && <Error>{errors.description}</Error>}
								</Camp>
							</fieldset>

							{error && <Error>{error}</Error>}

							<InputSubmit
								type="submit"
								value="New Pet"
							/>
						</FormAp>
					</>
				)}
			</Layout>
		</div >
	)
}
