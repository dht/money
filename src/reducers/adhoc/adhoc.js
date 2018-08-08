import {guid8} from "../../utils/guid";

export const initialState = {
    lines: {},
    startTime: '6:40',
    currentIndex: 0,
    autoComplete: {}
};

export const ActionTypes = {
    ADHOC_SET_LINES: 'ADHOC_SET_LINES',
    ADHOC_ADD_LINE: 'ADHOC_ADD_LINE',
    ADHOC_CHANGE_LINE: 'ADHOC_CHANGE_LINE',
    ADHOC_REMOVE_LINE: 'ADHOC_REMOVE_LINE',
    SET_START_TIME: 'SET_START_TIME',
    SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
    SET_AUTOCOMPLETE: 'SET_AUTOCOMPLETE',
    ADD_AUTOCOMPLETE: 'ADD_AUTOCOMPLETE',
    REMOVE_AUTOCOMPLETE: 'REMOVE_AUTOCOMPLETE',
};

const line = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADHOC_ADD_LINE:
            return action.value;

        case ActionTypes.ADHOC_CHANGE_LINE:
            return {
                ...state,
                ...action.value
            };

        default:
            return state
    }
}

const lines = (state, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.ADHOC_ADD_LINE:
        case ActionTypes.ADHOC_CHANGE_LINE:
            return {
                ...state,
                [action.id]: line(state[action.id], action)
            }

        case ActionTypes.ADHOC_REMOVE_LINE:
            newState = {...state};
            delete newState[action.id];
            return newState;


        default:
            return state
    }
}
const autoComplete = (state, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.SET_AUTOCOMPLETE:
            return action.value;

        case ActionTypes.ADD_AUTOCOMPLETE:
            return {
                ...state,
                [action.id]: action.value
            };

        case ActionTypes.REMOVE_AUTOCOMPLETE:
            newState = {...state};
            delete newState[action.id];
            return newState

        default:
            return state
    }
}

const adhoc = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.ADHOC_SET_LINES:
            return {
                ...state,
                lines: action.value
            };

        case ActionTypes.SET_START_TIME:
            return {
                ...state,
                startTime: action.value
            };

        case ActionTypes.SET_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.value
            };

        case ActionTypes.ADHOC_ADD_LINE:
        case ActionTypes.ADHOC_CHANGE_LINE:
        case ActionTypes.ADHOC_REMOVE_LINE:
            return {
                ...state,
                lines: lines(state.lines, action)
            };

        case ActionTypes.SET_AUTOCOMPLETE:
        case ActionTypes.ADD_AUTOCOMPLETE:
        case ActionTypes.REMOVE_AUTOCOMPLETE:
            return {
                ...state,
                autoComplete: autoComplete(state.autoComplete, action)
            };

        default:
            return state
    }

}

export default adhoc;

