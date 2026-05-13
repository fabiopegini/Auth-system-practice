import './components/formStyles.css'
import Button from './components/Button'
import Form from './components/Form'
import InputField from './components/InputField'
import { userRegisterForm } from './hooks/useRegisterForm'

function App() {
  // Mover el handler al hook
  const { loading, error, handleRegister } = userRegisterForm()

  return (
    <main>
      {loading && !error && <div>Procesing...</div> /* Add circle animation */}
      {error && !loading && <div>An error ocurred, please contact our Support Team</div>}
      {<Form title='Create a new account' onSubmit={handleRegister} name='register_form'>
        <InputField type='text' name="name" placeholder='Name' />
        <InputField type='email' name="email" placeholder='Email' />
        <InputField type='password' name="password" placeholder='Password' />
        <InputField type='password' name="re_password" placeholder='Repeat your password' />
        <Button disabled={loading} type='submit'>Register</Button>
      </Form>}
    </main>
  )
}

export default App
