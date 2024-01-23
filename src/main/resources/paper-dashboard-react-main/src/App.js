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
import UserPage, {addUserAction, userLoader} from "views/User.js";
import Admin from "layouts/Admin";
import Login from "layouts/Login";
import {loginAction} from "./layouts/Login";
import UsersList, {usersLoader} from "./views/UsersList";


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Login></Login>, action: loginAction},
      { path: "/login", element: <Login></Login>, action: loginAction },
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
      { path: "users", children: [
          {index:true, element: <UsersList></UsersList>, loader: usersLoader},
          {path: "new", element: <UserPage></UserPage>, action: addUserAction},
          {path: ":id/edit", element: <UserPage></UserPage>, action: addUserAction, loader: userLoader}
        ]},
      { path: "typography", element: <Typography></Typography> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
