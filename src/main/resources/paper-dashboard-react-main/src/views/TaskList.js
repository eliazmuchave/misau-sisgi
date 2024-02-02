import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {format} from "date-fns";

export default function TaskList() {
    const tasks = useLoaderData();
    function formatDate(){
        return format(new Date(),'MMMM do yyyy, h:mm:ss a');
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
                                    <th>Data Início</th>
                                    <th>Previsão Término</th>
                                    <th>Fluxo do Precesso</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {tasks.map(task => (<tr key={task.id}>
                                    <td>{task?.taskName}</td>
                                    <td>{format(new Date(task.startDate), 'dd/MM/yyyy')}</td>
                                    <td>{format(new Date(task.expectedEndDate), 'dd/MM/yyyy')}</td>
                                    <td>{task.workflow?.name}</td>


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
