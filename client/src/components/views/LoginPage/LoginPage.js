import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    dispatch(loginUser(body));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <lable>Email</lable>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            onEmailHandler(e);
          }}
        />

        <lable>password</lable>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            onPasswordHandler(e);
          }}
        />
        <br />
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginPage;
