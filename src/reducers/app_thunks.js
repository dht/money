import * as api from "../utils/firebase";
import * as actions from "./appState/appState_actions";
import * as adhoc from "./adhoc/adhoc_actions";
import * as projects from "./projects/projects_actions";
import { setBudgets } from "./budgets/budgets_actions";
import { setCategories } from "./categories/categories_actions";
import { setPlannedBudgets } from "./plannedBudgets/plannedBudgets_actions";
import { getStorageData, saveStorageData } from "../utils/storage";
import { modes } from "../constants/constants";
import { setCurrentBoard } from "./appState/appState_actions";

export const setBoardData = boardData => {
    return dispatch => {
        let {
            mode = modes.TIME,
            data = [],
            currentIndexes = {},
            categories = {},
            budgets = {},
            plannedBudgets = {},
            adhoc = {},
            projects = {}
        } =
            boardData || {};

        dispatch(actions.setMode(mode));
        dispatch(actions.setCurrentIndexes(currentIndexes));
        dispatch(actions.setLines(data));
        dispatch(setCategories(categories));
        dispatch(setBudgets(budgets));
        dispatch(setPlannedBudgets(plannedBudgets));
        dispatch(setAdhoc(adhoc));
        dispatch(setProjects(projects));
    };
};

export const fetchBoard = bucketId => {
    return dispatch => {
        api.initBoard(bucketId);

        dispatch(actions.setIsLoading(true));

        const data = getStorageData(bucketId);
        dispatch(setBoardData(data));
        dispatch(setCurrentBoard(bucketId));

        api.getBoard().then(boardData => {
            dispatch(setBoardData(boardData));
            saveStorageData(bucketId, boardData);
            dispatch(actions.setIsLoading(false));
        });
    };
};

export const setAdhoc = adhocData => {
    return dispatch => {
        let {
            data = [],
            startTime = "6:40",
            currentIndex = 0,
            autoComplete = {}
        } =
            adhocData || {};

        dispatch(adhoc.setLines(data));
        dispatch(adhoc.setStartTime(startTime));
        dispatch(adhoc.setCurrentIndex(currentIndex));
        dispatch(adhoc.setAutoComplete(autoComplete));
    };
};

export const setProjects = projectsData => {
    return dispatch => {
        dispatch(projects.setProjects(projectsData));
    };
};
