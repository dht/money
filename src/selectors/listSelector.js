import { createSelector } from "reselect";
import { linesSelector } from "./linesSelector";
import { currentWeekSelector } from "./appStateSelector";
import moment from "moment/moment";
import { weekToPeriod } from "../utils/dateAndMoney";
import {
    projectsCurrentIdSelector,
    projectsShowInWeekSelector
} from "./projectsSelector";

export const listByDateSelector = createSelector(linesSelector, lines => {
    const keys = Object.keys(lines);

    return keys
        .map(key => lines[key])
        .map(item => {
            item.week = moment(item.date).week();
            item.month = moment(item.date).month() + 1;
            item.period = weekToPeriod(item.week);
            item.order = item.order || Math.random() * 100;
            return item;
        })
        .sort(function(a, b) {
            if (a.order === b.order) return 0;

            return a.order > b.order ? 1 : -1;
        });
});

export const listSelector = createSelector(
    listByDateSelector,
    currentWeekSelector,
    projectsShowInWeekSelector,
    (lines, currentWeek, showInWeek) => {
        return lines
            .filter(item => item.week == currentWeek)
            .filter(item => !item.project || showInWeek);
    }
);

export const listProjectSelector = createSelector(
    listByDateSelector,
    projectsCurrentIdSelector,
    (lines, currentProject) => {
        return lines
            .filter(item => item.project == currentProject)
            .map(item => {
                item.order = item.orderProject || item.order;
                return item;
            })
            .sort(function(a, b) {
                if (a.order === b.order) return 0;

                return a.order > b.order ? 1 : -1;
            });
    }
);

export const listUntilTodaySelector = createSelector(
    listByDateSelector,
    lines => {
        return lines.filter(item => {
            return moment(item.date).isBefore();
        });
    }
);
