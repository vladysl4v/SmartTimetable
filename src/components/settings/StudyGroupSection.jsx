import React, {useEffect, useState} from 'react';
import FilterSelector from "./ui/FilterSelector";
import RequestService from "../../utilities/RequestService";
import {useCookies} from "react-cookie";

const StudyGroupSection = () => {
    async function loadFilters() {
        const filters = (await RequestService.getSettingsFilters())?.filters
        filters.outageGroups = (await RequestService.getOutagesGroups())?.outageGroups
        filters.studyGroups = (await loadStudyGroups())?.studyGroups
        setFiltersData(filters)
    }
    async function loadStudyGroups() {
        if (cookies.course && cookies.faculty && cookies.educForm)
        {
            return await RequestService.getStudyGroups(cookies.faculty, cookies.course, cookies.educForm)
        }
    }
    async function SetStudyGroups() {
        const data = await loadStudyGroups();
        setFiltersData({...filtersData, studyGroups: data?.studyGroups})
    }

    const [cookies, setCookie] = useCookies(['faculty', 'educForm', 'course', 'studyGroup']);
    const [filtersData, setFiltersData] = useState({faculties: [], courses: [], educForms: [], studyGroups: []})

    useEffect(() => { loadFilters() }, [])
    useEffect(() => { SetStudyGroups() }, [cookies])
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

export default StudyGroupSection;