import * as api from "../../utils/firebase";
import * as actions from "./plannedBudgets_actions";

export const setPlannedValue = (period, categoryId, value) => {

    return (dispatch, getState) => {
        api.savePlannedBudget(period, categoryId, value)
            .then(() => {
                dispatch(actions.setPlannedValue(period, categoryId, value))
            })
    }
}
