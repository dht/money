export const initialState = {

};

export const ActionTypes = {
    SET_PLANNED_BUDGETS: 'SET_PLANNED_BUDGETS',
    SET_PLANNED_VALUE: 'SET_PLANNED_VALUE',
};

const period = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_PLANNED_VALUE:
            return {
                ...state,
                [action.categoryId]: action.value
            }

        default:
            return state
    }

}
const items = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_PLANNED_BUDGETS:
            return action.value;

        case ActionTypes.SET_PLANNED_VALUE:
            return {
                ...state,
                [action.period]: period(state[action.period], action)
            }

        default:
            return state
    }

}

export default items;

