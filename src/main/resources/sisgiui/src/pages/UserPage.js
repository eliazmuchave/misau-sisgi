import MainMenuPage from "./MainMenuPage";
import UserList from "../components/UserList";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json} from "react-router-dom";

export default function UserPage() {
    return (
        <>
            <MainMenuPage></MainMenuPage>
            <UserList></UserList>
        </>
    )
}


export async function usersLoader({request}) {

    const response = await fetch("http://localhost:8080/api/users",
        {
            headers: {
                "Authorization": "Bearer " + getAuthorizationToken()
            }
        });

    if(!response.ok){
        throw json({message: "Could not load users"}, {status: 500})
    }

    return response;
}