import { useState } from "react"
import formService from "../services/formService"
import validators from "../utils/validators"

export const userRegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleRegister = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const form = ev.currentTarget
    const formData = new FormData(form)
    const fields = Object.fromEntries(formData)

    const validFields = validators.registerValidations(fields)

    if(!validFields) return

    try {
      setError(false)
      setLoading(true)
      const createdUser = await formService.createUser({ id: '', user: { name: '', email: '', username: '', password: '' } })

      if(createdUser) return true // Redirect to login or main something page
    } catch (err) {
      setError(true)
      throw new Error('Could not create the user')
    } finally {
      setLoading(false)
    }

    return null // Also not this, maybe nothing
  }

  return { loading, error, handleRegister }
}