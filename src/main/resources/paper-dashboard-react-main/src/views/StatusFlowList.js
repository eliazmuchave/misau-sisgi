import {Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Row, Table} from "reactstrap";
import {json, Link, useLoaderData} from "react-router-dom";
import {getAuthorizationToken} from "../util/AccessTokenUtil";

export default function StatusFlowList(){
    const flows = useLoaderData();
    return(
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="6"><CardTitle tag="h4">Estados de Actividades</CardTitle></Col>
                                    <Col md="6" className="mr-auto">
                                        <Button><Link to="new">Adiconar Fluxo</Link></Button>
                                        <Button><Link to="/admin/statusFlow">Fluxo de Estados</Link></Button>
                                        <Button><Link to="/admin/statusFlow/new">Adicionar Fluxo</Link></Button>

                                    </Col>
                                </Row>


                            </CardHeader>
                            <CardBody>
                                <Row>

                                </Row>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>Designação</th>
                                        <th>Sequência de Estados</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {flows.map(flow => (<tr key={flow.id}>
                                        <td>{flow.name}</td>
                                        <th>
                                            {
                                                flow.statuses.map(status =><label><Badge className="ml-3">{status.nameStatus}</Badge></label> )
                                            }
                                        </th>

                                        <td><Link to={`${flow.id}/edit`}>Editar</Link></td>
                                    </tr>))}


                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export async function statusFlowLoader(){
    const token = getAuthorizationToken();
    const response =await fetch("/api/statusFlow", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw json({message: "Não foi possível carregar a lista de fluxos"}, {status: 500})
    }
    return response;
}