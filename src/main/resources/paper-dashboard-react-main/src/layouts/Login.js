import { Form } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import classes from "./Login.module.css";
import "assets/scss/paper-dashboard/cards/_card-login.scss";
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
            <Form>
              <FormGroup>
                <label htmlFor="email" className="control-label">
                  Email
                </label>
                <Input type="text" name="email" id="email" />
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <Input type="text" />
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
