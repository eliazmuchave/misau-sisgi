import {json, redirect} from "react-router-dom";
import LoginForm from "../components/LoginForm";
import {setAuthorizationToken} from "../util/AccessTokenUtil";

export default function LoginPage() {

    return (
        <>
            <h2>Login Page</h2>
            <LoginForm></LoginForm>
        </>
    );
}

export async function loginAction({params, request}) {
    const data = await request.formData();
    const dataEntries = Object.fromEntries(data);
    console.log(dataEntries);
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(dataEntries),
        headers: {"Content-Type": "application/json"}
    });

    if (!response.ok) {
        throw json({message: "Could not send the request"}, {status: 500});
    }
    const responseData = await response.json();

    setAuthorizationToken(responseData.token);

    return redirect("..")


}