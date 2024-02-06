import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import StatusNav from "../layouts/StatusNav";
import SettingsNav from "../layouts/SettingsNav";

export default function GoodsList (){
    const goods = useLoaderData();

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
                                <Col md="6"><CardTitle tag="strong">Lista de Bens</CardTitle></Col>

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
                                {goods.map(good => (<tr key={good.id}>
                                    <td>{good.name}</td>

                                    <td><Link to={`${good.id}/edit`}>Editar</Link></td>
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

export async function goodsListLoader({request}) {

    const token = getAuthorizationToken();
    const response = await fetch("/api/goods", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({message: "Não foi possível carregar a lista de bens"}, {status: 500})
    }


    return response;
}