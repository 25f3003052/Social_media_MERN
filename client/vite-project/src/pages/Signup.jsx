import React, { useState } from 'react';

// Replace with your local graphic image path
import graphicImage from '/Users/pranav/Desktop/MERN/SocialMediaApp/client/vite-project/src/pages/signup_page for react .png';
import { axiosInstance } from '../axiosCalls/axios';
import {Link} from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
  });

  const [loader , setLoader] = useState(false)



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await axiosInstance.post('/users/register' , formData) // route , payload 
        console.log("User Registered")       //would be blocked due to CORS policy if done normally

        //add all validation errors
        //add a Loader 

        
    } catch (error) {
        console.log(error)
    }
  };








  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans">
      {/* Main Layout Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-5xl">
        
        {/* Left Graphic Section (Visible on large screens) */}
        <div className="hidden md:flex flex-col items-center max-w-[450px]">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-normal leading-tight">
              Capture everyday moments with
            </h2>
            <h2 className="text-2xl font-normal">
              your <span className="text-red-500 font-semibold">best</span>{' '}
              <span className="text-pink-500 font-semibold">friends</span>.
            </h2>
          </div>

          <div className="relative">
            <img
              src={graphicImage}
              alt="Social Moments Preview"
              className="max-w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Right Form Container */}
        <div className="w-full max-w-[350px] space-y-3">
          
          {/* Main Form Card */}
          <div className="border bg-zinc-900 border-zinc-800 rounded-sm p-8 flex flex-col items-center text-center">
            {/* Instagram Branding */}
            <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 select-none">
              psychic GNG
            </h1>

            <p className="font-semibold text-sm mb-4 leading-snug text-zinc-400">
              Sign up to see photos and videos from your friends.
            </p>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 text-xs border rounded focus:outline-none transition bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-600"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 text-xs border rounded focus:outline-none transition bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-600"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 text-xs border rounded focus:outline-none transition bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-600"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-2.5 py-2 text-xs border rounded focus:outline-none transition bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-600"
              />

              {/* Terms */}
              <p className="text-[11px] text-gray-400 my-2 leading-tight">
                People who use our service may have uploaded your contact information to Instagram.{' '}
                <a href="#" className="font-semibold hover:underline">
                  Learn More
                </a>
              </p>

              <p className="text-[11px] text-gray-400 mb-2 leading-tight">
                By signing up, you agree to our{' '}
                <a href="#" className="font-semibold hover:underline">
                  Terms
                </a>
                ,{' '}
                <a href="#" className="font-semibold hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold hover:underline">
                  Cookies Policy
                </a>
                .
              </p>

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold text-sm py-1.5 rounded transition duration-150 shadow-sm mt-1"
              >
                Sign up
              </button>
            </form>
          </div>

          {/* Login Redirection Box */}
          <div className="border bg-zinc-900 border-zinc-800 text-zinc-300 rounded-sm p-4 text-center text-sm">
            <p>
              Have an account?{' '}
              <Link
                to="/login"
                className="text-sky-500 font-semibold hover:text-sky-600 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
// form for name , email , password , username