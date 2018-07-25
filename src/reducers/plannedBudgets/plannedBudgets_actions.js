import {ActionTypes} from "./plannedBudgets";

export const setPlannedBudgets = (value) => {

    return {
        type: ActionTypes.SET_PLANNED_BUDGETS,
        value,
    }
}

export const setPlannedValue = (period, categoryId, value) => {

    return {
        type: ActionTypes.SET_PLANNED_VALUE,
        period,
        categoryId,
        value,
    }
}
