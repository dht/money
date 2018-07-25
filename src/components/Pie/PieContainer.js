import React from "react";
import {connect} from "react-redux";
import Pie from './Pie';
import {pieSelector} from "../../selectors/pieSelector";

const mapStateToProps = (state, ownProps) => {
    const {appState} = state,
        {currency} = appState;

    return {
        pie: pieSelector(state),
        currency
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pie);