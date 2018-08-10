import { connect } from "react-redux";
import Period from "./Period";
import { categoriesSelector } from "../../selectors/categoriesSelector";
import {
    currentPeriodSelector,
    planningModeSelector
} from "../../selectors/appStateSelector";
import { setPlanningMode } from "../../reducers/appState/appState_actions";
import { budgetsByPeriod, sumByPeriod } from "../../selectors/budgetsSelector";
import { setPlannedValue } from "../../reducers/plannedBudgets/plannedBudgets_thunks";
import { refreshBudget } from "../../reducers/budgets/budgets_thunks";
import { planningModes } from "../../constants/constants";

const mapStateToProps = (state, ownProps) => {
    return {
        planningMode: planningModeSelector(state),
        categories: categoriesSelector(state),
        budgets: budgetsByPeriod(state),
        sum: sumByPeriod(state),
        period: currentPeriodSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        savePlannedBudget: (period, categoryId, value) => {
            dispatch(setPlannedValue(period, categoryId, value));
        },
        refreshBudget: () => {
            dispatch(refreshBudget());
        },
        togglePlanningMode: mode => {
            switch (mode) {
                case planningModes.PLANNED_VS_ACTUAL:
                    mode = planningModes.PLANNED_AND_PERCENT;
                    break;
                case planningModes.PLANNED_AND_PERCENT:
                    mode = planningModes.ACTUAL_AND_PERCENT;
                    break;
                case planningModes.ACTUAL_AND_PERCENT:
                    mode = planningModes.PLANNED_VS_ACTUAL;
                    break;
                default:
                    break;
            }

            dispatch(setPlanningMode(mode));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Period);
