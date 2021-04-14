export default function validateSignUp(values) {
	let errors = {}
	//name
	if (!values.name)
		errors.name = "Name is required"

	//email
	if (!values.email)
		errors.email = "Email is required"
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
		errors.email = "Invalid Email"

	//password
	if (!values.password)
		errors.password = "Password is required"
	else if (values.password.length < 6)
		errors.password = "The password must be at least 6 characters long"

	return errors

}
