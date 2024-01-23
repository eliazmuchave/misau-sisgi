import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {json, Link, useLoaderData} from "react-router-dom";
import {getAuthorizationToken} from "../util/AccessTokenUtil";

export default function UsersList() {

    const users = useLoaderData();


    return (<>
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">Utilizadores</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <nav>
                                    <Link to="new">Adicionar Nove Utilizador</Link>
                                </nav>
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
                                    <td >{user.roles.map(role => (<span key={role.id}>{`${role.roleName}| `} </span>))}</td>
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