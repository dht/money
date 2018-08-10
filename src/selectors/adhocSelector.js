import { createSelector } from "reselect";

export const adhocSelector = state => state.adhoc;

export const currentIndexAdhocSelector = createSelector(
    adhocSelector,
    adhoc => adhoc.currentIndex || 0
);

export const adhocLinesSelector = createSelector(
    adhocSelector,
    adhoc => adhoc.lines || {}
);

export const adhocStartTimeSelector = createSelector(
    adhocSelector,
    adhoc => adhoc.startTime || {}
);
