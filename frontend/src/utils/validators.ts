export type ValidatorFn = ((field: string) => { ok: boolean; msg: string }) | ((field: string, password: string) => { ok: boolean; msg: string });

const isValid = {
  name: (field: string) => {
    if (field.includes(" ")) return { ok: false, msg: "Cannot have blank spaces" };
    if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]/.test(field)) return { ok: false, msg: "Name must start with a letter" };
    if (!/^[\wñÑáéíóúÁÉÍÓÚüÜ]{1,20}$/.test(field)) return { ok: false, msg: "Name cannot be more than 20 characters long" };
    return { ok: true, msg: "Valid name" };
  },
  email: (field: string) => {
    if (field.includes(" ")) return { ok: false, msg: "Cannot have blank spaces" };
    if (!/^[\w\.\-]+@[a-z]+\.[a-z]+$/.test(field)) return { ok: false, msg: "Not a valid email" };
    return { ok: true, msg: "Valid email" };
  },
  password: (field: string) => {
    if (field.includes(" ")) return { ok: false, msg: "Cannot have blank spaces" };
    if (!/^(?=\S*[A-Z])/.test(field)) return { ok: false, msg: "Password must have at least one uppercase letter" };
    if (!/(?=\S*[a-z])/.test(field)) return { ok: false, msg: "Password must have at least one lowercase letter" };
    if (!/(?=\S*[0-9])/.test(field)) return { ok: false, msg: "Password must have at least one number" };
    if (!/(?=\S*([^\w\s]|_))/.test(field)) return { ok: false, msg: "Password must have at least one special character" };
    if (!/\S{8,}$/.test(field)) return { ok: false, msg: "Password must be a least 8 characters long" };
    return { ok: true, msg: "Valid password" };
  },
  rePassword: (field: string, password: string) => {
    if (!(field === password)) return { ok: false, msg: "Passwords dont match" };
    return { ok: true, msg: "Passwords match" };
  },
};

const validationInfoMsg = {
  name: "Must start with a letter, max 20 characters",
  email: "Not valid email",
  password: "Must have at least one: special char, number, uppper and lowercase letter",
};

const registerValidations = (fields: { [k: string]: FormDataEntryValue }) => {
  const { name, email, password, re_password } = fields;

  let isValidField = null;

  if (typeof name !== "string") return { ok: false, msg: "Wrong type" };
  isValidField = isValid.name(name);
  if (!isValidField.ok) return { ok: false, msg: isValidField.msg };

  if (typeof email !== "string") return { ok: false, msg: "Wrong type" };
  isValidField = isValid.email(email);
  if (!isValidField.ok) return { ok: false, msg: isValidField.msg };

  if (typeof password !== "string") return { ok: false, msg: "Wrong type" };
  isValidField = isValid.password(password);
  if (!isValidField.ok) return { ok: false, msg: isValidField.msg };

  if (password !== re_password) return { ok: false, msg: "Passwords dont match" };

  return { ok: true, msg: "Are fields are valid" };
};

export default { registerValidations, isValid, validationInfoMsg };
