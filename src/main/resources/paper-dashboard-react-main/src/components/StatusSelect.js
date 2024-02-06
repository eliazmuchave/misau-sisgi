import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import Select from "react-select";

export default function StatusSelect(props){

    const [status, setStatus] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/status",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const status = await response.json();

            setStatus(status);

        }
        loadData()
    }, []);

    return (<>

        <Select   defaultValue={status.map(item => {
            return {label: item.nameStatus, value: item.id}
        }).find(option => option.value === props.select?.id)}  {...props} options={status.map(item => {
            return {label: item.nameStatus, value: item.id}
        })}></Select>
    </>);
}