import {getAuthenticatedUserName, getAuthorizationToken} from "../util/AccessTokenUtil";
import {useState} from "react";
import AlertPopup from "./AlertPopup";

export default function NotificationButton({task, onUpdate}) {
    const visibility = function (task) {
        return (!task.done && !task.closed) && !hasSubscribedNotification(task)
    };

    const [isOpenSubscription, setIsOpenSubscription] = useState(false);


    const toggleSubscription = () => {
        setIsOpenSubscription(!isOpenSubscription);

    };


    async function handleNotificationSubscribe(taskId) {

        const token = getAuthorizationToken();
        const response = await fetch(`/api/importProcess/${taskId}/notify`, {
            method: "PATCH", headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const updatedTask = await response.json();
            toggleSubscription();
            setTimeout(() => {
                onUpdate(updatedTask)
            }, 4000)

            ;

        }

    }

    function hasSubscribedNotification(task) {

        const username = getAuthenticatedUserName();

        if (task.notifiables) {

            const foundTask = task.notifiables.some(notifiable => notifiable.email == username);
            if (foundTask) {

                return true;
            }
            return false;
        }

    }

    return visibility(task) ? (<>

        <button onClick={() => handleNotificationSubscribe(task?.id)}
                className="btn btn-sm btn-default ml-3"><i className="fa fa-envelope"
                                                           aria-hidden="true"></i>
        </button>

        <AlertPopup
            message="Sua inscrição foi concluída com sucesso! Você receberá um e-mail informando sobre as alterações no estado deste processo. "
            toggle={toggleSubscription} isOpen={isOpenSubscription} onConfirm={toggleSubscription}></AlertPopup>

    </>) : null;
}