import {Link, useLoaderData} from "react-router-dom";

export default function UserList(){

    const data = useLoaderData();

    return(
        <>
        <h2> Utilizadores</h2>
          <table>
            <thead>
            <tr>
                <th>Email</th>
                <th>Nome</th>
                <th></th>
            </tr>
            </thead>
              <tbody>
              {data.map(user =>  (<tr key={user.id}><td>{user.email}</td><td>{user.firstName}  {user.lastName} </td> <td><Link to="">Editar</Link></td></tr>))}
              </tbody>
          </table>
        </>
    )
}