import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function AlertPopup({message, isOpen, toggle, onConfirm}){
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader tag={"strong"} toggle={toggle}>Sucesso!</ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-sm btn-success" onClick={onConfirm}> OK </Button>
            </ModalFooter>
        </Modal>
    );
}