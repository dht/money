export const initialState = {};

export const ActionTypes = {
    CATEGORY_SET_ITEMS: "CATEGORY_SET_ITEMS",
    CATEGORY_ADD_ITEM: "CATEGORY_ADD_ITEM",
    CATEGORY_UPDATE_ITEM: "CATEGORY_UPDATE_ITEM",
    CATEGORY_REMOVE_ITEM: "CATEGORY_REMOVE_ITEM",
    CATEGORY_ADD_NAME: "CATEGORY_ADD_NAME",
    CATEGORY_REMOVE_NAME: "CATEGORY_REMOVE_NAME"
};

const names = (state, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.CATEGORY_ADD_NAME:
            return {
                ...state,
                [action.nameId]: action.value
            };

        case ActionTypes.CATEGORY_REMOVE_NAME:
            newState = { ...state };
            delete newState[action.nameId];
            return newState;

        default:
            return state;
    }
};
const item = (state, action) => {
    switch (action.type) {
        case ActionTypes.CATEGORY_ADD_ITEM:
            return action.value;

        case ActionTypes.CATEGORY_UPDATE_ITEM:
            return {
                ...state,
                ...action.value
            };

        case ActionTypes.CATEGORY_ADD_NAME:
        case ActionTypes.CATEGORY_REMOVE_NAME:
            return {
                ...state,
                names: names(state.names, action)
            };

        default:
            return state;
    }
};

const items = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.CATEGORY_SET_ITEMS:
            return action.value;

        case ActionTypes.CATEGORY_ADD_ITEM:
        case ActionTypes.CATEGORY_UPDATE_ITEM:
        case ActionTypes.CATEGORY_ADD_NAME:
        case ActionTypes.CATEGORY_REMOVE_NAME:
            return {
                ...state,
                [action.id]: item(state[action.id], action)
            };

        case ActionTypes.CATEGORY_REMOVE_ITEM:
            newState = { ...state };
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

export default items;
