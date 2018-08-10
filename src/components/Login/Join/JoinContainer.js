import React from "react";
import { connect } from "react-redux";
import Join from "./Join";
import { validateEmail, validatePassword } from "../utils";
import * as firebase from "../firebase";

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        join: (email, password) => {
            return firebase.createUser(email, password);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Join);
