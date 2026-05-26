import "./components/formStyles.css";
import Button from "./components/Button";
import Form from "./components/Form";
import InputField from "./components/InputField";
import validators from "./utils/validators";
import formService from "./services/formService";
import { useRef, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const passwordRef = useRef("");

  const handleRegister: React.SubmitEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const form = ev.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);

    const validFields = validators.registerValidations(fields);
    if (!validFields.ok) {
      setError(validFields.msg);
      return false;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const result = await formService.createUser({
        name: fields.name as string,
        email: fields.email as string,
        password: fields.password as string,
      });

      if (!result.ok) {
        setError(result.msg);
        return false;
      }
      setSuccess(true);
      // Redirect to login or main something page
    } catch (err: any) {
      setError(err.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Form title="Create a new account" method="POST" onSubmit={handleRegister} name="register_form">
        <InputField type="text" name="name" placeholder="Name" validator={validators.isValid.name} autoComplete="off" />
        <InputField type="email" name="email" placeholder="Email" validator={validators.isValid.email} autoComplete="off" />
        <InputField type="password" name="password" placeholder="Password" passwordRef={passwordRef} validator={validators.isValid.password} autoComplete="off" />
        <InputField type="password" name="re_password" placeholder="Repeat your password" passwordRef={passwordRef} rePassword={true} validator={validators.isValid.rePassword} autoComplete="off" />
        <Button disabled={loading} type="submit">
          Register
        </Button>
        {loading && !error && <div>Creating user, please wait...</div> /* Add circle animation */}
        {error && !loading && <div>{error}</div>}
        {success && <div>Created successfully!</div>}
      </Form>
    </main>
  );
}

export default App;
