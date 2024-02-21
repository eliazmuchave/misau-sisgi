import {Form, json, redirect, useActionData} from "react-router-dom";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col, FormFeedback,
    FormGroup,
    Input,
    Row,
} from "reactstrap";
import classes from "./Login.module.css";
import "assets/scss/paper-dashboard/cards/_card-login.scss";
import {getAuthorizationToken, setAuthenticatedUsername, setAuthorizationToken} from "../util/AccessTokenUtil";

export default function Login() {
    let actionData = useActionData();

    if (!actionData) {
        actionData = {email: false, password: false};
    }

    return (
        <div className={classes.container}>
            <Col md="3" >
                <Card className={classes.loginBox}>
                    <CardHeader>
                        <CardTitle className="align-">
                            <h5 className="text-center">Autentique-se</h5>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form method="post">
                            {actionData.authenticationFailed && <Alert color="danger">
                                <span><strong>Credenciais Inválidas</strong> - Por favor, verifique seu nome de usuário e senha e tente novamente</span>
                            </Alert>}

                            {!actionData.authenticationFailed && <Alert color="info">
                                <span><strong>Autenticação</strong> - Por favor, autentique-se usando seu Email e Senha </span>
                            </Alert>}
                            <FormGroup>
                                <label htmlFor="email" className="control-label">
                                    E-mail
                                </label>
                                <Input type="text" name="email" id="email" invalid={actionData.email}/>
                                <FormFeedback>
                                    <span><strong>O endereço de e-mail fornecido é inválido</strong> - Por favor, verifique e tente novamente</span>
                                </FormFeedback>

                            </FormGroup>
                            <FormGroup>
                                <label>Senha</label>
                                <Input type="password" name="password" id="password" invalid={actionData.password} defaultValue={actionData.authenticationFailed? "": ""}/>
                                <FormFeedback>
                                    <span><strong>A password fornecida é inválida</strong> - Por favor, verifique e tente novamente</span>
                                </FormFeedback>

                            </FormGroup>

                            <FormGroup>

                                    <Button block  className="btn" color="success" type="submit">
                                        Entrar
                                    </Button>

                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );


}

export async function loginAction({params, request}) {


    const data = await request.formData();
    const errors = {authenticationFailed: false};
    const dataEntries = Object.fromEntries(data);

    const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(dataEntries),
        headers: {"Content-Type": "application/json"}
    });

    let email = dataEntries.email;
    let password = dataEntries.password;
    if (typeof email !== "string" || !email.includes("@")) {
        errors.email =
            true;
    }

    if (typeof password !== "string" || password.length < 6) {
        errors.password = true;
    }
    if (response.status == 400) {
        errors.authenticationFailed = true;
    }
    if (Object.keys(errors).length > 1 || errors?.authenticationFailed === true) {
        return errors;
    }
    if (!response.ok) {
        return redirect("/login");
    }
    const responseData = await response.json();

    setAuthorizationToken(responseData.token);
    setAuthenticatedUsername(email);

    return redirect("/admin");


}
