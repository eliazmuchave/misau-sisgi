import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import Select from "react-select";

export default function AgentSelect(props){

    const [agents, setAgents] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/forwardingAgents",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const listAgents = await response.json();

            setAgents(listAgents);

        }
        loadData()
    }, []);

    return (<>

        <Select  defaultValue={props.selected?.map(agent => { return {
            label: agent?.name, value: agent?.id
        }})}  {...props} options={agents.map(agent => {
            return {label: agent.name, value: agent.id}
        })}></Select>
    </>);
}