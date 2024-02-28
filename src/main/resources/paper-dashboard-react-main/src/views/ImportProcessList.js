import {getAuthenticatedUserName, getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import TaskNav from "../layouts/TaskNav";
import ProcessDetails from "../components/ProcessDetails";
import AlertPopup from "../components/AlertPopup";
import NotificationButton from "../components/NotificationButton";
import ForwardingStatus from "../components/ForwardingStatus";
import WorkflowStatusBadge from "../components/WorkflowStatusBadge";

export default function ImportProcessList() {
    let tasks = useLoaderData();
    if (tasks == null) {
        tasks = [];
    }
    const [taskData, setTaskData] = useState(tasks);

    const updateTaskOnList = (updatedTask) => {

        const updatedData = [...taskData];
        const index = updatedData.findIndex((row) => row.id === updatedTask.id);
        updatedData[index] = updatedTask;
        setTaskData(updatedData);
    }




    return (<>
        <div className="content">


            <Row>
                <Col md="12">
                    <Card>
                        <TaskNav></TaskNav>
                        <CardHeader>
                            <Row>
                                <Col md="10"><CardTitle tag="strong">Lista de Processos</CardTitle></Col>

                            </Row>


                        </CardHeader>
                        <CardBody>
                            <Row>

                            </Row>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Designação</th>
                                    <th>Estado Actual</th>
                                    <th>Avançar Estado</th>
                                    <th>Noficação</th>
                                    <th>Data Início</th>
                                    <th>Previsão Término</th>
                                    <th>Fluxo do Precesso</th>
                                    <th>Detalhes</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {taskData.map(task => (<tr key={task.id}>
                                    <td><i className="fa fa-circle mr-2"></i> {task?.taskName}</td>
                                    <td><i className="fa fa-clock mr-2"></i>
                                        <WorkflowStatusBadge task={task}></WorkflowStatusBadge>


                                    </td>
                                    <td>
                                        <ForwardingStatus task={task} onUpdate={updateTaskOnList}></ForwardingStatus>
                                    </td>
                                    <td>
                                        <NotificationButton task={task}
                                                            onUpdate={updateTaskOnList}></NotificationButton>
                                    </td>
                                    <td>{format(new Date(task.startDate), 'dd/MM/yyyy')}</td>
                                    <td>{format(new Date(task.expectedEndDate), 'dd/MM/yyyy')}</td>
                                    <td><i
                                        className="fa fa-sitemap"></i> {task.predictedStatusFlow ? task.predictedStatusFlow?.name :
                                        <Link to={`${task.id}/edit`}
                                              className="btn btn-sm btn-outline-secondary ml-3"><i
                                            className=" fa fa-solid fa-plus"></i></Link>}</td>

                                    <td>
                                        <ProcessDetails processTask={task} onUpdate={updateTaskOnList}></ProcessDetails>
                                    </td>


                                    <td><Link to={`${task.id}/edit`}>Editar</Link></td>
                                </tr>))}


                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>


    </>);
}

export async function importProcessListLoader() {
    const token = getAuthorizationToken();
    const response = await fetch("/api/importProcess", {
        headers:
            {
                "Authorization": `Bearer ${token}`
            }
    });

    if (!response.ok) {
        throw json({message: "Não foi possível carregar dados do processo"}, {status: 500});
    }

    return response;

}
