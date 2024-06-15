import { Link } from 'react-router-dom';
import  { useState } from 'react';
import Validation from './Registervalidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACK from '../assets/back3.jpg';

const Register = () => {
  const [values, setValues] = useState({
    
   username: "",
    email: "",
    phoneNo: "",
    password: "",
    cpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = e => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending values:", values); // Debugging: log values before sending
        await axios.post("http://localhost:5020/auth/register", values);
        navigate("/login");
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again later.");
        }
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
      <div className="relative z-10 bg-gray-800 p-8 opacity-70 rounded-3xl mt-10 mb-10 shadow-lg w-full max-w-md">
        <img className="mx-auto h-10 w-auto" src="src/assets/logo2.png" alt="LHI Company" />
        <h2 className="text-3xl font-bold text-center text-white ">User Registration</h2>
        <p className="text-center text-gray-300">Please enter your details here</p>
        <form className=" space-y-2" onSubmit={handleSubmit}>
          {/* <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-200 mb-2">Full name</label>
            <input
              onChange={handleInput}
              id="fullname"
              name="fullname"
              type="text"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.fullname && <span className="text-red-500 text-xs italic">{errors.fullname}</span>}
          </div> */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-200 mb-2">Username</label>
            <input
              onChange={handleInput}
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.username && <span className="text-red-500 text-xs italic">{errors.username}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
            <input
              onChange={handleInput}
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.email && <span className="text-red-500 text-xs italic">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="block text-gray-200 mb-2">Phone No</label>
            <input
              onChange={handleInput}
              id="phoneNo"
              name="phoneNo"
              type="tel"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.phoneNo && <span className="text-red-500 text-xs italic">{errors.phoneNo}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-200 mb-2">Password</label>
            <input
              onChange={handleInput}
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.password && <span className="text-red-500 text-xs italic">{errors.password}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor="cpassword" className="block text-gray-200 mb-2">Confirm Password</label>
            <input
              onChange={handleInput}
              id="cpassword"
              name="cpassword"
              type="password"
              required
              className="w-full px-3 py-2 border rounded bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors.cpassword && <span className="text-red-500 text-xs italic">{errors.cpassword}</span>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
        </form>
        <p className="mt-10 text-center text-sm text-gray-200">
          Already have an Account? <Link className="font-semibold text-sky-500 hover:text-blue-400" to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
