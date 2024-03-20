import {useState} from "react";
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import modalCss from './ProcessDetails.module.css'
import {format} from "date-fns";
import UpdateProcessDate from "./UpdateProcessDate";
import NotificationButton from "./NotificationButton";
import ForwardingStatus from "./ForwardingStatus";
import WorkflowStatusBadge from "./WorkflowStatusBadge";
import CloseImportButton from "./CloseImportButton";
import DaysInProgressBadge from "./DaysInProgressBadge";
import Comment from "./Comment";

export default function ProcessDetails({processTask, onUpdate}) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [task, setTask] = useState(processTask);

    function handleUpdate(taskToUpdate) {
        setTask(taskToUpdate);
        onUpdate(taskToUpdate);
    }


    const data = {};


    return (
        <>
            <Button className="btn-default btn btn-sm  ml-3" onClick={toggle}>
                <i
                    className=" fa fa-info fa-solid"></i>
            </Button>
            <Modal className={modalCss.detailsModal} isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} style={{fontSize: 10}}>

                    <span className="mr-3"> <strong>{task.taskName} </strong></span>
                    {" - "}

                    <WorkflowStatusBadge task={task}></WorkflowStatusBadge>

                </ModalHeader>
                <ModalBody style={{fontSize: 13}}>
                    <Row className="mt-1">

                        <Col> <strong>Nome: </strong> {task.taskName}</Col>
                        <Col><strong>Bem: </strong>{task.goods?.name}</Col>
                    </Row>

                    <Row className="mt-2">
                        <Col> <strong>Beneficiário: </strong> {task.beneficiary?.name}</Col>
                        <Col><strong>Financiador: </strong>{task.financier?.name}</Col>

                    </Row>
                    <Row className="mt-2">
                        <Col> <strong>Processo: </strong> {task.processNumber}</Col>
                        <Col><strong>Factura: </strong>{task.invoice} </Col>

                    </Row>
                    <Row className="mt-2">
                        <Col> <strong>Quantidade: </strong> {task.quantity}</Col>
                        <Col><strong>Valor: </strong> {task?.value} {task.currencyResponse? task.currencyResponse.symbol: ""}  </Col>

                    </Row>

                    <Row className="mt-2">
                        <Col> <strong>Previsão de
                            Chegada: </strong> {format(new Date(task.arrivalForecast), 'dd/MM/yyyy')}</Col>
                        {task.arrivalDate ?
                            <Col><strong>Chegada: </strong>{format(new Date(task.arrivalDate), 'dd/MM/yyyy')}
                            </Col> : ""}

                    </Row>

                    <Row className="mt-2">
                        {task.pickupDate ?
                            <Col> <strong>Data Levantamento: </strong> {format(new Date(task.pickupDate), 'dd/MM/yyyy')}
                            </Col> : ""}

                        <Col> Estado actual: <WorkflowStatusBadge task={task}></WorkflowStatusBadge></Col>
                    </Row>

                    <Row className="mt-2">
                        <Col> <strong>Despachante: </strong> {task?.forwardingAgent?.name}</Col>

                    </Row>

                    <Row className="mt-2">
                        <Col> <strong>Data de Início: </strong> {format(new Date(task.startDate), 'dd/MM/yyyy')}</Col>
                        <Col><strong>Registo no Sistema: </strong>{format(new Date(task.created), 'dd/MM/yyyy')} </Col>

                    </Row>
                    <Row className="mt-2">
                        <Col>

                            <strong> Tempo Decorrido: </strong> <DaysInProgressBadge task={task}></DaysInProgressBadge>
                        </Col>
                        <Col></Col>


                    </Row>
                </ModalBody>
                <ModalBody>
                    <UpdateProcessDate task={task} updateTask={handleUpdate}></UpdateProcessDate>


                </ModalBody>
                <ModalBody>
                    <Comment task={task}></Comment>
                </ModalBody>


                <ModalFooter>

                    <CloseImportButton task={task} onUpdate={handleUpdate}></CloseImportButton>
                    <NotificationButton task={task} onUpdate={handleUpdate}></NotificationButton>
                    <ForwardingStatus task={task} onUpdate={handleUpdate}></ForwardingStatus>

                </ModalFooter>

            </Modal>
        </>
    );
}