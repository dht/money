import * as api from "../../utils/firebase";
import * as actions from "./projects_actions";
import * as appState_thunks from "../appState/appState_thunks";
import {listProjectSelector} from "../../selectors/listSelector";
import {middleOfTheWeek} from "../../utils/date";
import {projectsShowInWeekSelector} from "../../selectors/projectsSelector";
import {getStorageKey} from "../../utils/storage";

export const addItem = (item) => {

    return (dispatch) => {
        api.addProject(item)
            .then(({key}) => {
                item.id = key;
                dispatch(actions.addProject(key, item));
            })
    }
}

export const updateItem = (id, data, immediate) => {

    return (dispatch) => {
        if (immediate) {
            dispatch(actions.updateProject(id, data))
        }

        api.updateProject(id, data)
            .then(() => {
                if (!immediate) {
                    dispatch(actions.updateProject(id, data))
                }
            })
    }
}

export const removeItem = (id) => {

    return (dispatch) => {
        api.removeProject(id)
            .then(() => {
                dispatch(actions.removeProject(id))
            })
    }
}

export const multiPostpone = (id, fromWeek, toWeek) => {

    return (dispatch, getState) => {
        const state = getState(),
            lines = listProjectSelector(state),
            delta = toWeek - fromWeek;

        if (delta === 0) return;

        let change = false;

        lines.forEach((line) => {
            if (line.id === id) {
                change = true;
            }

            if (change) {
                let week = line.week + delta,
                    date = middleOfTheWeek(week);

                dispatch(appState_thunks.updateItem(line.id, {week, date}, true, true))
            }
        })
    }
}

export const toggleShowInWeek = () => {

    return (dispatch, getState) => {

        let state = getState(),
            showInWeek = projectsShowInWeekSelector(state);

        showInWeek = !showInWeek;

        dispatch(actions.setShowInWeek(showInWeek));
        localStorage.setItem('showInWeek', showInWeek);
    }
}
