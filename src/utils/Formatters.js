export const getNextDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

export const getPreviousDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

export const shortDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`
}

export const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

export const getDayOfWeek = (date) => {
    const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота'];
    return daysOfWeek[date.getDay()];
}

export const getAccusativeDayOfWeek = (date) => {
    const daysOfWeek = ['неділю', 'понеділок', 'вівторок', 'середу', 'четвер', "п'ятницю", 'суботу'];
    return daysOfWeek[date.getDay()];
}

export const shortenName = (name) => {
    let abbr = name;
    if (!abbr?.length) {
        return abbr;
    }
    abbr = abbr.split(" ");
    if (abbr.length !== 3) {
        return name;
    }
    return `${abbr[0]} ${abbr[1][0]}.${abbr[2][0]}.`;
}