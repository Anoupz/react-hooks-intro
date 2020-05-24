import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<unknown>(null);

  const handleSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    };
    setUser(userData);
    setUsername("");
    setPassword("");
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h2>Login</h2>
      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="UserName"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      {user && JSON.stringify(user, null, 2)}
    </div>
  );
};

export default Login;
