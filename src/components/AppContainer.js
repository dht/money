import React from "react";
import { connect } from "react-redux";
import App from "./App";
import { fetchAdhoc, fetchBoard } from "../reducers/app_thunks";
import { currentParamsSelector } from "../selectors/appStateSelector";
import { log } from "../utils/log";
import {
    setCurrency,
    setLocale,
    setShowList
} from "../reducers/appState/appState_actions";
import all from "../constants/i18n";
import { getCurrencySign } from "../utils/dateAndMoney";

const mapStateToProps = (state, ownProps) => {
    const { appState } = state,
        { locale } = appState,
        i18n = all[locale];

    console.log("i18n", locale, all, i18n);

    return {
        ...currentParamsSelector(state),
        pathname: document.location.pathname,
        locale,
        isRTL: locale === "he",
        i18n
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadData: boardId => {
            if (!boardId) return;

            log("fetching board", boardId);
            dispatch(fetchBoard(boardId));
        },
        navigateTo: (path, saveRedirect) => {
            if (document.location.pathname === path) return;

            log("navigating", path);

            if (saveRedirect) {
                localStorage.setItem("redirect", document.location.pathname);
            }

            document.location.href = path;
        },
        setShowList: () => {
            dispatch(setShowList(true));
        },
        setLocale: locale => {
            const currencySign = getCurrencySign(locale);
            localStorage.setItem("locale", locale);
            localStorage.setItem("currency", currencySign);
            dispatch(setLocale(locale));
            dispatch(setCurrency(currencySign));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
