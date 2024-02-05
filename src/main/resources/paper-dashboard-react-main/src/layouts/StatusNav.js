import {Button, Col, Nav, NavItem} from "reactstrap";
import {Link, NavLink} from "react-router-dom";

export default function StatusNav(){


    return(<>
        <Nav tabs >
            <NavItem>
                <NavLink className="btn ml-3 btn-link"  to="/admin/status"><i className="fa fa-table"></i> Estados</NavLink>
            </NavItem>

            <NavItem >
                <NavLink className="btn ml-3 btn-link" to="/admin/status/new"> <i className="fa fa-plus"></i> Novo Estado</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/statusFlow"><i className="fa fa-table"></i> Fluxos de Processos</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/statusFlow/new" ><i className="fa fa-plus"></i> Novo Fluxo</NavLink>
            </NavItem>

        </Nav>
    </>);
}