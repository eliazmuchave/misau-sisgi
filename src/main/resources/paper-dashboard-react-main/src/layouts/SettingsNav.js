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

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/financiers"><i className="fa fa-table"></i> Financiadores</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/financiers/new" ><i className="fa fa-plus"></i> Novo Financiador</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/beneficiaries"><i className="fa fa-table"></i> Beneficiários</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/beneficiaries/new" ><i className="fa fa-plus"></i> Novo Beneficiário</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/currencies"><i className="fa fa-table"></i> Moedas</NavLink>
            </NavItem>

            <NavItem>
                <NavLink className="btn ml-3 btn-link" to="/admin/currencies/new" ><i className="fa fa-plus"></i> Nova Moeda</NavLink>
            </NavItem>

        </Nav>
    </>);
}