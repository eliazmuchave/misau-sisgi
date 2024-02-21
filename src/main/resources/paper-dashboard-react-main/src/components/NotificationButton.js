import {getAuthenticatedUserName, getAuthorizationToken} from "../util/AccessTokenUtil";
import {useState} from "react";
import AlertPopup from "./AlertPopup";

export default function NotificationButton({task}) {

    const [visible, setVisible] = useState(!hasSubscribedNotification(task));
    const [isOpenSubscription, setIsOpenSubscription] = useState(false);
    const toggleSubscription = () => {
        setIsOpenSubscription(!isOpenSubscription);

    };

    function handleConfirm() {
        setVisible(hasSubscribedNotification(task))
    }

    async function handleNotificationSubscribe(taskId) {

        const token = getAuthorizationToken();
        const response = await fetch(`/api/importProcess/${taskId}/notify`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {

            toggleSubscription();


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

    return visible ? (
        <>

            <button onClick={() => handleNotificationSubscribe(task?.id)}
                    className="btn btn-sm btn-default"><i className="fa fa-envelope"
                                                          aria-hidden="true"></i>
            </button>

            <AlertPopup
                message="Sua conta foi subscrita com sucesso! Irá receber Email informando lhe a mudança do estado deste processo. "
                toggle={toggleSubscription} isOpen={isOpenSubscription} onConfirm={handleConfirm}></AlertPopup>

        </>
    ) : null;
}