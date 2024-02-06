import {FilterSelector} from "../FilterSelector/FilterSelector.jsx";
import {useEffect, useState} from "react";
import { getTeacherChairs, getTeacherEmployees, getTeacherFaculties} from "../../utils/Requests.js";

export const TeacherFiltersSection = ({defaultValues, setValue}) => {
    const [filtersData, setFiltersData] = useState({faculties: [], chairs: [], employees: []})
    useEffect(() => { loadFilters(defaultValues, setFiltersData) }, [])
    useEffect(() => { refreshFilters(defaultValues, setFiltersData, filtersData) }, [defaultValues])
    return (
        <>
            <p>Налаштування розкладу викладача</p>
            <div className="row justify-content-center sections mb-1">
                <FilterSelector title="Оберіть факультет" data={filtersData.faculties} selectedValue={defaultValues.teacherFaculty?.key} onChanged={setFilterValue('teacherFaculty', setValue, filtersData.faculties)}/>
                <FilterSelector title="Оберіть кафедру" data={filtersData.chairs} selectedValue={defaultValues.teacherChair?.key} onChanged={setFilterValue('teacherChair', setValue, filtersData.chairs)}/>
                <FilterSelector title="Оберіть викладача" data={filtersData.employees} selectedValue={defaultValues.teacherId?.key} onChanged={setFilterValue('teacherId', setValue, filtersData.employees)}/>
            </div>
        </>
    );
};

const setFilterValue = (key, setValue, listToSearch) => {
    return (args) => setValue(key, (listToSearch.find(x => x.key === args.target.value)))
}

const loadFilters = async (localStorage, setFilters) => {
    const facultiesResponse = await getTeacherFaculties()
    const chairsResponse = await getTeacherChairs(localStorage.teacherFaculty?.key)
    const employeesResponse = await getTeacherEmployees(localStorage.teacherFaculty?.key, localStorage.teacherChair?.key)
    
    if (facultiesResponse.status !== 200) {
        return
    }
    const filters = {}
    filters.faculties = facultiesResponse.data.filters
    filters.chairs = chairsResponse?.data.filters
    filters.employees = employeesResponse?.data.filters

    setFilters(filters)
}

const refreshFilters = async (localStorage, setFilters, filters) => {
    const chairsResponse = await getTeacherChairs(localStorage.teacherFaculty?.key)
    const employeesResponse = await getTeacherEmployees(localStorage.teacherFaculty?.key, localStorage.teacherChair?.key)
    if (chairsResponse?.status === 200) {
        setFilters({...filters, chairs: chairsResponse.data.filters})
    }
    if (employeesResponse?.status === 200) {
        setFilters({...filters, employees: employeesResponse.data.filters})
    }
}