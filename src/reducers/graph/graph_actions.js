import { ActionTypes } from "./graph";

export const setGraphType = value => {
    return {
        type: ActionTypes.SET_GRAPH_TYPE,
        value
    };
};

export const setGraphRange = value => {
    return {
        type: ActionTypes.SET_GRAPH_RANGE,
        value
    };
};
