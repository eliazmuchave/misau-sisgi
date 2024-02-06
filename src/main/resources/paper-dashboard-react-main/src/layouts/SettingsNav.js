import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

export default function SettingsNav(){
    return(<>
        <Nav tabs >
            <NavItem>
                <NavLink className="btn ml-3 btn-link"  to="/admin/forwardingAgents"><i className="fa fa-table"></i> Despachantes</NavLink>
            </NavItem>

            <NavItem >
                <NavLink className="btn ml-3 btn-link" to="/admin/forwardingAgents/new"> <i className="fa fa-plus"></i> Novo Despachante</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/goods"><i className="fa fa-table"></i> Bens</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/goods/new" ><i className="fa fa-plus"></i> Novo Bem</NavLink>
            </NavItem>

        </Nav>
    </>);
}