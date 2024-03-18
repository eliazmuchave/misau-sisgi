import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import TaskNav from "../layouts/TaskNav";
import DaysInProgressBadge from "./DaysInProgressBadge";
import WorkflowStatusBadge from "./WorkflowStatusBadge";
import ForwardingStatus from "./ForwardingStatus";
import NotificationButton from "./NotificationButton";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import ProcessDetails from "./ProcessDetails";

export default function BeneficiaryTotalReport() {

    const [report, setReport] = useState([]);
    const token = getAuthorizationToken();


    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/importProcess/totalBeneficiary",
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
                               <CardTitle tag="strong">Total por Beneficiário</CardTitle>


                            </CardHeader>
                            <CardBody>
                                <Row>

                                </Row>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>Beneficiário</th>
                                        <th>Total Importações</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {report.map(beneficiary => (<tr key={beneficiary.beneficiary}>
                                        <td><i className="fa fa-circle mr-2"></i> {beneficiary?.beneficiary}</td>
                                    <td>    {beneficiary?.total}</td>

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