import axios from "axios";
import { LOGIN_USER } from "./types";

function loginUser(dataTosubmit) {
  const request = axios.post("/api/users/login", dataTosubmit);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export { loginUser };
