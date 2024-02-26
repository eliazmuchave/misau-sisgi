import {useState} from "react";
import {getAuthenticatedUserName, getAuthorizationToken} from "../util/AccessTokenUtil";
import AlertPopup from "./AlertPopup";
import ConfirmationPopup from "./ConfirmationPopup";

export default function CloseImportButton({task, onUpdate}){

    const [visible, setVisible] = useState(!task.closed);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const toggleIsConfirmation = () => {
        setIsConfirmation(!isConfirmation);

    };

    const toggleIsSuccess = () => {
        setIsSuccess(!isSuccess);
    }

   async function handleConfirm() {
       await  handleClose(task.id);

    }

    async function handleClose(taskId) {

        const token = getAuthorizationToken();
        const response = await fetch(`/api/importProcess/${taskId}/close`, {
            method: "PATCH", headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {

            toggleIsConfirmation();
            toggleIsSuccess();
            const updatedTask = await response.json();
            onUpdate(updatedTask);

        }

    }



    return visible ? (<>

        <button onClick={() => toggleIsConfirmation()}
                className="btn btn-sm btn-danger ml-3"><i className="fa fa-times-circle"
                                                      aria-hidden="true"></i>
        </button>

        <ConfirmationPopup toggle={toggleIsConfirmation} isOpen={isConfirmation} onConfirm={handleConfirm}  >Deseja realmente encerrar este processo?</ConfirmationPopup>

        <AlertPopup
            message="Processo encerrado com sucesso! "
            toggle={toggleIsSuccess} isOpen={isSuccess} onConfirm={toggleIsSuccess}></AlertPopup>

    </>) : null;
}