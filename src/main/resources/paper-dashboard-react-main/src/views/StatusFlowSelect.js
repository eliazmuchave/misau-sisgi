import Select from "react-select";
import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import {json} from "react-router-dom";

export default function StatusFlowSelect(props) {


    const [statusFlow, setStatusFlow] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/statusFlow",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const flows = await response.json();

            setStatusFlow(flows);

        }
        loadData()
    }, []);

    return (<>

        <Select  value={statusFlow.map(item => {
            return {label: item.name, value: item.id}
        }).find(option => option.value === props.select?.id)}  {...props} options={statusFlow.map(item => {
            return {label: item.name, value: item.id}
        })}></Select>
    </>);
}