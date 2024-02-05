import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

export default function UsersNav(){
    return(<>
        <Nav>
            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/users"><i
                    className="fa fa-table"></i> Utilizadores</NavLink> </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/users/new"><i className="fa fa-plus"></i> Novo
                    Utilizador</NavLink>
            </NavItem>
        </Nav>
    </>);
}