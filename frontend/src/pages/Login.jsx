import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("https://hostel-complaint-management-2.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("data=",data);

      if (data.jwtToken) {
        localStorage.setItem("jwtToken", data.jwtToken);
        window.location = "/dashboard";
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log(email,password);
  };

  return (
 
<div className="flex min-h-screen w-full items-center justify-center text-gray-600 bg-gray-50"> 
    <div className="relative">
   <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
     <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                <span className="flex-shrink-0 text-3xl font-black  tracking-tight opacity-100">Login</span>
              </a>
            </div>
      <form  className="mb-4" onSubmit={onSubmit}>
      <div className="mb-4">
                <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email </label>
                <input
                  type="text"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  id="email"
                  name="email-username"
                  placeholder="Enter your email"
                  autoFocus=""
                  onChange={(e) => setEmail(e.target.value)}
                />
        </div>
        <div className="mb-4">
                <div className="flex justify-between">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="password">Password</label>
                  
                </div>
                <div className="relative flex w-full flex-wrap items-stretch">
                  <input
                    type="password"
                    id="password"
                    className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    name="password"
                    placeholder="············"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <button
                  className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
      </form>
      <p className="mb-4 text-center">
            Don't have an account yet?
              <a href="/signup" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Create an account </a>
            </p>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
