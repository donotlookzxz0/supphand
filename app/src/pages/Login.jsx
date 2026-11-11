import { login } from "../services/auth.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
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
        <h1 className="text-xl text-center font-bold">Login your account</h1>
        <input
          type="text"
          placeholder="Username"
          className="block border p-2 rounded-md w-full mt-10 mb-5"
          required
          onChange={(e) => setUsername(e.target.value)}
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
          Log In
        </button>
        <div className="text-center">
          <p>Don't have an account yet? 
            <Link to="/register" className="text-blue-500 font-semibold active underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
        
    </div>
  );
}

export default Login;
