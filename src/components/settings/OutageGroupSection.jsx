import React, {useEffect, useState} from 'react';
import FilterSelector from "./ui/FilterSelector";
import {useCookies} from "react-cookie";
import RequestService from "../../utilities/RequestService";

const OutageGroupSection = () => {
    async function loadOutageGroups() {
        const outageData = await RequestService.getOutagesGroups()
        setFiltersData({outageGroups: outageData.outageGroups})
    }

    const [cookies, setCookie] = useCookies(['outageGroup']);
    const [filtersData, setFiltersData] = useState({outageGroups: []})

    useEffect(() => { loadOutageGroups() }, [])

    return (
        <>
            <p style={{marginTop: '20px'}}>Налаштування групи відключень світла</p>
            <FilterSelector title="Оберіть групу відключень"
                            data={filtersData.outageGroups}
                            selectedValue={cookies.outageGroup}
                            onChanged={(args) => setCookie('outageGroup', args.target.value)} />
        </>
    );
};

export default OutageGroupSection;