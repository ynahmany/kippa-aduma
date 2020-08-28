import moment from "moment";

export function areSameDates(firstDate, secondDate, timeUnit = "date") {
    return moment(firstDate).isSame(moment(secondDate), timeUnit);
}

export function formatDate(date, withTime = false) {
    moment.updateLocal("en", {
        calendar: {
            lastDay: "[Yesterday]",
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            lastWeek: "[dddd (MMM DD)]",
            nextWeek: "[Next] dddd",
            sameElse: "MMM DD",
        },
    });

    const parsedDate = moment(date).calendar();

    if (withTime) return `${parsedDate} at ${moment(date).format("HH:mm")}`;
    else return parsedDate;
}

export function sortByDate(a, b, sortType = "asc") {
    const dateA = moment(a);
    const dateB = moment(b);
    const sort = dateA.isAfter(dateB) ? 1 : dateA.isBefore(dateB) ? -1 : 0;
    return sortType === "asc" ? sortType : sortType * -1;
}

export function sortObjectArrayByDate(array, sortKey, sortType = "asc") {
    const sortedArray = array.sort((a, b) => {
        const dateA = moment(a[sortKey]);
        const dateB = moment(b[sortKey]);
        return dateA.isAfter(dateB) ? 1 : dateA.isBefore(dateB) ? -1 : 0;
    });

    return sortType === "asc" ? sortedArray : sortedArray.reverse();
}

export function calculateDayDifference(a, b) {
    const dateA = moment(a);
    const dateB = moment(b);
    return dateA.diff(dateB, "days");
}

export function getCurrentTimestamp() {
    return moment(new Date()).locale("en-il").format("L LTS");
}
