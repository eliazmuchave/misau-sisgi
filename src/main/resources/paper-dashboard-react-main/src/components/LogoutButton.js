import {Link, redirect, useNavigate} from "react-router-dom";
import React from "react";
import {removeAuthorizationToken, removeUsername} from "../util/AccessTokenUtil";

export default function LogoutButton(){

    const navigate = useNavigate();
    const handleLogout = () => {
        removeUsername();
        removeAuthorizationToken()
        return navigate("/login");
    }
    return (
        <>

            <Link  className="nav-link btn-rotate" onClick={handleLogout}>
                <i className="nc-icon nc-button-power" />

            </Link>
        </>
    );
}