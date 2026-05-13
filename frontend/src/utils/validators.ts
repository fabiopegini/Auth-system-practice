const isValid = {
  name: (field: string) => /^[a-zA-Z]+\w{0,20}$/.test(field),
  email: (field: string) => /^[\w\.\-]+@[a-z]+.[a-z]+$/.test(field),
  username: (field: string) => /^[\w\.]{4,15}$/.test(field),
  password: (field: string) => /^(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[0-9])\S{8,}$/.test(field)
}

const registerValidations = (fields: {
  [k: string]: FormDataEntryValue;
}) => {

  const { name, email, username, password, re_password } = fields

  
  if(typeof name !== 'string') return false
  if(!isValid.name(name)) return false

  if(typeof email !== 'string') return false
  if(!isValid.email(email)) return false

  if(typeof username !== 'string') return false
  if(!isValid.username(username)) return false

  if(typeof password !== 'string') return false
  if(!isValid.password(password)) return false
  
  if(password !== re_password) return false

  return true
}

export default { registerValidations, isValid }