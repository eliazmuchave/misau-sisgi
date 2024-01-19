import {useLoaderData} from "react-router-dom";

export default function UserDetails(){
    const data = useLoaderData();
    return(
        <>
        <h2> Detalhes do Utilizador </h2>
            <div>
                <div>{data.email}</div>
                <div>{data.firstName}</div>
                <div>{data.lastName}</div>
                <ul>
                    {data.roles.map(role => <li key={role}>{role}</li>)}
                </ul>
            </div>

        </>
    )
}