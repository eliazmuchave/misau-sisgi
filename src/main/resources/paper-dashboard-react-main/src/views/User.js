
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Input,
    Row,
    Col, FormFeedback, Label,
} from "reactstrap";
import {json, redirect, Form, useLoaderData} from "react-router-dom";
import {getAuthorizationToken, setAuthorizationToken} from "../util/AccessTokenUtil";

export default function User() {
    const responses = useLoaderData();

    let data = {};
    let roles = [];
   if (responses){
        data = responses[0];
       roles = responses[1];
   }
    return (
        <>
            <div className="content">
                <Row>

                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Registar Utilizador</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form method={data && data.id ? "PATCH" : "POST"}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>Email</label>
                                                <Input name="email" id="email" defaultValue={data ? data.email : ""}
                                                       type="email"
                                                />
                                                <FormFeedback>
                                                    Email Inválido
                                                </FormFeedback>
                                            </FormGroup>

                                        </Col>

                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                                <Input type="password" id="password" name="password"/>
                                            </FormGroup>
                                            <FormFeedback>
                                                Password Inválida
                                            </FormFeedback>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="3">
                                            <FormGroup>
                                                <label>Primeiro Nome</label>
                                                <Input

                                                    type="text" name="firstName" id="firstName"
                                                    defaultValue={data ? data.firstName : ""}
                                                    required
                                                />
                                            </FormGroup>
                                            <FormFeedback>
                                                Primeiro Nome Inválido
                                            </FormFeedback>
                                        </Col>
                                        <Col className="pr-1" md="3">
                                            <FormGroup>
                                                <label>Outros Nomes</label>
                                                <Input
                                                    id="lastName" name="lastName"
                                                    defaultValue={data ? data.lastName : ""}
                                                    type="text"
                                                    required
                                                />
                                            </FormGroup>
                                            <FormFeedback>
                                                Nome Inválido
                                            </FormFeedback>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup >
                                                <Label for="checkbox2" sm={2}>
                                                    Roles
                                                </Label>
                                                <Col  >

                                                        {roles.map(role => (<FormGroup row key={role.id} row><Label check>
                                                            <input type="checkbox" name="roles" value={role.id} ></input>
                                                            {role.roleName}

                                                        </Label></FormGroup>))}


                                                </Col>
                                            </FormGroup>

                                        </Col>

                                    </Row>


                                    <Row>

                                        <div className="update ml-auto">
                                            <Col>
                                                <Button
                                                    className="btn"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    {data && data.id ? "Actualizar" : "Resgistar"}
                                                </Button>
                                            </Col>
                                        </div>

                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export async function addUserAction({request, params}) {
    const id = params.id;
    let url = "/api/users";
    if (id) {
        url = `/api/users/${id}`;
    }
    const data = await request.formData();

    const dataEntries = Object.fromEntries(data);
    dataEntries.roles = data.getAll("roles");
    console.log(dataEntries);
    const token = getAuthorizationToken();

    const response = await fetch(url, {
        method: request.method,
        body: JSON.stringify(dataEntries),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw json({message: "Could not send the request"}, {status: 500});
    }
    return redirect("/admin/users")


}

export async function userLoader({params}) {
    const id = params.id;

    const token = getAuthorizationToken();
   const response = Promise.all([
        fetch("/api/users/" + id, {
            headers: {"Authorization": `Bearer ${token}`}
        }).then(resp => resp.json()),
        fetch("/api/roles", {
            headers: {"Authorization": `Bearer ${token}`}
        }).then(resp => resp.json())

    ]);




    return response ;
}
