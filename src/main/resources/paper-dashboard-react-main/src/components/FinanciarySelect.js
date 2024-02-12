import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import Select from "react-select";

export default function FinanciarySelect(props){

    const [financiaries, setFinanciaries] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/financiers",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const listFinanciaries = await response.json();

            setFinanciaries(listFinanciaries);

        }
        loadData()
    }, []);

    return (<>

        <Select  defaultValue={{label: props.selected?.name, value: props.selected?.id}}  {...props} options={financiaries.map(financiary => {
            return {label: financiary.name, value: financiary.id}
        })}></Select>
    </>);
}