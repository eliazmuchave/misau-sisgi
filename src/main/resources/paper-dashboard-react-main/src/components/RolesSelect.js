import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import Select from "react-select";

export default function RolesSelect(props){

    const [roles, setRoles] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/roles",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const listRoles = await response.json();

            setRoles(listRoles);

        }
        loadData()
    }, []);

    return (<>

        <Select   value={props.select?.map(role => { return {
            label: role?.roleName, value: role?.id
        }})}  {...props} options={roles.map(item => {
            return {label: item.roleName, value: item.id}
        })}></Select>
    </>);
}