import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import StatusNav from "../layouts/StatusNav";
import SettingsNav from "../layouts/SettingsNav";

export default function FinancierList (){
    const financiers = useLoaderData();

    return (<>

        <div className="content">
            <Row>

            </Row>
            <Row>
                <Col md="12">

                    <Card>
                        <SettingsNav></SettingsNav>
                        <CardHeader>
                            <Row>
                                <Col md="6"><CardTitle tag="strong">Lista de Financiadores</CardTitle></Col>

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
                                {financiers.map(financier => (<tr key={financier.id}>
                                    <td>{financier.name}</td>

                                    <td><Link to={`${financier.id}/edit`}>Editar</Link></td>
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

export async function financierLoader({request}) {

    const token = getAuthorizationToken();
    const response = await fetch("/api/financiers", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({message: "Não foi possível carregar os dados do financiador"}, {status: 500})
    }


    return response;
}