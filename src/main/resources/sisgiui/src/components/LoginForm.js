import {Form} from "react-router-dom";

export default function LoginForm() {
    return (
        <>
            <Form method="post">
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email" required/>
                </p>

                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </p>
                <div>
                    <button>Login</button>
                </div>
            </Form>

        </>
    )
}