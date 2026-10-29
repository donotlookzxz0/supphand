import { register } from "../services/auth.js";
import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/auth/login");
    } catch (err) {
      setError(err.response.data.message)
      throw err;
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form
        className="bg-white min-w-100 rounded-lg p-11"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-center font-bold">Register new account</h1>
        <input
          type="text"
          placeholder="Username"
          className="block border p-2 rounded-md w-full mt-10 mb-5"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          className="block border p-2 rounded-md w-full mb-5"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="block border p-2 rounded-md w-full mb-5"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && <p className="text-center text-red-500 font-semibold">{error}</p>} 
        <button className="w-full px-10 my-5 py-2 rounded-md bg-black text-white cursor-pointer hover:bg-gray-900">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;
