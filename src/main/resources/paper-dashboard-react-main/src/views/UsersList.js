import {Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {json, Link, useLoaderData} from "react-router-dom";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import UsersNav from "../layouts/UsersNav";

export default function UsersList() {

    const users = useLoaderData();


    return (<>
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <UsersNav></UsersNav>
                        <CardHeader>

                            <Row>
                                <Col md="10"><CardTitle tag="strong">Lista de Utilizadores</CardTitle></Col>

                            </Row>


                        </CardHeader>
                        <CardBody>
                            <Row>

                            </Row>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Email</th>
                                    <th>Primeiro Nome</th>
                                    <th>Outros Nomes</th>
                                    <th>Perfil</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map(user => (<tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.roles.map(role => (

                                        <Badge className="ml-2">{`${role.roleName}`}</Badge>
                                       ))}</td>
                                    <td><Link to={`${user.id}/edit`}>Editar</Link></td>
                                </tr>))}


                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>


    </>)

}

export async function usersLoader({request}) {

    const token = getAuthorizationToken();
    const response = await fetch("/api/users", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({message: "Could not load users"}, {status: 500})
    }


    return response;
}