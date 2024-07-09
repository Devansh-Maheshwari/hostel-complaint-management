import Login from './pages/Login'
import Register from './pages/Register'
import ComplaintForm from './pages/ComplaintForm'
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
  },
  {
    path: "/file-complaint",
    element: <ComplaintForm />
  }
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
