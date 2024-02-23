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
import StatusFlow, {statusFlowAction} from "./views/StatusFlow";
import StatusFlowList, {statusFlowLoader} from "./views/StatusFlowList";
import ErrorPage from "./views/ErrorPage";
import ForwardingAgentList, {agentsLoader} from "./views/ForwardingAgentList";
import ForwardingAgent, {addAgentAction} from "./views/ForwardingAgent";
import GoodsList, {goodsListLoader} from "./views/GoodsList";
import Goods, {addGoodsAction, goodsLoader} from "./views/Goods";
import FinancierList, {financierLoader} from "./views/FinancierList";
import Financier, {addFinancierAction} from "./views/Financier";
import BeneficiariesList, {beneficiariesLoader} from "./views/BeneficiariesList";
import Beneficiaries, {addBeneficiariesAction, beneficiaryLoader} from "./views/Beneficiaries";
import ImportProcess, {importProcessAction, importProcessLoader} from "./views/ImportProcess";
import ImportProcessList, {importProcessListLoader} from "./views/ImportProcessList";


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
        element: <Admin>

        </Admin>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {index: true, element: <Dashboard></Dashboard>},

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
                path: "statusflow", children: [
                    {index: true,element: <StatusFlowList></StatusFlowList>, loader: statusFlowLoader },
                    {path: "new", element: <StatusFlow></StatusFlow>, action: statusFlowAction},
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
            {
                path: "forwardingAgents", children: [
                    {index: true, element: <ForwardingAgentList></ForwardingAgentList>, loader: agentsLoader},
                    {path: "new", element: <ForwardingAgent></ForwardingAgent>, action: addAgentAction},
                    {path: ":id/edit", element: <ForwardingAgent></ForwardingAgent>, action: addAgentAction, loader: agentsLoader}
                ]
            },
            {
                path: "goods", children: [
                    {index: true, element: <GoodsList></GoodsList>, loader: goodsListLoader},
                    {path: "new", element: <Goods></Goods>, action: addGoodsAction},
                    {path: ":id/edit", element: <Goods></Goods>, action: addGoodsAction, loader: goodsLoader}
                ]
            },
            {
                path: "financiers", children: [
                    {index: true, element: <FinancierList></FinancierList>, loader: financierLoader},
                    {path: "new", element:<Financier></Financier>, action: addFinancierAction},
                    {path: ":id/edit", element: <Financier></Financier>, action: addFinancierAction, loader: financierLoader}
                ]
            },

            {
                path: "beneficiaries", children: [
                    {index: true, element: <BeneficiariesList></BeneficiariesList>, loader: beneficiariesLoader},
                    {path: "new", element:<Beneficiaries></Beneficiaries>, action: addBeneficiariesAction},
                    {path: ":id/edit", element: <Beneficiaries></Beneficiaries>, action: addBeneficiariesAction, loader: beneficiaryLoader}
                ]
            },

            {
                path: "importProcess", children: [
                    {index: true, element: <ImportProcessList></ImportProcessList>, loader: importProcessListLoader},
                    {path: "new", element:<ImportProcess></ImportProcess>, action: importProcessAction},
                    {path: ":id/edit", element: <ImportProcess></ImportProcess>, action: importProcessAction, loader: importProcessLoader}
                ]
            },

        ],
    },
]);

export default function App() {
    return <RouterProvider router={router}></RouterProvider>;
}
