import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";

export default function FunderTotalReport(){
    const [report, setReport] = useState([]);
    const token = getAuthorizationToken();


    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/importProcess/totalFunder",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const report = await response.json();

            setReport(report);

        }
        loadData()
    }, []);

    return (
        <>

            < div className="content">


                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="10"><CardTitle tag="strong">Total por Financiador</CardTitle></Col>

                                </Row>


                            </CardHeader>
                            <CardBody>
                                <Row>

                                </Row>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>Financiador</th>
                                        <th>Total Importações</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {report.map(funder => (<tr key={funder.id}>
                                        <td><i className="fa fa-circle mr-2"></i> {funder?.name}</td>
                                        <td>    {funder?.total}</td>

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