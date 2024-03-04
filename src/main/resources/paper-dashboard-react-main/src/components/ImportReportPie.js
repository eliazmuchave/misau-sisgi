import {Card, CardBody, CardFooter, CardHeader, CardTitle} from "reactstrap";
import {Pie,Bar} from "react-chartjs-2";
import React, {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {format} from "date-fns";

export default function ImportReportPie(){

    const [report, setReport] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/importProcess/totalStatus",
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
    const dashboardEmailStatisticsChart = {
        data: (canvas) => {
            return {
                labels: [report.inProgress, report.done, report.closed],
                datasets: [
                    {
                        label: "Importações",
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        backgroundColor: [ "#4acccd", "#fcc468", "#ef8157"],
                        borderWidth: 0,
                        data: [ report.inProgress, report.done, report.closed],
                    },
                ],
            };
        },
        options: {
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true },
            },
            maintainAspectRatio: false,
            pieceLabel: {
                render: "percentage",
                fontColor: ["white"],
                precision: 2,
            },
            scales: {
                y: {
                    ticks: {
                        display: false,

                    },
                    grid: {
                        drawBorder: false,
                        display: false,
                    },
                },
                x: {
                    barPercentage: 1,
                    grid: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: true,
                    },
                },
            },
        },

    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle tag="strong"><div className="stats">Importações - Estados
                        <i className="fa fa-calendar ml-3"/> {format(new Date(), 'dd/MM/yyyy')}
                    </div></CardTitle>

                </CardHeader>
                <CardBody style={{height: "220px"}}>
                    <Bar
                        data={dashboardEmailStatisticsChart.data}
                        options={dashboardEmailStatisticsChart.options}
                    />
                </CardBody>
                <CardFooter>
                    <div className="legend">
                        <i className="fa fa-circle text-primary mr-1"/> <span className="mr-3">Em Andamento</span>
                        <i className="fa fa-circle text-warning mr-1"/> <span className="mr-3">Concluídos</span>
                        <i className="fa fa-circle text-danger mr-1"/> <span className="mr-3">Encerrados</span>
                    </div>
                    <hr/>

                </CardFooter>
            </Card>

        </>
    );
}