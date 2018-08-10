export const initialState = {};

export const ActionTypes = {
    BUDGET_SET_ITEMS: "BUDGET_SET_ITEMS",
    BUDGET_ADD_ITEM: "BUDGET_ADD_ITEM",
    BUDGET_UPDATE_ITEM: "BUDGET_UPDATE_ITEM",
    BUDGET_REMOVE_ITEM: "BUDGET_REMOVE_ITEM"
};

const budget = (state, action) => {
    switch (action.type) {
        case ActionTypes.BUDGET_ADD_ITEM:
            return action.value;

        case ActionTypes.BUDGET_UPDATE_ITEM:
            return {
                ...state,
                ...action.value
            };

        default:
            return state;
    }
};

const week = (state, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.BUDGET_ADD_ITEM:
        case ActionTypes.BUDGET_UPDATE_ITEM:
            return {
                ...state,
                [action.categoryId]: budget(state[action.categoryId], action)
            };

        case ActionTypes.BUDGET_REMOVE_ITEM:
            newState = { ...state };
            delete newState[action.categoryId];
            return newState;

        default:
            return state;
    }
};

const items = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BUDGET_SET_ITEMS:
            return action.value;

        case ActionTypes.BUDGET_ADD_ITEM:
        case ActionTypes.BUDGET_UPDATE_ITEM:
        case ActionTypes.BUDGET_REMOVE_ITEM:
            return {
                [action.week]: week(state[action.week], action)
            };

        default:
            return state;
    }
};

export default items;
