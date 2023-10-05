import axios from "axios";
import DateTools from "./DateTools";

export default class RequestService {
    static API_URL = 'https://localhost:4308/api'
    static async getPersonalSchedule(date, studyGroup, outageGroup, accessToken) {
        const dates = DateTools.toLongISOString(date)
        const config = {
            params: {
                'startDate': dates,
                'endDate': dates,
                'studyGroup': studyGroup,
                'outageGroup': outageGroup ?? null
            },
            headers: {
                'Authorization': `BEARER ${accessToken}`
            }
        }
        try {
            const requestUrl = `${this.API_URL}/me/schedule`
            const response = await axios.get(requestUrl, config)
            if (response.status !== 200) {
                console.error(response.statusText)
                return;
            }
            return response.data
        } catch (ex) {
            console.error(ex)
        }
    }

    static async getAnonymousSchedule(date, studyGroup, outageGroup) {
        const dates = DateTools.toLongISOString(date)
        const config = {
            params: {
                'startDate': dates,
                'endDate': dates,
                'studyGroup': studyGroup,
                'outageGroup': outageGroup ?? null
            }
        };
        try {
            const requestUrl = `${this.API_URL}/anonymous/schedule`
            const response = await axios.get(requestUrl, config)
            if (response.status !== 200) {
                console.error(response.statusText)
                return;
            }
            return response.data
        } catch (ex) {
            console.error(ex)
        }
    }

    static async getSettingsFilters() {
        try {
            const requestUrl = `${this.API_URL}/settings/filters`
            const response = await axios.get(requestUrl)
            if (response.status !== 200) {
                console.error(response.statusText)
                return;
            }
            return response.data
        } catch (ex) {
            console.error(ex)
        }
    }

    static async getStudyGroups(faculty, course, educForm) {
        const config = {
            params: {
                'faculty': faculty,
                'course': course,
                'educationForm': educForm
            }
        };
        try {
            const requestUrl = `${this.API_URL}/settings/studyGroups`
            const response = await axios.get(requestUrl, config)
            if (response.status !== 200) {
                console.error(response.statusText)
                return;
            }
            return response.data
        } catch (ex) {
            console.error(ex)
        }
    }

    static async addNote(accessToken) {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `BEARER ${accessToken}`
            }
        }

        const response = await axios.post(`${this.API_URL}/notes`,{
            "message": "Actually new message",
            "lessonDiscipline": "Українська мова",
            "lessonType": "Лекція",
            "groupId": "GIK4FJDF3IFJ",
            "lessonDate": "2023-09-27T09:34:23.079Z"
        }, config)
        console.log('_________________')
        console.log(response.status)
        console.log(response.data)
    }
    static async getOutagesGroups() {
        try {
            const requestUrl = `${this.API_URL}/settings/outageGroups`
            const response = await axios.get(requestUrl)
            if (response.status !== 200) {
                console.error(response.statusText)
                return;
            }
            return response.data
        } catch (ex) {
            console.error(ex)
        }
    }
}