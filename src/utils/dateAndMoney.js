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

    return to.format("D");
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
            return "CNY";
        case "he":
            return "ILS";
        case "en-gb":
            return "GBP";
        case "hi":
            return "INR";
        default:
            return "USD";
    }
};

export const getCurrencySign = locale => {
    switch (locale) {
        case "en":
            return "$";
        case "nl":
        case "es":
        case "fr":
        case "de":
        case "it":
            return "€";
        case "zn-cn":
            return "¥";
        case "he":
            return "₪";
        case "en-gb":
            return "£";
        case "hi":
            return "₹";
        default:
            return "$";
    }
};

export const money = (sum, locale) => {
    let output = sum.toLocaleString(locale, {
        style: "currency",
        currency: localeToCurrency(locale),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    switch (locale) {
        case "he":
            output = "₪" + output.replace(/[\s₪]+/gi, "");
            break;
        default:
            break;
    }

    return output;
};
