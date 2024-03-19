import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import Select from "react-select";

export default function CurrencySelect(props){

    const [currencies, setCurrencies] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/currencies",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const currencies = await response.json();

            setCurrencies(currencies);

        }
        loadData()
    }, []);

    return (<>

        <Select  defaultValue={{label: props.selected?.name, value: props.selected?.id}}  {...props} options={currencies.map(currency => {
            return {label: currency.symbol, value: currency.id}
        })}></Select>
    </>);
}