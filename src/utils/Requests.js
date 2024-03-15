import axios from "axios";
import {getFormattedDate} from "./Formatters.js";
import {MsalScopes} from "../../msal.config.js";

const API_URL = 'https://smart-timetable-app-2e1b4711270e.herokuapp.com/api'

export const getStudentPersonalSchedule = async (date, studyGroup, outageGroup, accessToken) => {
    const requestUrl = `${API_URL}/students/my-schedules/${studyGroup}/${getFormattedDate(date)}`
    const requestConfig = {
        params: {
            'outageGroup': (!outageGroup?.length) ? null : outageGroup
        },
        headers: {
            'Authorization': `BEARER ${accessToken}`
        }
    }
    return await axios.get(requestUrl, requestConfig)
}

export const getTeacherPersonalSchedule = async (date, teacherId, outageGroup, accessToken) => {
    const requestUrl = `${API_URL}/teachers/my-schedules/${teacherId}/${getFormattedDate(date)}`
    const requestConfig = {
        params: {
            'outageGroup': (!outageGroup?.length) ? null : outageGroup
        },
        headers: {
            'Authorization': `BEARER ${accessToken}`
        }
    }
    return await axios.get(requestUrl, requestConfig)
}

export const getStudentGuestSchedule = async (date, studyGroup, outageGroup) => {
    const requestUrl = `${API_URL}/students/schedules/${studyGroup}/${getFormattedDate(date)}`
    const requestConfig = {
        params: {
            'outageGroup': (!outageGroup?.length || outageGroup === '0') ? null : outageGroup
        }
    };
    return await axios.get(requestUrl, requestConfig)
}

export const getTeacherGuestSchedule = async (date, teacherId, outageGroup) => {
    const requestUrl = `${API_URL}/teachers/schedules/${teacherId}/${getFormattedDate(date)}`
    const requestConfig = {
        params: {
            'outageGroup': (!outageGroup?.length || outageGroup === '0') ? null : outageGroup
        }
    };
    return await axios.get(requestUrl, requestConfig)
}

export const getStudentFilters = async () => {
    const requestUrl = `${API_URL}/students/filters`
    return await axios.get(requestUrl)
}

export const getTeacherFaculties = async () => {
    const requestUrl = `${API_URL}/teachers/faculties`
    return await axios.get(requestUrl)
}

export const getTeacherChairs = async (faculty) => {
    if (!faculty) {
        return;
    }
    const requestUrl = `${API_URL}/teachers/chairs`
    const requestConfig = {
        params: {
            'faculty': faculty
        }
    };
    return await axios.get(requestUrl, requestConfig)
}

export const getTeacherEmployees = async (faculty, chair) => {
    if (!faculty || !chair) {
        return;
    }
    const requestUrl = `${API_URL}/teachers/employees`
    const requestConfig = {
        params: {
            'faculty': faculty,
            'chair': chair
        }
    };
    return await axios.get(requestUrl, requestConfig)
}

export const getStudentStudyGroups = async (faculty, course, educationForm) => {
    if (!faculty || !educationForm || !course) {
        return;
    }
    const requestUrl = `${API_URL}/students/studyGroups`
    const requestConfig = {
        params: {
            'faculty': faculty,
            'course': course,
            'educationForm': educationForm
        }
    };
    return await axios.get(requestUrl, requestConfig)
}

export const postNote = async (lessonId, message, accessToken) => {
    const requestUrl = `${API_URL}/notes`
    const requestConfig = {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `BEARER ${accessToken}`
        }
    }
    return await axios.post(requestUrl,{
        "lessonId": lessonId,
        "message": message
    }, requestConfig)
}

export const getOutages = async () => {
    const requestUrl = `${API_URL}/settings/outageGroups/Kyiv`
    return await axios.get(requestUrl)
}

export const deleteNote = async (noteId, accessToken) => {
    const requestUrl = `${API_URL}/notes/${noteId}`
    const requestConfig = {
        headers: {
            'Authorization': `BEARER ${accessToken}`
        }
    }
    return await axios.delete(requestUrl, requestConfig)
}

export const getAccessToken = async (instance, activeAccount) => {
    const tokenRequest = {
        scopes: MsalScopes.scopes,
        account: activeAccount
    }
    let authentication;
    try {
        authentication = await instance.acquireTokenSilent(tokenRequest)
    } catch (ex) {
        console.warn(ex)
        authentication = await instance.acquireTokenPopup(tokenRequest)
    }

    return authentication?.accessToken
}