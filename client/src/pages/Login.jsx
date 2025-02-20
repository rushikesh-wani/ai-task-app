import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[#121212] text-white">
        <div className="max-w-6xl h-screen mx-auto">
          <form
            className="w-full h-full flex justify-center items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              const status = await login(formData);
              if (status === 200) {
                navigate("/");
              }
            }}
          >
            <div className="p-5 ring-2 ring-white/20 rounded-lg max-w-[90%] bg-[#272727]/60 shadow-md">
              <h1 className="text-3xl font-medium">Login</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400">
                Enter your email and password below to login to your account
              </p>
              <div className="my-3 flex flex-col gap-1">
                <label className="text-lg" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
                />
                <label className="text-lg" htmlFor="pass">
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="***********"
                  className="px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
                />
                <div className="w-full inline-flex items-center gap-1">
                  <hr className="w-full" />
                  <p>OR</p>
                  <hr className="w-full" />
                </div>
                <button className="py-2 bg-black/50 rounded-lg inline-flex justify-center items-center gap-2 shadow-md">
                  Login With Google
                </button>
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-white text-black py-1 text-lg font-semibold rounded-lg cursor-pointer hover:focus:bg-violet-600 hover:focus:text-white hover:focus:duration-300"
              >
                Login
              </button>
              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to={"/sign-up"} className="text-indigo-600">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
