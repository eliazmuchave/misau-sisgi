import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import StatusNav from "../layouts/StatusNav";

export default function ForwardingAgentList (){
    const agents = useLoaderData();

    return (<>

        <div className="content">
            <Row>

            </Row>
            <Row>
                <Col md="12">

                    <Card>
                        <StatusNav></StatusNav>
                        <CardHeader>
                            <Row>
                                <Col md="6"><CardTitle tag="strong">Lista de Despachantes</CardTitle></Col>

                            </Row>


                        </CardHeader>
                        <CardBody>
                            <Row>

                            </Row>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Nome</th>
                                                                   <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {agents.map(agent => (<tr key={agent.id}>
                                    <td>{agent.name}</td>

                                    <td><Link to={`${agent.id}/edit`}>Editar</Link></td>
                                </tr>))}


                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>

    </>);

}

export async function agentsLoader({request}) {

    const token = getAuthorizationToken();
    const response = await fetch("/api/forwardingAgents", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({message: "Could not load status"}, {status: 500})
    }


    return response;
}