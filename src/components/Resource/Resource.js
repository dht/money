import React, {Component} from 'react';
import Money from "./Money/ResourceContainer";
import Time from "./Time/ResourceContainer";
import PropTypes from "prop-types";
import {modes} from "../../constants/constants";

export class Resource extends Component {
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

Resource.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string,
};


export default Resource;