import React, { Component } from "react";
import "./Permissions.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Period from "../Period/Period";

export class Permissions extends Component {
    state = {};

    render() {
        const { i18n } = this.context;

        return (
            <div className="Permissions-container">
                <div className="title">{i18n.noPermissions}</div>

                <Link to={"/login"}>{i18n.loginAsDifferentUser}</Link>
            </div>
        );
    }
}

Permissions.contextTypes = {
    i18n: PropTypes.object
};

export default Permissions;
