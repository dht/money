import { ActionTypes } from "./projects";

export const setProjects = value => {
    return {
        type: ActionTypes.SET_PROJECTS,
        value
    };
};

export const addProject = (id, value) => {
    return {
        type: ActionTypes.ADD_PROJECT,
        id,
        value
    };
};
export const updateProject = (id, value) => {
    return {
        type: ActionTypes.UPDATE_PROJECT,
        id,
        value
    };
};

export const removeProject = id => {
    return {
        type: ActionTypes.REMOVE_PROJECT,
        id
    };
};

export const setCurrentProject = value => {
    return {
        type: ActionTypes.SET_CURRENT_PROJECT,
        value
    };
};

export const setShowInWeek = value => {
    return {
        type: ActionTypes.SET_SHOW_IN_WEEK,
        value
    };
};
