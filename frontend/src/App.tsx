import './components/formStyles.css'
import Button from './components/Button'
import Form from './components/Form'
import InputField from './components/InputField'
import { userRegisterForm } from './hooks/useRegisterForm'
import validators from './utils/validators'
import { useRef } from 'react'

function App() {
  const passwordRef = useRef('')
  const { loading, error, handleRegister } = userRegisterForm()

  return (
    <main>
      {<Form title='Create a new account' onSubmit={handleRegister} name='register_form'>
        <InputField type='text' name="name" placeholder='Name' validator={validators.isValid.name} autoComplete='off'/>
        <InputField type='email' name="email" placeholder='Email' validator={validators.isValid.email} autoComplete='off'/>
        <InputField type='password' name="password" placeholder='Password' passwordRef={passwordRef} validator={validators.isValid.password} autoComplete='off'/>
        <InputField type='password' name="re_password" placeholder='Repeat your password' passwordRef={passwordRef} rePassword={true} validator={validators.isValid.rePassword} autoComplete='off'/>
        <Button disabled={loading} type='submit'>Register</Button>
      {loading && !error && <div>Creating user, please wait...</div> /* Add circle animation */}
      {error && !loading && <div>An error ocurred, please contact our <a href='#'>Support Team</a></div>}
      </Form>}
    </main>
  )
}

export default App
