import {Form, json, redirect, useActionData, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, FormFeedback, FormGroup, Input, Row} from "reactstrap";
import SettingsNav from "../layouts/SettingsNav";
import {getAuthorizationToken} from "../util/AccessTokenUtil";

export default function Currency(){


    const data = useLoaderData();
    const errors = useActionData();
    return (<>
        <div className="content">
            <Row>

                <Col md="12">
                    <Card className="card-user">
                        <SettingsNav></SettingsNav>
                        <CardHeader>
                            <CardTitle tag="strong">Registar Moedas</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form method={data && data.id ? "PATCH" : "POST"}>
                                <Row>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Designação</label>
                                            <Input name="name" id="name" invalid={errors?.name}
                                                   defaultValue={data ? data.name : ""}
                                                   type="text"
                                            />
                                            <FormFeedback>
                                                <span><strong>Designação Inválida</strong> - A designação deve ter pelo menos duas letras</span>
                                            </FormFeedback>
                                        </FormGroup>

                                    </Col>

                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Símbolo</label>
                                            <Input name="symbol" id="symbol" invalid={errors?.symbol}
                                                   defaultValue={data ? data.symbol : ""}
                                                   type="text"
                                            />
                                            <FormFeedback>
                                                <span><strong>Designação Inválida</strong> - Introduza o Símbolo da Moeda</span>
                                            </FormFeedback>
                                        </FormGroup>

                                    </Col>


                                </Row>

                                <Row>


                                    <Col className="pr-1" md="6">
                                        <div className="float-right">
                                            <Button
                                                className="btn"
                                                color="primary"
                                                type="submit"
                                            >
                                                {data && data.id ? "Actualizar" : "Registar"}
                                            </Button>

                                        </div>

                                    </Col>


                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    </>);
}

export async function currencyAction({request, params}) {
    const id = params.id;
    let url = "/api/currencies";
    if (id) {
        url = `/api/currencies/${id}`;
    }
    const data = await request.formData();
    const errors = {};
    const dataEntries = Object.fromEntries(data);
    const token = getAuthorizationToken();

    const response = await fetch(url, {
        method: request.method, body: JSON.stringify(dataEntries), headers: {
            "Authorization": `Bearer ${token}`, "Content-Type": "application/json"
        }
    });
    if (typeof dataEntries.name !== "string" || dataEntries.name.length < 2) {
        errors.name = true;
    }
    if (Object.values(errors).length > 0) {
        return errors;
    }

    if (!response.ok) {
        throw json({message: "Não foi possível registar a Moeda"}, {status: 500});
    }
    return redirect("/admin/currencies")

}

export async function currencyLoader({params}) {
    const id = params.id;
    const token = getAuthorizationToken();
    const url = `/api/currencies/${id}`;
    const response = await fetch("/api/currencies/"+id, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })


    return response
}