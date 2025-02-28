import { getToken, removeToken } from "./token";
import cookie from "cookie"
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL, ME_URL } from "./constants";



export const loginUser = async (email, password) => {
  const res = await fetch(`/api/authentication/login`, {
    body: JSON.stringify({ email, password }),
    method: "POST",
    headers: {"Content-type": "application/json;charset=UTF-8"}
  });

  const status = res.status;
  console.log(status);
  if (status !== 200) {
    return {
      "error": "Invalid Credentials!"
    }
  }

  const data = res.json();
  return data;
};

export const logoutUser = async () => {
  const res = await fetch(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await res.json();
  removeToken();
  return data;
};

export const registerUser = async (payload) => {
  const res = await fetch(REGISTER_URL, {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {"Content-type": "application/json;charset=UTF-8"}
  });
  const data = await res.json();
  return data;
};

export const whoAmI = async () => {
  const res = await fetch(ME_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-type": "application/json;charset=UTF-8"
    },
    method: "GET",
  });
  const data = await res.json()[0];
  return data;
};

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}
