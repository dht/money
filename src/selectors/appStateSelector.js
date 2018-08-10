import { createSelector } from "reselect";
import { getPathParams } from "../utils/params";

export const appStateSelector = state => state.appState;

export const currentIndexesSelector = createSelector(
    appStateSelector,
    appState => appState.currentIndexes
);

export const currentBoardSelector = createSelector(
    appStateSelector,
    appState => appState.currentBoard
);

export const currentWeekSelector = createSelector(
    appStateSelector,
    appState => {
        return parseInt(appState.currentWeek, 10);
    }
);

export const currentPeriodSelector = createSelector(
    appStateSelector,
    appState => parseInt(appState.currentPeriod, 10)
);

export const timetravelDateSelector = createSelector(
    appStateSelector,
    appState => appState.timetravelDate
);

export const isLoadingSelector = createSelector(
    appStateSelector,
    appState => appState.isLoading
);

export const showListSelector = createSelector(
    appStateSelector,
    appState => appState.showList
);

export const showPageSelector = createSelector(
    appStateSelector,
    appState => appState.showPage
);

export const currentModeSelector = createSelector(
    appStateSelector,
    appState => appState.mode
);

export const isAdhocSelector = createSelector(
    appStateSelector,
    appState => appState.isAdhoc
);

export const planningModeSelector = createSelector(
    appStateSelector,
    appState => appState.planningMode
);

export const currentIndexSelector = createSelector(
    currentIndexesSelector,
    currentWeekSelector,
    (currentIndexes = {}, week) => {
        return currentIndexes[week] || 0;
    }
);
export const currentParamsSelector = createSelector(
    currentBoardSelector,
    currentWeekSelector,
    currentModeSelector,
    (boardId, week, mode) => {
        const path = getPathParams();
        return { boardId, week, mode, path };
    }
);
