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
import StatusFlowSelect from "./StatusFlowSelect";
import {format} from "date-fns";
import TaskNav from "../layouts/TaskNav";
import GoodsSelect from "../components/GoodsSelect";
import BeneficiarySelect from "../components/BeneficiarySelect";
import FinanciarySelect from "../components/FinanciarySelect";

export default function ImportProcess() {

    const data = useLoaderData();
    const errors = useActionData();

    return (<>
        <div className="content">
            <Row>

                <Col md="12">
                    <Card className="card-user">
                        <TaskNav></TaskNav>
                        <CardHeader>
                            <CardTitle tag="strong">Registo de Processo de Importação de Bens</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form method={data && data?.id ? "PATCH" : "POST"}>
                                <Row>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>Designação</label>
                                            <Input name="taskName" id="taskName" invalid={errors?.taskName}
                                                   defaultValue={data ? data?.taskName : ""}
                                                   type="text"
                                            />

                                        </FormGroup>

                                        <FormGroup>
                                            <label>Número do Processo</label>
                                            <Input name="processNumber" id="processNumber" invalid={errors?.processNumber}
                                                   defaultValue={data ? data?.processNumber : ""}
                                                   type="text"
                                            />

                                            <FormFeedback>
                                                <span><strong>Número Inválido</strong> - Número de processo inválido</span>
                                            </FormFeedback>
                                            <FormGroup>
                                                <label>Bem</label>
                                                <GoodsSelect name = "goods" id = "goods" ></GoodsSelect>

                                                <FormFeedback>
                                                    <span><strong>Bem não selecionado</strong> Selecione o bem</span>
                                                </FormFeedback>
                                            </FormGroup>
                                            <FormFeedback>
                                                <span><strong>Número Inválido</strong> - Número de Processo deve ter pelo menos três letras</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Factura</label>
                                            <Input name="invoice" id="invoice" invalid={errors?.invoice}
                                                   defaultValue={data ? data?.invoice : ""}
                                                   type="text"
                                            />
                                            <FormFeedback>
                                                <span><strong>Número Inválido</strong> - deve ter pelo menos três letras</span>
                                            </FormFeedback>
                                        </FormGroup>


                                        <FormGroup>
                                            <label>Valor</label>
                                            <Input name="value" id="value" invalid={errors?.value}
                                                   defaultValue={data ? data?.value : ""}
                                                   type="number"
                                            />
                                            <FormFeedback>
                                                <span><strong>Valor Inválido</strong> - deve ter pelo menos três letras</span>
                                            </FormFeedback>
                                        </FormGroup>



                                        <FormGroup>
                                            <label>Data Início</label>
                                            <Input name="startDate" id="startDate" invalid={errors?.startDate}
                                                   defaultValue={data ? format(data?.startDate,"yyyy-MM-dd") : ""}
                                                   type="date"
                                                   data-date-format="dd MM yyyy"
                                            />
                                            <FormFeedback>
                                                <span><strong>Data Inválida Inválida</strong> - Data de Início de Actividade Inválida</span>
                                            </FormFeedback>
                                        </FormGroup>



                                    </Col>

                                    <Col className="pr-1" md="6">

                                        <FormGroup>
                                            <label>Benefiário</label>
                                            <BeneficiarySelect name = "beneficiary" id = "benefiary"></BeneficiarySelect>

                                            <FormFeedback>
                                                <span><strong>Benficiário não selecionado</strong> Selecione o Beneficiário</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Financiador</label>
                                            <FinanciarySelect name = "financiary" id = "financiary"></FinanciarySelect>

                                            <FormFeedback>
                                                <span><strong>Financiador não selecionado</strong> Selecione o financiador</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Despachante </label>
                                            <FinanciarySelect name = "agent" id = "agent"></FinanciarySelect>

                                            <FormFeedback>
                                                <span><strong>Financiador não selecionado</strong> Selecione o financiador</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Fluxo da Tarefa</Label>
                                            <StatusFlowSelect select={data?.workflow} name="statusFlow" id = "statusFlow" ></StatusFlowSelect>

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
                                                {data && data?.id ? "Actualizar" : "Resgistar"}
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

export async function importProcessAction({request}) {
    const errors = {};
    const requestData = await request.formData();
    const task = Object.fromEntries(requestData);
    const token = getAuthorizationToken();
    const response = await fetch("/api/importProcess", {
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
    return redirect("/admin/importProcess")
}

export async function importProcessLoader({params, request}){

    const id = params.id;
    const token = getAuthorizationToken();
    const response = await fetch(`/api/importProcess/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok){
        throw json({message: "Não foi possível listar os processos de importação"}, {status: 500})
    }
    return response;

}