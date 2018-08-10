import * as api from "../../utils/firebase";
import { calcBudgetSelector } from "../../selectors/budgetsSelector";

export const refreshBudget = item => {
    return (dispatch, getState) => {
        const state = getState(),
            budgets = calcBudgetSelector(state);

        api.saveBudget(budgets).then(() => {
            document.location.reload(true);
        });
    };
};
