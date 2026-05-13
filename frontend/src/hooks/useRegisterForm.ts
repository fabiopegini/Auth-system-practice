//Handle loading, 
// errors, 
// and submit handlers

import { useState } from "react"
import formService from "../services/formService"

export const userRegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleRegister = async (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const form = ev.currentTarget
    const formData = new FormData(form)
    const fields = Object.fromEntries(formData)

    // areValidFields(fields) before sending to backend

    try {
      setError(false)
      setLoading(true)
      const createdUser = await formService.createUser({ id: '', user: '' })

      if(createdUser) return true // redirect to login
    } catch (err) {
      setError(true)
      throw new Error('Could not create the user')
    } finally {
      setLoading(false)
    }

    return null
  }

  return { loading, error, handleRegister }
}