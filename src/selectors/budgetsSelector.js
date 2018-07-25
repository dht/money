import {createSelector} from 'reselect'
import {linesSelector} from "./linesSelector";
import {reverseNamesSelector} from "./categoriesSelector";
import {plannedBudgetSelector} from "./plannedBudgetsSelector";
import {incomeSelector} from "./incomeSelector";

export const budgetSelector = state => state.budgets;

export const budgetsByPeriod = createSelector(
    budgetSelector,
    plannedBudgetSelector,
    incomeSelector,
    (budgets, plannedBudget, income) => {

        const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

        return keys
            .reduce((output, periodId) => {
                const period = budgets[periodId] || {},
                    planned = plannedBudget[periodId] || {};

                let categories = Object.keys(period);

                output[periodId] = output[periodId] || {};

                categories.forEach(catKey => {
                    const category = period[catKey];

                    output[periodId] = output[periodId] || {};
                    output[periodId][catKey] = output[periodId][catKey] || {};
                    output[periodId][catKey].actual = category.actual || 0;
                    output[periodId][catKey].actualPercent = Math.abs(Math.floor(100 * output[periodId][catKey].actual / income));
                })


                categories = Object.keys(planned);

                categories.forEach(catKey => {
                    const plannedValue = parseInt(planned[catKey], 10) || 0;

                    output[periodId] = output[periodId] || {};
                    output[periodId][catKey] = output[periodId][catKey] || {};
                    output[periodId][catKey].planned = plannedValue || 0;
                    output[periodId][catKey].plannedPercent = Math.abs(Math.floor(100 * output[periodId][catKey].planned / income));
                })

                return output;
            }, {});
    }
)

export const sumByPeriod = createSelector(
    budgetsByPeriod,
    incomeSelector,
    (budgets, income) => {

        const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

        return keys
            .reduce((output, periodId) => {
                const budget = budgets[periodId];

                output[periodId] = output[periodId] || {};
                output[periodId].actual = output[periodId].actual || 0;
                output[periodId].planned = output[periodId].planned || 0;

                Object.keys(budget).forEach(id => {
                    output[periodId].actual += budget[id].actual || 0;
                    output[periodId].planned += budget[id].planned || 0;
                });

                if (income) {
                    output[periodId].actualPercent = Math.floor(100 * output[periodId].actual / income);
                    output[periodId].plannedPercent = Math.floor(100 * output[periodId].planned / income);
                }

                return output;
            }, {});
    }
)

export const calcBudgetSelector = createSelector(
    linesSelector,
    reverseNamesSelector,
    (lines, names) => {

        const keys = Object.keys(lines);

        return keys
            .reduce((output, key) => {
                const line = lines[key];
                let {title, sum, period: month} = line,
                    category = names[title];

                if (!category) return output;

                output[month] = output[month] || {};
                output[month][category.categoryId] = output[month][category.categoryId] || {};
                output[month][category.categoryId].title = category.categoryTitle;
                output[month][category.categoryId].actual = output[month][category.categoryId].actual || 0;

                output[month][category.categoryId].actual += parseInt(sum, 10);

                return output;
            }, {});
    }
)


