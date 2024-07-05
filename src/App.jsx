import React from "react"
import Home from './components/Home'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Message from "./components/Message"

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed id={"home"} />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
        {
          path: "/bookmark",
          element: <Feed id={"bookmarked"}/>
        }
      ]
    },
    {
      path: "/message",
      element: <Message />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ])
  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
