import React, {useEffect, useState} from 'react';
import FilterSelector from "../FilterSelector/FilterSelector.jsx";
import {useCookies} from "react-cookie";
import Requests from "../../utilities/Requests.js";

const OutageGroupSection = () => {
    const [cookies, setCookie] = useCookies(['outageGroup']);
    const [filtersData, setFiltersData] = useState({outageGroups: []})

    useEffect(() => { loadOutageGroups(setFiltersData) }, [])

    return (
        <>
            <p style={{marginTop: '20px'}}>Налаштування групи відключень світла</p>
            <FilterSelector title="Оберіть групу відключень"
                            data={filtersData.outageGroups}
                            zeroOptionTitle="Не показувати"
                            selectedValue={cookies.outageGroup}
                            onChanged={(args) => setCookie('outageGroup', args.target.value)} />
        </>
    );
};

const loadOutageGroups = async (setFilters) => {
    const response = await Requests.getOutagesGroups()
    if (response.status === 200) {
        setFilters({outageGroups: response.data.outageGroups})
    }
}

export default OutageGroupSection;