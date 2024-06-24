import { useState } from "react";
import { clsx } from "clsx";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student");
  const [block_id, setBlock_id] = useState("");
  const [room, setRoom] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log( fullname, email, password, phone, role, block_id,room)
    try {
      let body;
      if (role === "warden") {
        body = { full_name: fullname, email, password, phone, type: role, block_id };
      } else {
        body = { full_name: fullname, email, password, phone, type: role, block_id,  room };
      }
        const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.jwtToken) {
        window.location = "/";
      } else {
        alert("user already exists");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return(
    <div className="flex min-h-screen items-center justify-center text-gray-600 bg-gray-50">
      <div className="flex flex-col w-full max-w-md rounded-lg border-gray-400 bg-white shadow-lg px-4">
       <div className="flex items-center justify-center mb-10">
        <span className=" gap-2 text-indigo-500 text-3xl font-black">Signup</span>
       </div>
       <div>
        <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">welcome</h4>
        <p className="mb-6 text-gray-500">Please Sign-in to access your account</p>
       </div>
      <div>
        <form className="mb-4" method="POST">
        <div className="mb-4">
          <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Full Name</label>
          <input
                    type="text"
                    name="full-name"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    placeholder="Enter your full name"
                    onChange={(e) => setFullname(e.target.value)}
                    />
        </div>
        <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="email" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      Email
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="phone" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="phone"
                      placeholder="Enter your phone number"
                      onChange={(e) => setPhone(e.target.value)}
                      />
                  </div>
                </div>
                <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="block_id" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                    Block ID
                  </label>
                  <select
                    id="block_id"
                    name="block_id"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                    onChange={(e) => setBlock_id(e.target.value)}
                    value={block_id}
                  >
                    <option value="" disabled>Select your block</option>
                    <option value="bh1">BH1</option>
                    <option value="bh2">BH2</option>
                    <option value="bh3">BH3</option>
                  </select>
                </div>
                  {role !== "warden" && (
                    <div className="flex-1">
                      <label htmlFor="room" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                        Room
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                        name="room"
                        placeholder="Enter your Room"
                        onChange={(e) => setRoom(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className={role ==="student" ? "flex-1 w-full" : "flex-1"}>
                    <label htmlFor="password" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                      name="password"
                      placeholder="············"
                      onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="role" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                      Role
                    </label>
                    <div className="flex gap-x-3 w-fit pl-2 pr-2 bg-slate-100 rounded-md text-sm">
                      <button
                        type="button"
                        onClick={() => setRole("warden")}
                        className={clsx(
                          "rounded-md p-2 my-1 transition-all text-black",
                          role === "warden" && "bg-indigo-500 text-white"
                        )}
                        >
                        Warden
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("student")}
                        className={clsx(
                          "rounded-md p-2 my-1 transition-all text-black",
                          role === "student" && "bg-indigo-500 text-white"
                        )}
                        >
                        Student
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    className="grid w-full rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                    type="submit"
                    onClick={onSubmit}
                    >
                    Sign in
                  </button>
                </div>
  
  
        </form>
        <p className="mb-4 text-center">
           Already have an account?
          <a href="/login" className="text-indigo-500 no-underline hover:text-indigo-500">
                  Login
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Register;
