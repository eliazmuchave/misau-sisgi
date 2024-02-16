import {useState} from "react";
import {
    Badge,
    Button,
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import modalCss from './ProcessDetails.module.css'
import {format} from "date-fns";
import {Form} from "react-router-dom";
import UpdateProcessDate from "./UpdateProcessDate";

export default function ProcessDetails({task}) {

    const [modal, setModal] = useState(false);

    const data = {};

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button className="btn-default btn btn-sm  ml-3" onClick={toggle}>
                <i
                    className=" fa fa-info fa-solid"></i>
            </Button>
            <Modal className={modalCss.detailsModal} isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{task.taskName}</ModalHeader>
                <ModalBody>
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
                        <Col><strong>Valor: </strong> {`${task.value} ${task.currency}`} </Col>

                    </Row>

                    <Row className="mt-2">
                        <Col> <strong>Previsão de
                            Chegada: </strong> {format(new Date(task.arrivalForecast), 'dd/MM/yyyy')}</Col>
                        {task.arrivalDate?<Col><strong>Chegada: </strong>{format(new Date(task.arrivalDate), 'dd/MM/yyyy')} </Col>: "" }

                    </Row>

                    <Row className="mt-2">
                        {task.pickupDate?  <Col> <strong>Data Levantamento: </strong> {format(new Date(task.pickupDate), 'dd/MM/yyyy')}  </Col>: "" }

                        <Col><strong>Estado Actual: </strong><Badge className=""> {task.currentStatus} </Badge> </Col>

                    </Row>

                    <Row className="mt-2">
                        <Col> <strong>Despachante: </strong> {task?.forwardingAgent?.name}</Col>
                        <Col><strong>Estado Actual: </strong>{task.currentStatus} </Col>

                    </Row>

                    <Row className="mt-2">
                        <Col> <strong>Data de Início: </strong> {format(new Date(task.startDate), 'dd/MM/yyyy')}</Col>
                        <Col><strong>Registo no Sistema: </strong>{format(new Date(task.created), 'dd/MM/yyyy')} </Col>

                    </Row>
                    <Row>


                    </Row>
                </ModalBody>
                <ModalBody>
                <UpdateProcessDate task={task}></UpdateProcessDate>

                </ModalBody>


                <ModalFooter>
                    <Button className="btn btn-sm" color="default" onClick={toggle}>
                        Estado
                    </Button>
                    <Button className="btn btn-sm" color="default" onClick={toggle}>
                        Notificação
                    </Button>
                    <Button className="btn btn-sm" color="danger" onClick={toggle}>
                        Sair
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}