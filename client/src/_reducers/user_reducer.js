import { LOGIN_USER } from "../_actions/types";
const initialState = {
  status: "OK",
};
export function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
