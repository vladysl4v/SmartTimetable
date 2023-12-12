import {StudyGroupSection} from "../../components/StudyGroupSection/StudyGroupSection.jsx";
import {OutageGroupSection} from "../../components/OutageGroupSection/OutageGroupSection.jsx";
import ProfileSection from "../../components/ProfileSection/ProfileSection.jsx";
import {useEffect, useState} from "react";
import { getStudyGroups, getFilters } from "../../utils/Requests.js";
import {MainContainer} from "../../layout/MainContainer/MainContainer.jsx";
import {useMsal} from "@azure/msal-react";
import {useLocalStorage} from "../../hooks/useLocalStorage.js";

export const Settings = () => {
    const [filtersData, setFiltersData] = useState({faculties: [], courses: [], educForms: [], studyGroups: [], outageGroups: []})
    const { instance, inProgress } = useMsal();
    const  [localStorage, addToLocalStorage]  = useLocalStorage();
    useEffect(() => { loadAllFilters(localStorage, setFiltersData) }, [])
    useEffect(() => { refreshStudyGroups(localStorage, setFiltersData, filtersData) }, [localStorage])
    return (
            <MainContainer classList="row justify-content-center sections mb-1 gap-3 text-light">
                <h3 className="text-center">Налаштування</h3>
                <section className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                  <StudyGroupSection defaultValues={localStorage} setValue={addToLocalStorage} filtersData={filtersData} />
                  <hr/>
                  <OutageGroupSection defaultValues={localStorage} setValue={addToLocalStorage} filtersData={filtersData} />
                </section>
                <section className="col-xs-11 col-sm-11 col-md-5 col-lg-5 text-center">
                    <ProfileSection inProgress={inProgress} instance={instance} />
                </section>
            </MainContainer>
    )
}

const loadAllFilters = async (localStorage, setFilters) => {
    const filtersResponse = await getFilters()
    const groupsResponse = await getStudyGroups(localStorage.faculty, localStorage.course, localStorage.educForm)
    if (filtersResponse.status !== 200) {
        return
    }
    const filters = filtersResponse.data.filters
    filters.outageGroups = filters.outageGroups.sort((a, b) => a.value.localeCompare(b.value))
    filters.studyGroups = groupsResponse?.data.studyGroups

    setFilters(filters)
}

const refreshStudyGroups = async (localStorage, setFilters, filters) => {
    const groupsResponse = await getStudyGroups(localStorage.faculty, localStorage.course, localStorage.educForm)
    if (groupsResponse?.status === 200) {
        setFilters({...filters, studyGroups: groupsResponse.data.studyGroups})
    }
}