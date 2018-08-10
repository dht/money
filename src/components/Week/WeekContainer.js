import React from "react";
import { connect } from "react-redux";
import Week from "./Week";
import { listSelector } from "../../selectors/listSelector";
import {
    currentIndexSelector,
    showListSelector
} from "../../selectors/appStateSelector";
import { setCurrentWeek } from "../../reducers/appState/appState_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        showList: showListSelector(state),
        currentIndex: currentIndexSelector(state),
        items: listSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setCurrentWeek: week => {
            dispatch(setCurrentWeek(week));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Week);
