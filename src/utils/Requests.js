import axios from "axios";
import {getFormattedDate} from "./DateUtilities.js";

const API_URL = 'https://smart-timetable-app-2e1b4711270e.herokuapp.com/api'

export const getPersonalSchedule = async (date, studyGroup, outageGroup, accessToken) => {
    const requestUrl = `${API_URL}/schedule/personal`
    const requestConfig = {
        params: {
            'date': getFormattedDate(date),
            'studyGroup': studyGroup,
            'outageGroup': outageGroup
        },
        headers: {
            'Authorization': `BEARER ${accessToken}`
        }
    }
    return await axios.get(requestUrl, requestConfig)
}

export const getSchedule = async (date, studyGroup, outageGroup) => {
    const requestUrl = `${API_URL}/schedule/guest`
    const requestConfig = {
        params: {
            'date': getFormattedDate(date),
            'studyGroup': studyGroup,
            'outageGroup': outageGroup
        }
    };
    return await axios.get(requestUrl, requestConfig)
}

export const getFilters = async () => {
    const requestUrl = `${API_URL}/settings/filters`
    return await axios.get(requestUrl)
}

export const getStudyGroups = async (faculty, course, educationForm) => {
    if (!faculty || !educationForm || !course) {
        return;
    }
    const requestUrl = `${API_URL}/settings/studyGroups`
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

export const deleteNote = async (noteId, accessToken) => {
    const requestUrl = `${API_URL}/notes/${noteId}`
    const requestConfig = {
        headers: {
            'Authorization': `BEARER ${accessToken}`
        }
    }
    return await axios.delete(requestUrl, requestConfig)
}