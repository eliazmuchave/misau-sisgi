import {getAuthorizationToken} from "../util/AccessTokenUtil";
import MainMenuPage from "./MainMenuPage";
import MainNavigation from "./MainNavigation";

export default function HomePage(){
    return(
        <>
        <h2>Home Page</h2>
            <MainNavigation></MainNavigation>
        {getAuthorizationToken()? <p>The User is Authenticated</p>: <p>User not authenticated</p>}
        </>
    )
}