import moment from "moment";
import * as api from "../../utils/firebase";
import * as actions from "./appState_actions";
import { listByDateSelector, listSelector } from "../../selectors/listSelector";
import {
    currentIndexSelector,
    currentWeekSelector,
    showListSelector,
    showPageSelector
} from "../../selectors/appStateSelector";
import { setShowList } from "./appState_actions";
import { setShowPage } from "./appState_actions";

export const addItem = item => {
    return dispatch => {
        api.addData(item).then(({ key, keyChangeLog }) => {
            item.id = key;
            dispatch(actions.addLine(key, item));
            dispatch(actions.addChangeLog(key, { ...item, id: keyChangeLog }));
        });
    };
};

export const updateItem = (id, data, immediate, noChangeLog) => {
    return dispatch => {
        if (immediate) {
            dispatch(actions.changeLine(id, data));
        }

        api.updateData(id, data, noChangeLog).then(response => {
            if (!immediate) {
                dispatch(actions.changeLine(id, data));
            }
            if (!noChangeLog) {
                const { keyChangeLog } = response;
                dispatch(
                    actions.addChangeLog(id, { ...data, id: keyChangeLog })
                );
            }
        });
    };
};

export const removeItem = id => {
    return dispatch => {
        api.removeData(id).then(() => {
            dispatch(actions.removeLine(id));
        });
    };
};

export const setCurrentIndex = index => {
    return (dispatch, getState) => {
        const state = getState(),
            lines = listSelector(state) || [],
            week = currentWeekSelector(state);

        index = Math.min(index, lines.length);
        index = Math.max(index, 0);

        dispatch(actions.setCurrentIndex(week, index));
        api.saveCurrentIndex(week, index);
    };
};

export const nudgeCurrentIndex = delta => {
    return (dispatch, getState) => {
        const state = getState();

        let currentIndex = currentIndexSelector(state) || 0;

        currentIndex += parseInt(delta, 10) || 0;

        dispatch(setCurrentIndex(currentIndex));
    };
};

export const duplicateItem = (item, weeks, occurrences) => {
    return dispatch => {
        let date = moment(item.date);

        for (let o = 1; o <= occurrences; o++) {
            const newItem = { ...item };
            delete item.id;
            delete item.changes;

            if (weeks === "4") {
                date.set("month", date.month() + 1);
            } else if (weeks === "8") {
                date.set("month", date.month() + 2);
            } else {
                date.add(weeks, "weeks");
            }

            newItem.date = date.format("YYYY-MM-DD");
            newItem.week = String(date.week());

            dispatch(addItem(newItem));
        }
    };
};

export const extra = () => {
    return (dispatch, getState) => {
        const list = listByDateSelector(getState());

        list.forEach(item => {
            const { id, title } = item,
                date = moment(item.date);

            console.log("date", date);

            if (!title) {
                dispatch(removeItem(id));
            }
        });
    };
};

export const reSort = () => {
    return (dispatch, getState) => {
        // dispatch(extra());
        // return;

        const list = listByDateSelector(getState());

        list.forEach((item, index) => {
            dispatch(updateItem(item.id, { order: index + 1 }, true));
        });
    };
};

export const toggleList = () => {
    return (dispatch, getState) => {
        let showList = showListSelector(getState());
        showList = !showList;
        dispatch(setShowList(showList));
        localStorage.setItem("showList", showList);
    };
};

export const togglePage = () => {
    return (dispatch, getState) => {
        let showPage = showPageSelector(getState());
        showPage = !showPage;
        dispatch(setShowPage(showPage));
        localStorage.setItem("showPage", showPage);
    };
};
