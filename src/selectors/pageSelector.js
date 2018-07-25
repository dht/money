import {createSelector} from 'reselect'
import {currentIndexSelector, isAdhocSelector} from "./appStateSelector";
import {listSelector} from "./listSelector";
import {currentIndexAdhocSelector} from "./adhocSelector";
import {adhocListSelector} from "./adhocListSelector";


export const pageWeekSelector = createSelector(
    currentIndexSelector,
    listSelector,
    (currentIndex = 0, list = []) => {

        if (list.length === 0) {
            return '-';
        }

       return `${currentIndex + 1}/${list.length}`;
    }
)
export const pageAdhocSelector = createSelector(
    currentIndexAdhocSelector,
    adhocListSelector,
    (currentIndex = 0, list = []) => {

        if (list.length === 0) {
            return '-';
        }

       return `${currentIndex + 1}/${list.length}`;
    }
)

export const pageSelector = createSelector(
    isAdhocSelector,
    pageWeekSelector,
    pageAdhocSelector,
    (isAdhoc, week, adhoc) => {

        return isAdhoc ? adhoc : week;
    }
)
