import {ActionTypes} from "./appState";

export const setMode = (value) => {

    return {
        type: ActionTypes.SET_MODE,
        value,
    }
}

export const setCurrentBoard = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_BOARD,
        value,
    }
}

export const setIsLoading = (value) => {

    return {
        type: ActionTypes.SET_IS_LOADING,
        value,
    }
}

export const setPlanningMode = (value) => {

    return {
        type: ActionTypes.SET_PLANNING_MODE,
        value,
    }
}

export const setLines = (value) => {

    return {
        type: ActionTypes.SET_LINES,
        value,
    }
}

export const setCurrentWeek = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_WEEK,
        value,
    }
}
export const setIsAdHoc = (value) => {

    return {
        type: ActionTypes.SET_IS_ADHOC,
        value,
    }
}

export const setShowList = (value) => {

    return {
        type: ActionTypes.SET_SHOW_LIST,
        value,
    }
}


export const setShowPage = (value) => {

    return {
        type: ActionTypes.SET_SHOW_PAGE,
        value,
    }
}

export const addLine = (id, value) => {

    return {
        type: ActionTypes.ADD_LINE,
        id,
        value,

    }
}
export const changeLine = (id, value) => {
    return {
        type: ActionTypes.CHANGE_LINE,
        id,
        value,
    }
}

export const removeLine = (id) => {

    return {
        type: ActionTypes.REMOVE_LINE,
        id,
    }
}

export const addChangeLog = (id, value) => {

    return {
        type: ActionTypes.ADD_CHANGE_LOG,
        id,
        value,
    }
}

export const setCurrentIndex = (week, value) => {

    return {
        type: ActionTypes.SET_CURRENT_INDEX,
        week,
        value,
    }
}
export const setCurrentIndexes = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_INDEXES,
        value,
    }
}

export const setCurrentPeriod = (value) => {

    return {
        type: ActionTypes.SET_CURRENT_PERIOD,
        value,
    }
}

export const setTimetravelDate = (value) => {

    return {
        type: ActionTypes.SET_TIMETRAVEL_DATE,
        value,
    }
}


