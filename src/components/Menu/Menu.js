import React, {Component} from 'react';
import Money from "./Money/MenuContainer";
import Time from "./Time/MenuContainer";
import PropTypes from "prop-types";
import {modes} from "../../constants/constants";

export class Menu extends Component {
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

Menu.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string,
};


export default Menu;