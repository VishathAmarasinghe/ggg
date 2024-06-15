import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; 
import Validation from './LoginValidation';
import BACK from '../assets/back3.jpg'; 

const Login = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [err, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { login, currentUser } = useContext(AuthContext);
  console.log('Login - currentUser:', currentUser);

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await login(values); // Wait for login to complete
        navigate('/'); // Navigate to the home page after login
      } catch (err) {
        setError(err.response ? err.response.data : "Login failed");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${BACK})` }}

      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      </div>
      <div className="relative z-10 bg-gray-800 p-8 opacity-70 rounded-3xl shadow-lg w-full max-w-md">
        <img className="mx-auto h-20 w-400 " src="src/assets/logo2.png" alt="LHI Company" />
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login to your account</h2>
        <p className="text-center text-gray-300">Welcome back! Please enter your details</p>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-200 mb-2">Username</label>
            <input
              onChange={handleInput}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.username && <span className="text-red-500 text-xs italic">{errors.username}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 mb-2">Password</label>
            <input
              onChange={handleInput}
              id="password"
              name="password"
              type="password"
              autoComplete=""
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.password && <span className="text-red-500 text-xs italic">{errors.password}</span>}
          </div>
          <div className="text-sm text-center mb-4">
            <a href="#" className="font-semibold text-blue-400 hover:text-indigo-500">Forgot password?</a>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
          {err && <div className="text-red-500 text-center mt-2">{err}</div>}
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Dont have an Account? <Link className="font-semibold text-sky-500 hover:text-blue-400" to="/Register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
