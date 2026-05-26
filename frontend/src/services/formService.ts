interface User {
  name: string;
  email: string;
  password: string;
}

const baseUrl = "/api/users";

interface LoginUser {
  email: string;
  password: string;
}

const createUser = async (user: User) => {
  try {
    const headers = new Headers();
    headers.append("Content-type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    };

    const response = await fetch(baseUrl, options);

    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

const loginUser = async ({ email, password }: LoginUser) => {
  try {
    const headers = new Headers();
    headers.append("Content-type", "application/json");

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(`${baseUrl}/login`, options);

    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export default { createUser, loginUser };
