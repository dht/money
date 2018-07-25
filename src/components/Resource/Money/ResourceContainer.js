import React from "react";
import {connect} from "react-redux";
import Money from './Resource';

const mapStateToProps = (state, ownProps) => {
    const {appState} = state,
        {currency} = appState;

    return {
        unit: currency,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Money);