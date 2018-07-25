import React from "react";
import {connect} from "react-redux";
import ResetPassword from './ResetPassword';
import * as firebase from "../firebase";

const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reset: (email) => {
            return firebase.resetPassword(email);
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);