import { getStorageKey } from "../../utils/storage";

export const initialState = {
    currentProjectId: null,
    showInWeek: getStorageKey("showInWeek", true),
    items: {
        1: {
            id: 1,
            title: "project",
            visible: true
        }
    }
};

export const ActionTypes = {
    SET_PROJECTS: "SET_PROJECTS",
    ADD_PROJECT: "ADD_PROJECT",
    REMOVE_PROJECT: "REMOVE_PROJECT",
    UPDATE_PROJECT: "UPDATE_PROJECT",
    SET_CURRENT_PROJECT: "SET_CURRENT_PROJECT",
    SET_SHOW_IN_WEEK: "SET_SHOW_IN_WEEK"
};

const project = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROJECT:
            return action.value;

        case ActionTypes.UPDATE_PROJECT:
            return {
                ...state,
                ...action.value
            };

        default:
            return state;
    }
};

const items = (state, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.SET_PROJECTS:
            return action.value;

        case ActionTypes.ADD_PROJECT:
        case ActionTypes.UPDATE_PROJECT:
            return {
                ...state,
                [action.id]: project(state[action.id], action)
            };
        case ActionTypes.REMOVE_PROJECT:
            newState = { ...state };
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_PROJECTS:
        case ActionTypes.ADD_PROJECT:
        case ActionTypes.UPDATE_PROJECT:
        case ActionTypes.REMOVE_PROJECT:
            return {
                ...state,
                items: items(state.items, action)
            };

        case ActionTypes.SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProjectId: action.value
            };

        case ActionTypes.SET_SHOW_IN_WEEK:
            return {
                ...state,
                showInWeek: action.value
            };

        default:
            return state;
    }
};
