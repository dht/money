import * as api from "../../utils/firebase";
import * as actions from "./adhoc_actions";
import {currentIndexAdhocSelector} from "../../selectors/adhocSelector";
import {adhocListSelector} from "../../selectors/adhocListSelector";
import {guid8} from "../../utils/guid";
import {adHocAutoCompleteSelector} from "../../selectors/adhocAutoCompleteSelector";

export const addItem = (item) => {

    return (dispatch) => {
        api.addAdhoc(item)
            .then(({key}) => {
                item.id = key;
                dispatch(actions.addLine(key, item));
                dispatch(addAutoComplete(item.title));
            })
    }
}

export const updateItem = (id, data, immediate) => {

    return (dispatch) => {
        if (immediate) {
            dispatch(actions.changeLine(id, data))
        }

        api.updateAdhoc(id, data)
            .then(() => {
                if (!immediate) {
                    dispatch(actions.changeLine(id, data))
                }
            })
    }
}

export const removeItem = (id) => {

    return (dispatch) => {
        api.removeAdhoc(id)
            .then(() => {
                dispatch(actions.removeLine(id))
            })
    }
}

export const setStartTime = (time) => {

    return (dispatch) => {
        dispatch(actions.setStartTime(time))
        api.setAdhocStartTime(time);
    }
}

export const setCurrentIndex = (currentIndex) => {

    return (dispatch, getState) => {
        let state = getState(),
            lines = adhocListSelector(state) || [];

        currentIndex  = Math.min(currentIndex, lines.length);
        currentIndex  = Math.max(currentIndex, 0);

        dispatch(actions.setCurrentIndex(currentIndex))
        api.setAdhocCurrentIndex(currentIndex);
    }
}

export const nudgeCurrentIndexAdhoc = (delta) => {

    return (dispatch, getState) => {

        let state = getState(),
            currentIndex = currentIndexAdhocSelector(state) || 0;

        currentIndex += parseInt(delta, 10) || 0;
        dispatch(setCurrentIndex(currentIndex))
    }
}

export const addAutoComplete = (title = '') => {

    return (dispatch, getState) => {
        let state = getState(),
            autocomplete = adHocAutoCompleteSelector(state) || [];

        autocomplete = autocomplete.map(item => item.title);

        title = title.trim();

        const index = autocomplete.indexOf(title);

        if (!title || index >= 0) return;

        api.addAdhocAutoComplete({title})
        dispatch(actions.addAutoComplete(guid8(), {title}))
    }
}


export const removeAutoComplete = (title) => {

    return (dispatch, getState) => {
        let state = getState(),
            autocomplete = adHocAutoCompleteSelector(state) || [];

        const arr = autocomplete.filter(item => item.title === title);

        if (!arr || arr.length === 0 || !arr[0].id)
            return;

        const id = arr[0].id;
        api.removeAdhocAutoComplete(id)
        dispatch(actions.removeAutoComplete(id));
    }
}

export const clearAdhoc = (title) => {

    return (dispatch) => {
        api.clearAdhoc({title})
        dispatch(actions.setLines({}))
    }
}

