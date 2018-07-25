import {ActionTypes} from "./budgets";

export const setBudgets = (value) => {

    return {
        type: ActionTypes.BUDGET_SET_ITEMS,
        value,
    }
}

export const addbudget = (week, categoryId, value) => {

    return {
        type: ActionTypes.BUDGET_ADD_ITEM,
        week,
        categoryId,
        value,
    }
}

export const updatebudget = (week, categoryId, value) => {

    return {
        type: ActionTypes.BUDGET_UPDATE_ITEM,
        week,
        categoryId,
        value,

    }
}
export const removebudget = (week, categoryId) => {

    return {
        type: ActionTypes.BUDGET_REMOVE_ITEM,
        week,
        categoryId,
    }
}