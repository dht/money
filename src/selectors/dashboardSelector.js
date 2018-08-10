import { createSelector } from "reselect";
import { listSelector, listUntilTodaySelector } from "./listSelector";
import {
    currentIndexSelector,
    currentModeSelector,
    isAdhocSelector
} from "./appStateSelector";
import { adhocListSelector } from "./adhocListSelector";
import { currentIndexAdhocSelector } from "./adhocSelector";

export const totalTodaySelector = createSelector(
    listUntilTodaySelector,
    lines => {
        return lines.reduce((output, item) => {
            output += parseInt(item.sum, 10) || 0;
            return output;
        }, 0);
    }
);

export const dashboardWeekSelector = createSelector(
    listSelector,
    currentIndexSelector,
    (list = [], currentIndex) => {
        return {
            currentItem: list[currentIndex],
            currentIndex
        };
    }
);

export const dashboardAdhocSelector = createSelector(
    adhocListSelector,
    currentIndexAdhocSelector,
    (list = [], currentIndex) => {
        return {
            currentItem: list[currentIndex],
            currentIndex
        };
    }
);

export const dashboardSelector = createSelector(
    dashboardWeekSelector,
    dashboardAdhocSelector,
    isAdhocSelector,
    (dashboard, dashboardAdhoc, isAdhoc) => {
        return isAdhoc ? dashboardAdhoc : dashboard;
    }
);
