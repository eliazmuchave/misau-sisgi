import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {useEffect, useState} from "react";
import {
    Button,

    CardTitle, Col, Modal, ModalBody, ModalHeader, Row, Table
} from "reactstrap";
import {format} from "date-fns";
import DaysInProgressBadge from "./DaysInProgressBadge";
import WorkflowStatusBadge from "./WorkflowStatusBadge";
import Comment from "./Comment";

export default function ProcessStatusDetails({task}) {

    const [modal, setModal] = useState(false);
    const [logs, setLogs] = useState([]);

    const toggle = () => setModal(!modal);


    const token = getAuthorizationToken();
    const url = `/api/logStatus/importProcess/${task.id}`;

    useEffect(() => {
        const loadLogs = async () => {
            const response = await fetch(url, {
                method: "GET", headers: {
                    "Authorization": `Bearer ${token}`
                }

            });

            const fetchedLogs = await response.json();
            console.log(fetchedLogs);
            setLogs(fetchedLogs);
        }

        loadLogs();
    }, []);

    return <>
        <Button className="btn-default btn btn-sm" onClick={toggle}>
            <i
                className=" fa fa-clock fa-solid"></i>
        </Button>

        <Modal isOpen={modal} toggle={toggle} style={{maxWidth: 800}} >
            <ModalHeader  toggle={toggle}>
                <strong className="m-4 font-weight-bold" style={{fontSize: 14}}>Estados do Processo: {task.taskName}</strong>
            </ModalHeader>
            <ModalBody>
                <Row className="m-2">
                    <Col md="5">
                     Tempo Decorrido:    <DaysInProgressBadge task={task}></DaysInProgressBadge>
                    </Col>
                    <Col md = "7">
                        Estado Actual:  <WorkflowStatusBadge task={task}></WorkflowStatusBadge>
                    </Col>
                </Row>
                <Row className="ml-3 mr-3">
                    <Table responsive>
                        <thead className="text-primary font-weight-bold">


                            <td>Estado do Processo</td>

                            <td>Data Início</td>

                        </thead>
                        <tbody>
                        {logs.map(log => (
                            <tr key = {log.id}>

                                <td>
                                    {log.newStatus === log.currentStatus? "Concluido": log.newStatus}
                                </td>
                                <td> {format(new Date(log.created), 'dd/MM/yyyy')}</td>

                            </tr>))}
                        </tbody>

                    </Table>

                </Row>

            </ModalBody>
        </Modal>


    </>
}