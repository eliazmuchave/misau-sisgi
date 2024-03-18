/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import {Line, Pie} from "react-chartjs-2";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
// core components
import {
    dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart,
} from "variables/charts.js";
import ImportReportPie from "../components/ImportReportPie";
import BeneficiaryTotalReport from "../components/BeneficiaryTotalReport";
import FunderTotalReport from "../components/FunderTotalReport";
import ImportExpiresList from "../components/ImportExpiresList";

function Dashboard() {
    const estiloContainer = {
        display: 'flex',
        alignItems: 'stretch',
        /* Adicione outros estilos conforme necessário */
    };
    return (
        <>
            <div className="content">

                <Row style={estiloContainer}>
                    <Col md="4">
                        <ImportExpiresList title="Processos Atrasados" daysAfter="-90" daysBefore="0"></ImportExpiresList>

                    </Col>
                    <Col md="4">
                        <ImportExpiresList title="Processos Atrasados - Últimos 7 Dias" daysAfter="-7" daysBefore="0"></ImportExpiresList>

                    </Col>
                    <Col md="4">
                        <ImportExpiresList title="Expirando nos Próximos 7 Dias" daysAfter="1" daysBefore="7"></ImportExpiresList>

                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        <ImportReportPie></ImportReportPie>

                    </Col>
                    <Col md="4">
                        <BeneficiaryTotalReport></BeneficiaryTotalReport>
                    </Col>
                    <Col md="4">
                        <FunderTotalReport></FunderTotalReport>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;
