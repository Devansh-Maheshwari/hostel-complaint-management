import { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/header";

function Navbar() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));
  const [userType, setUserType] = useState(""); 

  useEffect(() => {
   
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:4000/userType", {
          method: "GET",
          headers: GetAuthHeader(),
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.userType);
        } else {
          console.error('Failed to fetch user type');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserType();
  }, []); 


  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("jwtToken");
    window.location = "/login";
  };

  return (
    <>
      <header className="shadow bg-white fixed w-full z-10 top-0">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <a href="#" className="flex items-center whitespace-nowrap text-2xl font-black">
            <span className="text-black">ABV-IITM Hostel</span>
          </a>
          
         
          <nav
           
            className={`peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start`}
          >
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <a href="/account">Account</a>
              </li>
              <li className="text-gray-600 md:mr-12 hover:text-blue-600">
                <button
                  className="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;