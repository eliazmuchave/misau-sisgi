import {
    Button, Card, CardBody, CardHeader, CardTitle, Col, FormFeedback, FormGroup, Input, Label, Row
} from "reactstrap";
import {Form, json, redirect, useActionData, useLoaderData} from "react-router-dom";
import {getAuthorizationToken} from "../util/AccessTokenUtil";

export default function Status() {
    const data = useLoaderData();
    const errors = useActionData();
    return (<>
        <div className="content">
            <Row>

                <Col md="12">
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle tag="h5">Registar Estados de Actividades</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form method={data && data.id ? "PATCH" : "POST"}>
                                <Row>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Designação</label>
                                            <Input name="nameStatus" id="nameStatus" invalid={errors?.nameStatus}
                                                   defaultValue={data ? data.nameStatus : ""}
                                                   type="text"
                                            />
                                            <FormFeedback>
                                                <span><strong>Designação Inválida</strong> - A designação deve ter pelo menos três letras</span>
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
                                                {data && data.id ? "Actualizar" : "Resgistar"}
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

export async function addStatusAction({request, params}) {
    const id = params.id;
    let url = "/api/status";
    if (id) {
        url = `/api/status/${id}`;
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
    if (typeof dataEntries.nameStatus !== "string" || dataEntries.nameStatus.length < 4) {
        errors.nameStatus = true;
    }
    if (Object.values(errors).length > 0) {
        return errors;
    }

    if (!response.ok) {
        throw json({message: "Could not send the request"}, {status: 500});
    }
    return redirect("/admin/status")

}

export async function statusLoader({params}) {
    const id = params.id;
    const token = getAuthorizationToken();
    const url = `/api/status/${id}`;
    const response = await fetch("/api/status/"+id, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })


    return response
}