import moment from "moment";

export const getWeekNumber = (d = new Date()) => {
    return moment(d).week();
};

export const weekToPeriod = week =>
    Math.min(Math.ceil((parseInt(week, 10) || 0) / 5), 10);

export const getPeriodNumber = (d = new Date()) => {
    return weekToPeriod(getWeekNumber(d));
};

export const strToTime = str => {
    const parts = str.split(":"),
        now = new Date();

    now.setHours(parts[0]);
    now.setMinutes(parts[1]);

    return now;
};

export const nowToStr = () => {
    let now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${hours}:${minutes}`;
};

const parsePartial = (str, delimiter = "-") => {
    const parts = String(str).split(delimiter);

    if (parts.length === 2) {
        parts.push(moment().year());
        const d = moment(parts.reverse().join(delimiter));
        return d.isValid() ? d : null;
    }
};

export const parseDate = str => {
    let d =
        parsePartial(str, "-") ||
        parsePartial(str, "/") ||
        parsePartial(str, ".");

    if (!d.isValid()) {
        d = moment(str);
    }

    return d.format("YYYY-MM-DD");
};

const niceDate = date => {
    return date.format("L");
};

export const weekRange = week => {
    let from = moment()
            .week(week)
            .startOf("week"),
        to = moment()
            .week(week)
            .endOf("week");

    if (from.month() === to.month()) {
        return from.format("L") + " - " + to.format("L");
    } else {
        return from.format("L") + " - " + to.format("L");
    }
};

export const middleOfTheWeek = week => {
    let output = moment()
        .week(week)
        .startOf("week");

    output.add(3, "days");

    return output.format("YYYY-MM-DD");
};

export const periodRange = period => {
    const weekStart = 5 * (period - 1) + 1,
        weekEnd = 5 * period;

    let from = moment()
            .week(weekStart)
            .startOf("week"),
        to = moment()
            .week(weekEnd)
            .endOf(period === 10 ? "year" : "week");

    return niceDate(from) + " - " + niceDate(to);
};

export const monthRange = month => {
    let to = moment()
        .month(month - 1)
        .endOf("month");

    return " - " + to.format("D");
};

export const monthHeader = month => {
    return moment()
        .month(month - 1)
        .format("MMMM");
};

const localeToCurrency = locale => {
    switch (locale) {
        case "en":
            return "USD";
        case "nl":
        case "es":
        case "fr":
        case "de":
        case "it":
            return "EUR";
        case "zn-cn":
            return "CNX";
        case "he":
            return "NIS";
        case "en-gb":
            return "GBP";
        case "hi":
            return "INR";
        default:
            return "USD";
    }
};

export const money = (sum, locale) => {
    return sum.toLocaleString(locale, {
        style: "currency",
        currency: localeToCurrency(locale)
    });
};

export const currencySign = locale => {
    return money(0, locale);
};
