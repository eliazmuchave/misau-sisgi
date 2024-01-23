import {Form, json, redirect} from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col, FormFeedback,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import classes from "./Login.module.css";
import "assets/scss/paper-dashboard/cards/_card-login.scss";
import {getAuthorizationToken, setAuthorizationToken} from "../util/AccessTokenUtil";
export default function Login() {
  return (
    <div className={classes.container}>
      <Col md="4">
        <Card className="card-login">
          <CardHeader>
            <CardTitle>
              <h5>Login</h5>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form method="post">
              <FormGroup>
                <label htmlFor="email" className="control-label">
                  Email
                </label>
                <Input type="text" name="email" id="email" />

              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <Input type="password" name="password" id="password" />

              </FormGroup>

              <Row>
                <div className="update ml-auto mr-auto">
                  <Button className="btn" color="success" type="submit">
                    Entrar
                  </Button>
                </div>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );


}

export async function loginAction({params, request}) {
  const data = await request.formData();
  const dataEntries = Object.fromEntries(data);
  console.log(dataEntries);
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(dataEntries),
    headers: {"Content-Type": "application/json"}
  });

  if (!response.ok) {
    throw json({message: "Could not send the request"}, {status: 500});
  }
  const responseData = await response.json();

  setAuthorizationToken(responseData.token);
  console.log(getAuthorizationToken());

  return redirect("/admin");


}
