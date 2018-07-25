import React, {Component} from 'react';
import Money from "./Money/ViewTogglerContainer";
import Time from "./Time/ViewTogglerContainer";
import PropTypes from "prop-types";
import {modes} from "../../constants/constants";

export class ViewToggler extends Component {
    render() {

        const {mode} = this.context;

        switch (mode) {
            case modes.MONEY:
                return <Money {...this.props} />;
            case modes.TIME:
                return <Time {...this.props} />;
            default:
                return null;
        }
    }
}

ViewToggler.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string,
};


export default ViewToggler;