import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json} from "react-router-dom";
import AlertPopup from "./AlertPopup";
import {useState} from "react";

export default function ForwardingStatus({task, onUpdate}) {

    const [isOpenSubscription, setIsOpenSubscription] = useState(false);
    const toggleSubscription = () => {
        setIsOpenSubscription(!isOpenSubscription);

    };


    async function handleStatusForward(task) {

        const token = getAuthorizationToken();
        const response = await fetch(`/api/importProcess/${task.id}/forwardStatus`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw json({message: "Não foi possível actualizar"}, {status: 500})
        }

         response.json().then(result => onUpdate(result));


        toggleSubscription();

    }

    const visible = () => {
        return (task.predictedStatusFlow && !task.done && !task.closed);
    };


    return visible() ? (
        <>

            <button onClick={() => handleStatusForward(task)}
                    className="btn-default btn btn-sm ml-3"><i
                className=" fa fa-solid fa-arrow-right"></i></button>
            <AlertPopup
                message="Estado do processo alterado com sucesso! "
                toggle={toggleSubscription} isOpen={isOpenSubscription} onConfirm={toggleSubscription}></AlertPopup>

        </>
    ) : null;
}