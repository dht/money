import { createSelector } from "reselect";
import { linesSelector } from "./linesSelector";
import moment from "moment";

const nowWeek = moment().week();

export const tableSelector = createSelector(linesSelector, items => {
    const keys = Object.keys(items);

    let total = 0;

    return keys
        .map(key => items[key])
        .sort(function(a, b) {
            if (a.date === b.date) return 0;

            return a.date > b.date ? 1 : -1;
        })
        .map(item => {
            item.sum = parseInt(item.sum);
            item.week = moment(item.date).week();

            total += item.sum;
            item.total = total;

            return item;
        })
        .filter(item => item.week >= nowWeek);
});
