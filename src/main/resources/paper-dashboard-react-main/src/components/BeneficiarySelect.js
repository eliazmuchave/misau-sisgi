import {useEffect, useState} from "react";
import {getAuthorizationToken} from "../util/AccessTokenUtil";
import Select from "react-select";

export default function BeneficiarySelect(props){

    const [beneficiaries, setBeneficiaries] = useState([]);
    const token = getAuthorizationToken();



    useEffect(() => {
        const loadData = async () => {
            const response = await fetch("/api/beneficiaries",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            const listBeneficiaries = await response.json();

            setBeneficiaries(listBeneficiaries);

        }
        loadData()
    }, []);

    return (<>

        <Select  defaultValue={props.selected?.map(beneficiary => { return {
            label: beneficiary?.name, value: beneficiary?.id
        }})}  {...props} options={beneficiaries.map(beneficiary => {
            return {label: beneficiary.name, value: beneficiary.id}
        })}></Select>
    </>);
}