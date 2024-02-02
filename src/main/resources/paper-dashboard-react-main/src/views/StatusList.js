import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";

export default function StatusList (){
    const statuses = useLoaderData();

    return (<>
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col md="10"><CardTitle tag="h4">Estados de Actividades</CardTitle></Col>
                                <Col md="2" className="mr-auto ml-auto">
                                    <Button><Link to="new">Adiconar Estado</Link></Button>

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
                                                                   <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {statuses.map(status => (<tr key={status.id}>
                                    <td>{status.nameStatus}</td>

                                    <td><Link to={`${status.id}/edit`}>Editar</Link></td>
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

export async function statusesLoader({request}) {

    const token = getAuthorizationToken();
    const response = await fetch("/api/status", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({message: "Could not load status"}, {status: 500})
    }


    return response;
}