import { getPeriodNumber, getWeekNumber } from "../../utils/dateAndMoney";
import { modes, planningModes } from "../../constants/constants";
import { getStorageBool, getStorageKey } from "../../utils/storage";

export const initialState = {
    mode: modes.TIME,
    planningMode: planningModes.PLANNED_VS_ACTUAL,
    currentBoard: 0,
    currentWeek: getWeekNumber(),
    currentPeriod: getPeriodNumber(),
    isLoading: true,
    isAdhoc: false,
    showList: getStorageBool("showList", true),
    showPage: getStorageBool("showPage", true),
    currency: getStorageKey("currency", "$"),
    timeUnit: "",
    locale: getStorageKey("locale", "en"),
    currentIndexes: {},
    lines: {},
    timetravelDate: null
};

export const ActionTypes = {
    SET_MODE: "SET_MODE",
    SET_LOCALE: "SET_LOCALE",
    SET_CURRENCY: "SET_CURRENCY",
    SET_PLANNING_MODE: "SET_PLANNING_MODE",
    SET_SHOW_LIST: "SET_SHOW_LIST",
    SET_SHOW_PAGE: "SET_SHOW_PAGE",
    SET_IS_ADHOC: "SET_IS_ADHOC",
    SET_IS_LOADING: "SET_IS_LOADING",
    SET_CURRENT_INDEXES: "SET_CURRENT_INDEXES",
    SET_CURRENT_INDEX: "SET_CURRENT_INDEX",
    SET_CURRENT_BOARD: "SET_CURRENT_BOARD",
    SET_CURRENT_WEEK: "SET_CURRENT_WEEK",
    SET_CURRENT_PERIOD: "SET_CURRENT_PERIOD",
    SET_LINES: "SET_LINES",
    ADD_LINE: "ADD_LINE",
    CHANGE_LINE: "CHANGE_LINE",
    REMOVE_LINE: "REMOVE_LINE",
    ADD_CHANGE_LOG: "ADD_CHANGE_LOG",
    SET_TIMETRAVEL_DATE: "SET_TIMETRAVEL_DATE"
};

const changes = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CHANGE_LOG:
            return {
                ...state,
                [action.value.id]: action.value
            };

        default:
            return state;
    }
};

const line = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LINE:
            return action.value;

        case ActionTypes.CHANGE_LINE:
            return {
                ...state,
                ...action.value
            };

        case ActionTypes.ADD_CHANGE_LOG:
            return {
                ...state,
                changes: changes(state.changes, action)
            };

        default:
            return state;
    }
};

const lines = (state, action) => {
    let newState;

    switch (action.type) {
        case ActionTypes.SET_LINES:
            return action.value;

        case ActionTypes.ADD_LINE:
        case ActionTypes.CHANGE_LINE:
        case ActionTypes.ADD_CHANGE_LOG:
            return {
                ...state,
                [action.id]: line(state[action.id], action)
            };

        case ActionTypes.REMOVE_LINE:
            newState = { ...state };
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

const currentIndexes = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_INDEXES:
            return action.value;

        case ActionTypes.SET_CURRENT_INDEX:
            return {
                ...state,
                [action.week]: action.value
            };

        default:
            return state;
    }
};

const appState = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_MODE:
            return {
                ...state,
                mode: action.value
            };
        case ActionTypes.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.value
            };

        case ActionTypes.SET_PLANNING_MODE:
            return {
                ...state,
                planningMode: action.value
            };

        case ActionTypes.SET_SHOW_LIST:
            return {
                ...state,
                showList: action.value
            };

        case ActionTypes.SET_SHOW_PAGE:
            return {
                ...state,
                showPage: action.value
            };
        case ActionTypes.SET_CURRENT_BOARD:
            return {
                ...state,
                currentBoard: action.value
            };

        case ActionTypes.SET_LOCALE:
            return {
                ...state,
                locale: action.value
            };

        case ActionTypes.SET_CURRENCY:
            return {
                ...state,
                currency: action.value
            };

        case ActionTypes.SET_IS_ADHOC:
            return {
                ...state,
                isAdhoc: action.value
            };

        case ActionTypes.SET_LINES:
            return {
                ...state,
                lines: action.value
            };

        case ActionTypes.SET_CURRENT_INDEXES:
        case ActionTypes.SET_CURRENT_INDEX:
            return {
                ...state,
                currentIndexes: currentIndexes(state.currentIndexes, action)
            };

        case ActionTypes.SET_CURRENT_WEEK:
            return {
                ...state,
                currentWeek: action.value
            };

        case ActionTypes.SET_CURRENT_PERIOD:
            return {
                ...state,
                currentPeriod: action.value
            };

        case ActionTypes.ADD_LINE:
        case ActionTypes.CHANGE_LINE:
        case ActionTypes.REMOVE_LINE:
        case ActionTypes.ADD_CHANGE_LOG:
            return {
                ...state,
                lines: lines(state.lines, action)
            };

        case ActionTypes.SET_TIMETRAVEL_DATE:
            return {
                ...state,
                timetravelDate: action.value
            };

        default:
            return state;
    }
};

export default appState;
