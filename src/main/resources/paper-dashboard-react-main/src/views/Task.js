import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import {Form, json, redirect, useActionData, useLoaderData} from "react-router-dom";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import StatusFlow from "./StatusFlow";
import {format} from "date-fns";

export default function Task() {

    const data = useLoaderData();
    const errors = useActionData();

    return (<>
        <div className="content">
            <Row>

                <Col md="12">
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle tag="h5">Registo de Tarefas</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form method={data && data.id ? "PATCH" : "POST"}>
                                <Row>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Designação</label>
                                            <Input name="taskName" id="nameTask" invalid={errors?.taskName}
                                                   defaultValue={data ? data.taskName : ""}
                                                   type="text"
                                            />
                                            <FormFeedback>
                                                <span><strong>Designação Inválida</strong> - A designação deve ter pelo menos três letras</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Data Início</label>
                                            <Input name="startDate" id="startDate" invalid={errors?.startDate}
                                                   defaultValue={data ? format(data.startDate,"yyyy-MM-dd") : ""}
                                                   type="date"
                                                   data-date-format="dd MM yyyy"
                                            />
                                            <FormFeedback>
                                                <span><strong>Data Inválida Inválida</strong> - Data de Início de Actividade Inválida</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Fluxo da Tarefa</Label>
                                        <StatusFlow select={data.workflow} name="statusFlow" id = "statusFlow" ></StatusFlow>

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

export async function taskAction({request}) {
    const errors = {};
    const requestData = await request.formData();
    const task = Object.fromEntries(requestData);
    const token = getAuthorizationToken();
    const response = await fetch("/api/tasks", {
        body: JSON.stringify(task), "method": request.method,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
    });

    if (typeof task.taskName !== "string" || task.taskName.length < 4) {
        errors.taskName = true;
    }
    if (Object.values(errors).length > 0) {
        return errors;
    }

    if (!response.ok) {
        throw json({message: "Could not send the request"}, {status: 500});
    }
    return redirect("/admin/status")
}

export async function taskLoader({params, request}){

    const id = params.id;
    console.log(id);
    const token = getAuthorizationToken();
    const response = await fetch(`/api/tasks/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok){
        throw json({message: "Could not load task"}, {status: 500})
    }
    return response;

}