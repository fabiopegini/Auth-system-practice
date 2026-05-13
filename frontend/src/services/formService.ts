// API calls register/login 
// Token handlers for login
interface User {
  
}

const baseUrl = '/api/users'

interface createUserParameters {
  id: string,
  user: string // user type
}

const createUser = async ({ id, user } : createUserParameters) => {
  
  try {
    const headers = new Headers()
    headers.append('Content-type', 'application/json')

    const options = { 
      method: 'POST', 
      headers,
      body: JSON.stringify(user)
    }

    const response = await fetch(baseUrl + `/${id}`, options)
    
    const data = response.json()
    return data

  } catch(err) {
    throw new Error('Could not create the user')
  }

}

export default { createUser }