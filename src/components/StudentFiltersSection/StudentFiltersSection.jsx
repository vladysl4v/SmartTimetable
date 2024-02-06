import {FilterSelector} from "../FilterSelector/FilterSelector.jsx";
import {useEffect, useState} from "react";
import {getStudentFilters, getStudentStudyGroups} from "../../utils/Requests.js";

export const StudentFiltersSection = ({defaultValues, setValue}) => {
    const [filtersData, setFiltersData] = useState({faculties: [], courses: [], educForms: [], studyGroups: []})
    useEffect(() => { loadFilters(defaultValues, setFiltersData) }, [])
    useEffect(() => { refreshStudyGroups(defaultValues, setFiltersData, filtersData) }, [defaultValues])
    return (
        <>
            <p>Налаштування навчальної групи студента</p>
            <div className="row justify-content-center sections mb-1">
                <FilterSelector title="Оберіть факультет" data={filtersData.faculties} selectedValue={defaultValues.faculty?.key} onChanged={setFilterValue('faculty', setValue, filtersData.faculties)}/>
                <FilterSelector title="Оберіть форму" data={filtersData.educForms} selectedValue={defaultValues.educForm?.key} onChanged={setFilterValue('educForm', setValue, filtersData.educForms)} style={{width:'50%'}}/>
                <FilterSelector title="Оберіть курс" data={filtersData.courses} selectedValue={defaultValues.course?.key} onChanged={setFilterValue('course', setValue, filtersData.courses)} style={{width:'50%'}}/>
                <FilterSelector title="Оберіть навчальну групу" data={filtersData.studyGroups} selectedValue={defaultValues.studyGroup?.key} onChanged={setFilterValue('studyGroup', setValue, filtersData.studyGroups)}/>
            </div>
        </>
    );
};

const setFilterValue = (key, setValue, listToSearch) => {
    return (args) => setValue(key, (listToSearch.find(x => x?.key === args.target.value)))
}

const loadFilters = async (localStorage, setFilters) => {
    const filtersResponse = await getStudentFilters()
    const groupsResponse = await getStudentStudyGroups(localStorage.faculty?.key, localStorage.course?.key, localStorage.educForm?.key)
    if (filtersResponse.status !== 200) {
        return
    }
    const filters = filtersResponse.data.filters
    filters.studyGroups = groupsResponse?.data.filters

    setFilters(filters)
}

const refreshStudyGroups = async (localStorage, setFilters, filters) => {
    const groupsResponse = await getStudentStudyGroups(localStorage.faculty?.key, localStorage.course?.key, localStorage.educForm?.key)
    if (groupsResponse?.status === 200) {
        setFilters({...filters, studyGroups: groupsResponse.data.filters})
    }
}