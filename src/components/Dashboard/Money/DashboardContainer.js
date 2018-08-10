import React from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import { dashboardSelector } from "../../../selectors/dashboardSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        dashboard: dashboardSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
