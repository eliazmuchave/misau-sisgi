import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    const message = error.message;

    return (
        <>
            <h2>Erro</h2>
            <p>{message}</p>
        </>
    )

}