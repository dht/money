import React from "react";
import { connect } from "react-redux";
import Menu from "./Menu";
import { toggleList } from "../../../reducers/appState/appState_thunks";

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleList: () => {
            dispatch(toggleList());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
