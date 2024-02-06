import {FilterSelector} from "../FilterSelector/FilterSelector.jsx";
import {useEffect, useState} from "react";
import {getOutages} from "../../utils/Requests.js";

export const OutageGroupSection = ({defaultValues, setValue}) => {
    const [outages, setOutages] = useState()
    useEffect(() => { loadOutages(setOutages) }, [])
    return (
        <div className='mb-4'>
            <p style={{marginTop: '20px'}}>Налаштування групи відключень світла</p>
            <FilterSelector title="Оберіть групу відключень" data={outages} zeroOptionTitle="Не показувати" selectedValue={defaultValues.outageGroup?.key} onChanged={(args) => setValue('outageGroup', {key: args.target.value, value: args.target.value})} />
        </div>
    );
};

const loadOutages = async (setOutages) => {
    const filtersResponse = await getOutages()
    if (filtersResponse.status !== 200) {
        return
    }
    const outages = filtersResponse.data.filters.sort((a, b) => a.value.localeCompare(b.value))
    setOutages(outages)
}