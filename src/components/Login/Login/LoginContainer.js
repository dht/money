import React from "react";
import {connect} from "react-redux";
import Login from './Login';
import * as firebase from "../firebase";

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (email, password) => {
            return firebase.login(email, password);
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);