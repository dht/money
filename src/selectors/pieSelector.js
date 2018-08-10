import { createSelector } from "reselect";
import { budgetSelector } from "./budgetsSelector";
import { categoriesSelector } from "./categoriesSelector";

export const pieSelector = createSelector(
    categoriesSelector,
    budgetSelector,
    (categories, budgets) => {
        const keys = Object.keys(categories);

        return keys.map(key => {
            const category = categories[key],
                { id, title } = category || {};

            let total = 0;

            for (let i = 1; i <= 52; i++) {
                const week = budgets[i] || {},
                    budget = week[id] || {},
                    { actual = 0 } = budget;

                if (actual < 0) {
                    total += Math.abs(actual);
                }
            }

            return [title, total];
        });
    }
);
