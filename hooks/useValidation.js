import {useState, useEffect} from 'react'

const useValidation = (stateInitial, validate, func) => {

	const [values, saveValues] = useState(stateInitial)
	const [errors, saveErrors] = useState({})
	const [submitForm, saveSubmitForm] = useState(false)

	useEffect(() => {
		if (submitForm) {
			if (Object.keys(errors).length === 0) {
				func() //func eject in component
			}
			saveSubmitForm(false)
		}
	}, [errors])

	const handleChange = e => {
		saveValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const errorsValidation = validate(values)
		saveErrors(errorsValidation)
		saveSubmitForm(true)
	}

	//blur
	const handleBlur = () => {
		const errorsValidation = validate(values)
		saveErrors(errorsValidation)
	}

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
		handleBlur
	}
}

export default useValidation
