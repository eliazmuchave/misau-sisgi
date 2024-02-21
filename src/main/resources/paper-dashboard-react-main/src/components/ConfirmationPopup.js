import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function ConfirmationPopup({isOpen, toggle, onConfirm}){

    return (
        <>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Confiramação</ModalHeader>
            <ModalBody>
                Tem Certeza de que deseja realizar esta acçã?
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-sm btn-primary" onClick={onConfirm}> Sim </Button>
                <Button className="btn btn-sm btn-danger" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
        </Modal>

        </>
    );
}