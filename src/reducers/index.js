import {combineReducers} from "redux";

import appState from "./appState/appState";
import adhoc from "./adhoc/adhoc";
import categories from "./categories/categories";
import budgets from "./budgets/budgets";
import plannedBudgets from "./plannedBudgets/plannedBudgets";
import graph from "./graph/graph";
import projects from "./projects/projects";

export default combineReducers({
    appState,
    adhoc,
    categories,
    budgets,
    plannedBudgets,
    graphState: graph,
    projects,
})