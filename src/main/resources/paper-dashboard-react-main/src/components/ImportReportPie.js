import {Card, CardBody, CardFooter, CardHeader, CardTitle} from "reactstrap";
import {Pie} from "react-chartjs-2";
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
                labels: [1, 2, 3],
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
                legend: { display: false },
                tooltip: { enabled: false },
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
                    barPercentage: 1.6,
                    grid: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            },
        },
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle tag="h5">Importações</CardTitle>

                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                    <Pie
                        data={dashboardEmailStatisticsChart.data}
                        options={dashboardEmailStatisticsChart.options}
                    />
                </CardBody>
                <CardFooter>
                    <div className="legend">
                        <i className="fa fa-circle text-primary mr-3" /> Em Andamento{" "}
                        <i className="fa fa-circle text-warning mr-3" /> Concluídos{" "}
                        <i className="fa fa-circle text-danger mr-3" /> Encerrados{" "}
                    </div>
                    <hr />
                    <div className="stats">
                        <i className="fa fa-calendar" /> {format(new Date(), 'dd/MM/yyyy')}
                    </div>
                </CardFooter>
            </Card>

        </>
    );
}