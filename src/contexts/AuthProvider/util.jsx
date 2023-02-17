import { api } from "../../services/api";
import FormData from "form-data";

const form = new FormData();
const headers = form.headers;


export function setUserLocalStorage(user) {
  localStorage.setItem("u-token", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u-token");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export async function loginRequest(formData, url) {
  try {
    const request = await api.post(url,  formData ,{
      headers:{
        ...headers
      }
    });
    return request.data;
  } catch (error) {
    return null;
  }
}
