import React, {useEffect, useState} from 'react';
import FilterSelector from "../FilterSelector/FilterSelector.jsx";
import {useCookies} from "react-cookie";
import Requests from "../../utilities/Requests.js";

const StudyGroupSection = () => {
    const [cookies, setCookie] = useCookies(['faculty', 'educForm', 'course', 'studyGroup']);
    const [filtersData, setFiltersData] = useState({faculties: [], courses: [], educForms: [], studyGroups: []})

    useEffect(() => { loadAllFilters(cookies, setFiltersData) }, [])
    useEffect(() => { refreshStudyGroups(cookies, setFiltersData, filtersData) }, [cookies])
    return (
        <>
            <p>Налаштування навчальної групи</p>
            <div className="row justify-content-center sections mb-1">
                <FilterSelector title="Оберіть факультет" selectedValue={cookies.faculty} onChanged={(args) => setCookie('faculty', args.target.value)} data={filtersData.faculties}/>
                <FilterSelector title="Оберіть форму" selectedValue={cookies.educForm} onChanged={(args) => setCookie('educForm', args.target.value)} style={{width:'50%'}} data={filtersData.educForms}/>
                <FilterSelector title="Оберіть курс" selectedValue={cookies.course} onChanged={(args) => setCookie('course', args.target.value)} style={{width:'50%'}} data={filtersData.courses}/>
                <FilterSelector title="Оберіть навчальну групу" selectedValue={cookies.studyGroup} onChanged={(args) => setCookie('studyGroup', args.target.value)} data={filtersData.studyGroups}/>
            </div>
        </>
    );
};

const loadAllFilters = async (cookies, setFilters) => {
    const filtersResponse = await Requests.getFilters()
    const outagesResponse = await Requests.getOutagesGroups()
    const groupsResponse = await Requests.getStudyGroups(cookies.faculty, cookies.course, cookies.educForm)
    if (filtersResponse.status !== 200 || outagesResponse.status !== 200) {
        return
    }
    const filters = filtersResponse.data.filters
    filters.outageGroups = outagesResponse.data.outageGroups
    filters.studyGroups = groupsResponse?.data.studyGroups

    setFilters(filters)
}

const refreshStudyGroups = async (cookies, setFilters, filters) => {
    const groupsResponse = await Requests.getStudyGroups(cookies.faculty, cookies.course, cookies.educForm)
    if (groupsResponse?.status === 200) {
        setFilters({...filters, studyGroups: groupsResponse.data.studyGroups})
    }
}

export default StudyGroupSection;