import React from "react";
import { connect } from "react-redux";
import Table from "./Table";
import { tableSelector } from "../../selectors/tableSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        lines: tableSelector(state)
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
)(Table);
