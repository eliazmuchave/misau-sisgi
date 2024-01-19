import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import Admin from "layouts/Admin";
import Login from "layouts/Login";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Login></Login> },
      { path: "/login", element: <Login></Login> },
    ],
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
    children: [
      { path: "dashboard", element: <Dashboard></Dashboard> },
      { path: "icons", element: <Icons></Icons> },
      { path: "user-page", element: <UserPage></UserPage> },
      { path: "notifications", element: <Notifications></Notifications> },
      { path: "tables", element: <TableList></TableList> },
      { path: "user-page", element: <UserPage></UserPage> },
      { path: "typography", element: <Typography></Typography> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
