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

function Dashboard() {
    return (
        <>
            <div className="content">
                <Row>
                    <Col lg="3" md="6" sm="6">
                        <Card className="card-stats">
                            <CardBody>
                                <Row>
                                    <Col md="4" xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-globe text-warning"/>
                                        </div>
                                    </Col>
                                    <Col md="8" xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Capacity</p>
                                            <CardTitle tag="p">150GB</CardTitle>
                                            <p/>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="stats">
                                    <i className="fas fa-sync-alt"/> Update Now
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col lg="3" md="6" sm="6">
                        <Card className="card-stats">
                            <CardBody>
                                <Row>
                                    <Col md="4" xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-money-coins text-success"/>
                                        </div>
                                    </Col>
                                    <Col md="8" xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Revenue</p>
                                            <CardTitle tag="p">$ 1,345</CardTitle>
                                            <p/>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="stats">
                                    <i className="far fa-calendar"/> Last day
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col lg="3" md="6" sm="6">
                        <Card className="card-stats">
                            <CardBody>
                                <Row>
                                    <Col md="4" xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-vector text-danger"/>
                                        </div>
                                    </Col>
                                    <Col md="8" xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Errors</p>
                                            <CardTitle tag="p">23</CardTitle>
                                            <p/>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="stats">
                                    <i className="far fa-clock"/> In the last hour
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col lg="3" md="6" sm="6">
                        <Card className="card-stats">
                            <CardBody>
                                <Row>
                                    <Col md="4" xs="5">
                                        <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-favourite-28 text-primary"/>
                                        </div>
                                    </Col>
                                    <Col md="8" xs="7">
                                        <div className="numbers">
                                            <p className="card-category">Followers</p>
                                            <CardTitle tag="p">+45K</CardTitle>
                                            <p/>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <hr/>
                                <div className="stats">
                                    <i className="fas fa-sync-alt"/> Update now
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">

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
