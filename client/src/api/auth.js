import axios from "./axios";

export const registerRequest = async (user) => {
	try {
		const req = await axios.post(`/register`, user);
		return req.data;
	} catch (error) {
    const { data, status } = error.response;
    if (status === 400) {
      if (data === "Email already in use.") return { error: "Email already exists." };
      if (data === "Username already in use.") return { error: "Username already exists." };
      if (data === "Password must be at least 6 characters long.") return { error: "Password must be at least 6 characters long." };
    }

    if (data) {
      return {
        error: data.message[0],
      };
    }

		return {
      error: "Error registering new user.",
    };
	}
};

export const loginRequest = async (user) => {
  try {
    const req = await axios.post(`/login`, user);
    return req.data;
  } catch (error) {
    const { data, status } = error.response;
    if (status === 400) {
      if (data === "Invalid credentials.") return { error: "Invalid credentials." };
    }

    if (data && data.message) {
      return {
        error: data.message[0],
      };
    }

    return {
      error: "Error logging in.",
    };
  }
};

export const logoutRequest = async () => {
  try {
    const req = await axios.post(`/logout`);
    return req.status;
  } catch (error) {
    return {
      error: "Error logging out.",
    };
  }
};

export const verifyTokenRequest = async () => {
  try {
    const req = await axios.get(`/verify-token`);
    return req.data;
  } catch (error) {
    return {
      error
    };
  }
}
