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
import StatusList, {statusesLoader} from "./views/StatusList";
import Status, {addStatusAction, statusLoader} from "./views/Status";
import Task, {taskAction, taskLoader} from "./views/Task";
import TaskList, {tasksLoader} from "./views/TaskList";


const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {index: true, element: <Login></Login>, action: loginAction},
            {path: "/login", element: <Login></Login>, action: loginAction},
        ],
    },
    {
        path: "/admin",
        element: <Admin></Admin>,
        children: [
            {path: "dashboard", element: <Dashboard></Dashboard>},
            {path: "icons", element: <Icons></Icons>},
            {path: "user-page", element: <UserPage></UserPage>},
            {
                path: "tasks", children: [
                    {index: true, element: <TaskList></TaskList>, loader: tasksLoader},
                    {path: "new", element: <Task></Task>, action: taskAction},
                    {path: ":id/edit", element: <Task></Task>, action: taskAction, loader: taskLoader}
                ]
            },
            {
                path: "status", children: [
                    {index: true, element: <StatusList></StatusList>, loader: statusesLoader},
                    {path: "new", element: <Status></Status>, action: addStatusAction},
                    {path: ":id/edit", element: <Status></Status>, action: addStatusAction, loader: statusLoader}
                ]
            },
            {
                path: "users", children: [
                    {index: true, element: <UsersList></UsersList>, loader: usersLoader},
                    {path: "new", element: <UserPage></UserPage>, action: addUserAction},
                    {path: ":id/edit", element: <UserPage></UserPage>, action: addUserAction, loader: userLoader}
                ]
            },
            {path: "typography", element: <Typography></Typography>},
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router}></RouterProvider>;
}
