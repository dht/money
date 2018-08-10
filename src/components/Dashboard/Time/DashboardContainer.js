import React from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import { dashboardSelector } from "../../../selectors/dashboardSelector";
import { nudgeCurrentIndexAdhoc } from "../../../reducers/adhoc/adhoc_thunks";
import { nudgeCurrentIndex } from "../../../reducers/appState/appState_thunks";
import { isLoadingSelector } from "../../../selectors/appStateSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        ...dashboardSelector(state),
        isLoading: isLoadingSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        nudgeCurrentIndexAdhoc: delta => {
            dispatch(nudgeCurrentIndexAdhoc(delta));
        },
        nudgeCurrentIndex: delta => {
            dispatch(nudgeCurrentIndex(delta));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
