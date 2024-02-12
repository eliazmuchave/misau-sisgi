import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import Select from "react-select";

export default function GoodsSelect(props){

    const [goods, setGoods] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/goods",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const listGoods = await response.json();

            setGoods(listGoods);

        }
        loadData()
    }, []);

    return (<>

        <Select  defaultValue={  {
            label: props.selected?.name, value: props.selected?.id
        }}  {...props} options={goods.map(good => {
            return {label: good.name, value: good.id}
        })}></Select>
    </>);
}