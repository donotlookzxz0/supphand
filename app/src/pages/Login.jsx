import { login } from "../services/auth.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form
        className="bg-white min-h-100 min-w-100 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-center font-bold leading-tight">Log In</h1>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded-md w-full mt-10 mb-5"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-md w-full mb-5"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full px-10 py-2 rounded-md bg-black text-white cursor-pointer hover:bg-sky-500">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
