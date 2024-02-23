import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

export default function TaskNav() {
    return (
        <>
            <Nav>


                <NavItem>
                    <NavLink className="btn ml-3 btn-link" to="/admin/importProcess"><i className="fa fa-table"></i> Processos</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="btn ml-3 btn-link" to="/admin/importProcess/new" ><i className="fa fa-plus"></i> Novo Processo</NavLink>
                </NavItem>
            </Nav>
        </>
    );
}