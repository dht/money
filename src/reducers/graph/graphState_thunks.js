import * as actions from "./graph_actions";

export const setGraphRange = (value) => {

    return (dispatch) => {
        dispatch(actions.setGraphRange(value));
        localStorage.setItem(`graphRange`, value);
    }
}

export const setGraphType = (value) => {

    return (dispatch) => {
        dispatch(actions.setGraphType(value));
        localStorage.setItem(`graphType`, value);
    }
}


export const loadGraphSettingsFromLocalStorage = () => {

    return (dispatch) => {
        const graphType = localStorage.getItem('graphType'),
            graphRange = localStorage.getItem('graphRange');

        if (graphType) {
            dispatch(actions.setGraphType(graphType));
        }

        if (graphRange) {
            dispatch(actions.setGraphRange(graphRange));
        }
    }
}

