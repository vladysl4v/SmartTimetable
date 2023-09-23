import axios from "axios";
import DateTools from "./DateTools";

export default class RequestService {
    static async getSchedule(date) {
        try {
            const response = await axios.get(`https://localhost:4308/api/schedules/${DateTools.toString(date)}`)
            if (response.status !== 200) {
                return undefined;
            }
            return response.data
        } catch (ex) {
            console.log(ex)
        }
    }

}