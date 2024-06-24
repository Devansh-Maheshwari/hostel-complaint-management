import Login from './pages/Login'
import Register from './pages/Register'

import Account from './pages/Account'
import PrivateRoute from './context/PrivateRoute'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
const router=createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Default route
    },
  {
    path:"/signup",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },

  {
    path:"/account",
    element:<Account/>
  },
  {
    path:"/dashboard",
    element:<PrivateRoute/>
  }
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
