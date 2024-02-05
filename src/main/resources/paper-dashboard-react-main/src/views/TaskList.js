import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {format} from "date-fns";
import {useState} from "react";

export default function TaskList() {
    const tasks = useLoaderData();
    const [taskData, setTaskData] = useState(tasks);
   async function  handleStatusForward(taskId){

       const token = getAuthorizationToken();
       const response = await fetch(`/api/tasks/${taskId}/forwardStatus`, {
           method: "PATCH",
           headers: {
               "Authorization": `Bearer ${token}`,
           }
       });

       if (!response.ok){
           throw json({message: "Não foi possível actualizar"}, {status: 500})
       }

       const updatedTask = await response.json();
       const updatedData = [...taskData];
       const index = updatedData.findIndex((row) => row.id === taskId);
       updatedData[index] = updatedTask;
       setTaskData(updatedData);

   }

  async function handleNotificationSubscribe(taskId){

       const token = getAuthorizationToken();
       const response = await fetch(`/api/tasks/${taskId}/notify`, {
           method: "PATCH",
           headers: {
               "Authorization": `Bearer ${token}`,
           }
       });

   }

    return (<>
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10"><CardTitle tag="h4">Lista Processos</CardTitle></Col>
                                <Col md="2" className="mr-auto ml-auto">
                                    <Button><Link to="new">Adiconar Processo</Link></Button>

                                </Col>
                            </Row>


                        </CardHeader>
                        <CardBody>
                            <Row>

                            </Row>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Designação</th>
                                    <th>Estado</th>
                                    <th>Noficação</th>
                                    <th>Data Início</th>
                                    <th>Previsão Término</th>
                                    <th>Fluxo do Precesso</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {taskData.map(task => (<tr key={task.id}>
                                    <td>{task?.taskName}</td>
                                    <td><span>
                                        {task?.currentStatus}
                                        {task.workflow ? <button onClick={() => handleStatusForward(task?.id)}
                                                                 className="btn-default btn btn-sm  ml-3"><i
                                            className=" fa fa-solid fa-forward"></i></button>:""}

                                    </span></td>
                                    <td>
                                        <button onClick={() => handleNotificationSubscribe(task?.id)} className="btn btn-sm btn-default"><i class="fa fa-envelope" aria-hidden="true"></i></button>
                                    </td>
                                    <td>{format(new Date(task.startDate), 'dd/MM/yyyy')}</td>
                                    <td>{format(new Date(task.expectedEndDate), 'dd/MM/yyyy')}</td>
                                    <td>{task.workflow? task.workflow?.name:
                                        <Link to={`${task.id}/edit`} className="btn btn-sm btn-outline-secondary ml-3"><i
                                            className=" fa fa-solid fa-plus"></i></Link>}</td>


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

export async function tasksLoader() {
    const token = getAuthorizationToken();
    const response = await fetch("/api/tasks", {
        headers:
            {
                "Authorization": `Bearer ${token}`
            }
    });

    if (!response.ok) {
        throw json({message: "Could not load Tasks"}, {status: 500});
    }

    return response;

}
