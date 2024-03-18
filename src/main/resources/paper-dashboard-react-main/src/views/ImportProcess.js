import {
    Button, Card, CardBody, CardHeader, CardTitle, Col, FormFeedback, FormGroup, Input, Label, Row
} from "reactstrap";
import {Form, json, redirect, useActionData, useLoaderData} from "react-router-dom";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import StatusFlowSelect from "./StatusFlowSelect";
import {format} from "date-fns";
import TaskNav from "../layouts/TaskNav";
import GoodsSelect from "../components/GoodsSelect";
import BeneficiarySelect from "../components/BeneficiarySelect";
import FinanciarySelect from "../components/FinanciarySelect";
import ForwardingAgent from "./ForwardingAgent";
import AgentSelect from "../components/AgentSelect";

export default function ImportProcess() {

    const data = useLoaderData();
    const emptyData = {label: "DNAM", value: "1"};
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
                                            <Input name="processNumber" id="processNumber"
                                                   invalid={errors?.processNumber}
                                                   defaultValue={data ? data?.processNumber : ""}
                                                   type="text"
                                            />

                                            <FormFeedback>
                                                <span><strong>Número Inválido</strong> - Número de processo inválido</span>
                                            </FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Bem</label>
                                            <GoodsSelect selected={data ? data.goods : emptyData} name="goodsId"
                                                         id="goodsId"></GoodsSelect>

                                            <FormFeedback>
                                                <span><strong>Bem não selecionado</strong> Selecione o bem</span>
                                            </FormFeedback>

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
                                                   defaultValue={data ? format(data?.startDate, "yyyy-MM-dd") : ""}
                                                   type="date"
                                                   data-date-format="dd MM yyyy"
                                            />
                                            <FormFeedback>
                                                <span><strong>Data Inválida Inválida</strong> - Data de Início de Actividade Inválida</span>
                                            </FormFeedback>
                                        </FormGroup>


                                    </Col>

                                    <Col className="pl-1" md="6">
                                        <FormGroup>
                                            <label>Previsão de Chegada</label>
                                            <Input name="arrivalForecast" id="arrivalForecast"
                                                   invalid={errors?.arrivalForecast}
                                                   defaultValue={data?.arrivalForecast ? format(data?.arrivalForecast, "yyyy-MM-dd") : ""}
                                                   type="date"
                                                   data-date-format="dd MM yyyy"
                                            />
                                            <FormFeedback>
                                                <span><strong>Data Inválida</strong> - Data prevista para chegada Inválida</span>
                                            </FormFeedback>
                                        </FormGroup>
                                        {data ?

                                            <FormGroup>
                                                <label>Data de Chegada</label>
                                                <Input name="arrivalDate" id="arrivalDate" invalid={errors?.arrivalDate}
                                                       defaultValue={data?.arrivalDate ? format(data?.arrivalDate, "yyyy-MM-dd") : ""}
                                                       type="date"
                                                       data-date-format="dd MM yyyy"
                                                />
                                                <FormFeedback>
                                                    <span><strong>Data Inválida </strong> - Data de chegada Inválida</span>
                                                </FormFeedback>
                                            </FormGroup>
                                            : null}

                                        {data ?
                                            <FormGroup>
                                                <label>Data de Levantamento</label>
                                                <Input name="pickupDate" id="pickupDate" invalid={errors?.pickupDate}
                                                       defaultValue={data?.pickupDate ? format(data?.pickupDate, "yyyy-MM-dd") : ""}
                                                       type="date"
                                                       data-date-format="dd MM yyyy"
                                                />
                                                <FormFeedback>
                                                    <span><strong>Data Inválida</strong> - Data de Levantamento  Inválida</span>
                                                </FormFeedback>
                                            </FormGroup>
                                            : null}


                                        <FormGroup>
                                            <label>Beneficiário</label>
                                            <BeneficiarySelect selected={data ? data.beneficiary : emptyData}
                                                               name="beneficiaryId"
                                                               id="benefiaryId"></BeneficiarySelect>

                                            <FormFeedback>
                                                <span><strong>Beneficiário não selecionado</strong> Selecione o Beneficiário</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Financiador/Doador</label>
                                            <FinanciarySelect selected={data ? data.financier : emptyData}
                                                              name="financiaryId"
                                                              id="financiaryId"></FinanciarySelect>

                                            <FormFeedback>
                                                <span><strong>Financiador não selecionado</strong> Selecione o financiador</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <label>Despachante </label>

                                            <AgentSelect selected={data ? data.forwardingAgent : emptyData}
                                                         name="forwardingAgentId" id="forwardingAgentId"></AgentSelect>

                                            <FormFeedback>
                                                <span><strong>Financiador não selecionado</strong> Selecione o financiador</span>
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Fluxo da Tarefa</Label>
                                            <StatusFlowSelect selected={data ? data?.predictedStatusFlow : emptyData}
                                                              name="statusFlowId"
                                                              id="statusFlowId"></StatusFlowSelect>

                                        </FormGroup>


                                    </Col>


                                </Row>

                                <Row>


                                    <Col className="pl-1" md="12">
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

export async function importProcessAction({request, params}) {
    const id = params.id;
    const url = id ? `/api/importProcess/${id}` : "/api/importProcess";
    const errors = {};
    const requestData = await request.formData();
    const task = Object.fromEntries(requestData);

    const token = getAuthorizationToken();
    const response = await fetch(url, {
        body: JSON.stringify(task), "method": request.method, headers: {
            "Authorization": `Bearer ${token}`, "Content-Type": "application/json"

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

export async function importProcessLoader({params, request}) {

    const id = params.id;
    const token = getAuthorizationToken();
    const response = await fetch(`/api/importProcess/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({message: "Não foi possível listar os processos de importação"}, {status: 500})
    }
    return response;

}