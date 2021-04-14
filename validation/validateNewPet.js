export default function validateNewPet(values) {
	let errors = {}

	if (!values.name)
		errors.name = "Name is required"

	if (!values.owner)
		errors.owner = "Required"

	if (!values.breed)
		errors.breed = "Required"

	/*
	if (!values.img)
		errors.img = "Img is Required"
		*/

	if (!values.url)
		errors.url = "URL is required"
	else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url))
		errors.url = "Invalid Url"

	return errors
}
