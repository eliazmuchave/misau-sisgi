import {Form, json, redirect, useActionData, useLoaderData} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Row
} from "reactstrap";
import StatusSelect from "../components/StatusSelect";
import {getAuthorizationToken} from "../util/AccessTokenUtil";

export default function StatusFlow() {

    const data = useLoaderData();
    const errors = useActionData();
    return (<>
        <div className="content">
            <Row>

                <Col md="12">
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle tag="h5">Registar Fluxo de Actividades</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form method={data && data.id ? "PATCH" : "POST"}>
                                <Row>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Designação</label>
                                            <Input name="name" id="name" invalid={errors?.name}
                                                   defaultValue={data ? data.nameStatus : ""}
                                                   type="text"
                                            />
                                            <FormFeedback>
                                                <span><strong>Designação Inválida</strong> - A designação deve ter pelo menos três letras</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Sequência de Estados</label>
                                            <StatusSelect isMulti id = "statuses" name = "statuses"></StatusSelect>
                                            <FormText>
                                                <span><strong>Sequência de Estados</strong> - Os processos seguirão a sequência da selecção</span>
                                            </FormText>
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

export async function statusFlowAction({params, request}){

    const token = getAuthorizationToken();
    const requestData = await request.formData();
    const errors = {};
    const objData = Object.fromEntries(requestData);
    objData.statuses = requestData.getAll("statuses")
    console.log(objData)

    const response = await  fetch("/api/statusFlow", {
        method: request.method,
        body: JSON.stringify(objData),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },

    });
    if (typeof objData.name !== "string" || objData.name.length < 4) {
        errors.name = true;
    }
    if (Object.values(errors).length > 0) {
        return errors;
    }

    if (!response.ok) {
        throw json({message: "Could not send the request"}, {status: 500});
    }
    return redirect("/admin/statusFlow")


}