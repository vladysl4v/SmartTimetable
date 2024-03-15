import {useState} from "react";

export function useLocalStorage() {
    if (window.localStorage.getItem('preferences') == null)
    {
        window.localStorage.setItem('preferences', JSON.stringify(localStorageDefault))
    }
    const [localStorage, setLocalStorage] = useState(JSON.parse(window.localStorage.getItem('preferences')))

    const addToLocalStorage = (key, value) => {
        if (localStorage[key] === value) {
            return;
        }
        localStorage[key] = value;
        setLocalStorage({...localStorage})
        window.localStorage.setItem('preferences', JSON.stringify(localStorage))
    };
    
    return [localStorage, addToLocalStorage];
}

const localStorageDefault = {
    course: {key: "", value: ""},
    educForm: {key: "", value: ""},
    faculty: {key: "", value: ""},
    outageGroup: {key: "", value: ""},
    studyGroup: {key: "", value: ""},
    teacherChair: {key: "", value: ""},
    teacherFaculty: {key: "", value: ""},
    teacherId: {key: "", value: ""}
}