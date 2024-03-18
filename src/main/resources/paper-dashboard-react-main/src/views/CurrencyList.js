import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json, Link, useLoaderData} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import StatusNav from "../layouts/StatusNav";
import SettingsNav from "../layouts/SettingsNav";

export default function CurrencyList (){
    const currencies = useLoaderData();

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
                                <Col md="6"><CardTitle tag="strong">Lista de Moedas</CardTitle></Col>

                            </Row>


                        </CardHeader>
                        <CardBody>
                            <Row>

                            </Row>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Nome</th>
                                    <th>Símbolo</th>
                                                                   <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {currencies.map(currency => (<tr key={currency.id}>
                                    <td>{currency.name}</td>
                                    <td>{currency.symbol}</td>

                                    <td><Link to={`${currency.id}/edit`}>Editar</Link></td>
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

export async function currenciesLoader({request}) {

    const token = getAuthorizationToken();
    const response = await fetch("/api/currencies", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({message: "Não foi possível carregar os informação de moedas"}, {status: 500})
    }


    return response;
}