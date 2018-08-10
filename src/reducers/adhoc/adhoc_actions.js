import { ActionTypes } from "./adhoc";

export const setLines = value => {
    return {
        type: ActionTypes.ADHOC_SET_LINES,
        value
    };
};

export const addLine = (id, value) => {
    return {
        type: ActionTypes.ADHOC_ADD_LINE,
        id,
        value
    };
};
export const changeLine = (id, value) => {
    return {
        type: ActionTypes.ADHOC_CHANGE_LINE,
        id,
        value
    };
};

export const removeLine = id => {
    return {
        type: ActionTypes.ADHOC_REMOVE_LINE,
        id
    };
};

export const setStartTime = value => {
    return {
        type: ActionTypes.SET_START_TIME,
        value
    };
};

export const setCurrentIndex = value => {
    return {
        type: ActionTypes.SET_CURRENT_INDEX,
        value
    };
};

export const setAutoComplete = value => {
    return {
        type: ActionTypes.SET_AUTOCOMPLETE,
        value
    };
};

export const addAutoComplete = (id, value) => {
    return {
        type: ActionTypes.ADD_AUTOCOMPLETE,
        id,
        value
    };
};

export const removeAutoComplete = id => {
    return {
        type: ActionTypes.REMOVE_AUTOCOMPLETE,
        id
    };
};
