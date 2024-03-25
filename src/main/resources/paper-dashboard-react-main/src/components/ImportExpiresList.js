import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import TaskNav from "../layouts/TaskNav";
import DaysInProgressBadge from "./DaysInProgressBadge";
import WorkflowStatusBadge from "./WorkflowStatusBadge";
import ForwardingStatus from "./ForwardingStatus";
import NotificationButton from "./NotificationButton";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import ProcessDetails from "./ProcessDetails";
import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";

export default function ImportExpiresList({title, daysBefore, daysAfter}) {

    const [taskData, setTaskData] = useState([]);
    const token = getAuthorizationToken();
    const url = `/api/importProcess/expires?daysBefore=${daysBefore}&daysAfter=${daysAfter}`;

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(url,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const tasks = await response.json();
            setTaskData(tasks);
        }
        loadData()
    }, []);

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
                        <CardHeader>
                            <Row>
                                <Col md="10"><CardTitle tag="strong">{title}</CardTitle></Col>

                            </Row>


                        </CardHeader>
                        <CardBody>
                            <Row>

                            </Row>
                            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Designação</th>
                                    <th>Tempo Decorrido</th>
                                    <th>Estado Actual</th>
                                    <th>Detalhes</th>

                                </tr>
                                </thead>
                                <tbody>
                                {taskData.map(task => (<tr key={task.id}>
                                    <td><i className="fa fa-circle mr-2"></i> {task?.taskName}</td>
                                    <td>
                                        <DaysInProgressBadge task={task}></DaysInProgressBadge>
                                    </td>
                                    <td>
                                        <WorkflowStatusBadge task={task}></WorkflowStatusBadge>
                                    </td>

                                    <td>
                                        <ProcessDetails processTask={task} onUpdate={updateTaskOnList}></ProcessDetails>
                                    </td>


                                </tr>))}


                                </tbody>
                            </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>


    </>);
}