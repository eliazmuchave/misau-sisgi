import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage, {loginAction} from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import UserList from "./components/UserList";
import {usersLoader} from "./pages/UserPage";

function App() {
  const router = createBrowserRouter([

    {
      path: "/",
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          index: true, element: <HomePage></HomePage>
        },

        {
          path: "/login",
          element: <LoginPage></LoginPage>,
          action: loginAction
        },
        {
          path: "users",
          element: <UserList></UserList>,
          loader: usersLoader
        }
      ]
    }

  ]);
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
