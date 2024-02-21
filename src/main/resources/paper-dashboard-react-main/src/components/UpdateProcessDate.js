import {Alert, Button, Col, FormFeedback, FormGroup, Input, Row} from "reactstrap";
import {Form} from "react-router-dom";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import AlertPopup from "./AlertPopup";
import {useState} from "react";
import ConfirmationPopup from "./ConfirmationPopup";

export default function UpdateProcessDate({task, updateTask}) {



    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("id", task.id);
        const taskDates = Object.fromEntries(formData);


        if (formData.get("arrivalDate") || formData.get("pickupDate")) {


            const token = getAuthorizationToken();

            const response = await fetch("/api/importProcess/updateDates", {
                body: JSON.stringify(taskDates), "method": "PATCH", headers: {
                    "Authorization": `Bearer ${token}`, "Content-Type": "application/json"
                }
            });


            if (response.ok) {

                let taskResponse = await response.json();
                updateTask(taskResponse);


            }

        }

    }


    return (
        <>

            <Form onSubmit={handleSubmit}>
                <Row>
                    {!task.arrivalDate ?
                        <Col>
                            <FormGroup>
                                <label>Data de Chegada {task.arrivalDate}</label>
                                <Input name="arrivalDate" id="arrivalDate"

                                       type="date"
                                       data-date-format="dd MM yyyy"
                                />
                                <FormFeedback>
                                    <span><strong>Data Inválida</strong> - Data prevista para chegada Inválida</span>
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        : ""}
                    {!task.pickupDate ?

                        <Col> <FormGroup>
                            <label>Data de Levantamento {task.pickupDate}</label>
                            <Input name="pickupDate" id="pickupDate"

                                   type="date"
                                   data-date-format="dd MM yyyy"
                            />
                            <FormFeedback>
                                <span><strong>Data Inválida</strong> - Data prevista para chegada Inválida</span>
                            </FormFeedback>
                        </FormGroup></Col>
                        : ""}

                    {(!task.arrivalDate || !task.pickupDate) ?
                        <Col>


                            <div className="mt-3">
                                <Button className="btn btn-primary " color="default">
                                    Actualizar
                                </Button>
                            </div>
                        </Col> : ""}
                </Row>

            </Form>


        </>
    );
}