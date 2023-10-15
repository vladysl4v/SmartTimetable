import axios from "axios";

export default class Requests {
    static API_URL = 'https://localhost:4308/api'
    static async getPersonalSchedule(startDate, endDate, studyGroup, outageGroup, accessToken) {
        const requestUrl = `${this.API_URL}/schedule/me`
        const requestConfig = {
            params: {
                'startDate': startDate,
                'endDate': endDate,
                'studyGroup': studyGroup,
                'outageGroup': outageGroup
            },
            headers: {
                'Authorization': `BEARER ${accessToken}`
            }
        }
        return await axios.get(requestUrl, requestConfig)
    }

    static async getSchedule(startDate, endDate, studyGroup, outageGroup) {
        const requestUrl = `${this.API_URL}/schedule`
        const requestConfig = {
            params: {
                'startDate': startDate,
                'endDate': endDate,
                'studyGroup': studyGroup,
                'outageGroup': outageGroup
            }
        };
        return await axios.get(requestUrl, requestConfig)
    }

    static async getFilters() {
        const requestUrl = `${this.API_URL}/settings/filters`
        return await axios.get(requestUrl)
    }

    static async getOutagesGroups() {
        const requestUrl = `${this.API_URL}/settings/outageGroups`
        return await axios.get(requestUrl)
    }

    static async getStudyGroups(faculty, course, educationForm) {
        if (!faculty || !educationForm || !course) {
            return;
        }
        const requestUrl = `${this.API_URL}/settings/studyGroups`
        const requestConfig = {
            params: {
                'faculty': faculty,
                'course': course,
                'educationForm': educationForm
            }
        };
        return await axios.get(requestUrl, requestConfig)
    }

    static async postNote(lessonId, message, accessToken) {
        const requestUrl = `${this.API_URL}/notes`
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

    static async deleteNote(noteId, accessToken) {
        const requestUrl = `${this.API_URL}/notes/${noteId}`
        const requestConfig = {
            headers: {
                'Authorization': `BEARER ${accessToken}`
            }
        }
        return await axios.delete(requestUrl, requestConfig)
    }
}