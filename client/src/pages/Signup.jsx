import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
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
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="p-5 ring-2 ring-white/20 rounded-lg max-w-[90%] bg-[#272727]/60 shadow-md">
              <h1 className="text-3xl font-medium">Sign up</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400">
                Register your self to get started and explore new way to add
                tasks
              </p>
              <div className="my-3 flex flex-col gap-1">
                <label className="text-lg" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  type="text"
                  placeholder="Enter your name"
                  className="px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
                />
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
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  placeholder="***********"
                  className="px-4 py-2 bg-black/50 rounded-lg ring-0 focus:outline-none"
                />
              </div>
              <button
                onClick={async () => {
                  const data = await signup(formData);
                  if (data?.statusCode == 201) {
                    navigate("/login");
                  }
                }}
                className="mt-2 w-full bg-white text-black py-1 text-lg font-semibold rounded-lg"
              >
                Register
              </button>
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link to={"/login"} className="text-indigo-600">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
