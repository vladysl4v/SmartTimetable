export default class DateTools {
    static toString(date) {
        return Intl.DateTimeFormat("uk-UA").format(date)
    }

    static addDays(date, amount) {
        let tempDate = new Date(date)
        tempDate.setDate(tempDate.getDate() + amount)
        return tempDate
    }

    static toShortISOString(date) {
        return date.toISOString().slice(0, 10)
    }

    static toLongISOString(date) {
        return date.toISOString().slice(0, 19)
    }
}
