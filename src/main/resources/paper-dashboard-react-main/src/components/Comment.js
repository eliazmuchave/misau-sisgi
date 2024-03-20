import {Badge, Card, CardBody, CardHeader, Col, FormFeedback, FormGroup, Input, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {getAuthenticatedUserName, getAuthorizationToken} from "../util/AccessTokenUtil";
import {Form} from "react-router-dom";
import {format} from "date-fns";

export default function Comment({task}) {

    const url = `/api/comments/importProcess/${task.id}`;

    const token = getAuthorizationToken();
    const user = getAuthenticatedUserName();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();

    useEffect(() => {
        const loadData = async () => {
            const response = await fetch(url,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const responseComments = await response.json();

            setComments(responseComments);

        }
        loadData()
    }, [newComment]);

    async function submitHandler(event) {

        event.preventDefault();
        const formData = new FormData(event.target);
        const comment = Object.fromEntries(formData);


        const response = await fetch(url, {
            body: JSON.stringify(comment), "method": "POST", headers: {
                "Authorization": `Bearer ${token}`, "Content-Type": "application/json"
            }
        });

        event.target.reset();

        if (response.ok) {
            let responseComment = await response.json();
            setNewComment(responseComment);

        }

    }

    return (
        <>
            <Card style={{fontSize: 13}}>
                <CardHeader tag="strong">
                    Comentários
                </CardHeader>
                <CardBody>


                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col className="" md="10">
                                <FormGroup>

                                    <Input name="text" id="text" type="text"/>
                                    <Input type="hidden" name="user" id="user" value={user}/>

                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <div style={{marginTop: -9}}>
                                    <button type="submit"
                                            className="btn  btn-dark ml-3"><i className="fa fa-paper-plane"
                                                                              aria-hidden="true"></i>
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Form>

                    {
                        comments.map(comment => (
                            <li key={comment.id} style={{listStyleType: "none"}}>


                                <Row className="mt-3" key={comment.id}>
                                    <Col md="12">
                                        <div style={{display: "flex"}} className="mb-2">
                                        <Badge color="dark" pill className="mr-4">{comment.user}</Badge>
                                            {format(new Date(comment.created), 'dd/MM/yyyy HH:mm')}

                                </div>
                                    </Col>
                                    <Col md="12">
                                        <label>{comment.text} </label>
                                    </Col>
                                </Row>
                            </li>


                        ))
                    }


                </CardBody>
            </Card>
        </>
    );

}