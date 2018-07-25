import {createSelector} from 'reselect'
import {plannedBudgetSelector} from "./plannedBudgetsSelector";

export const incomeSelector = createSelector(
    plannedBudgetSelector,
    (budgets) => {
        return 14745;
    }
)
