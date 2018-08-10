import React, { Component } from "react";
import Money from "./Money/New";
import Time from "./Time/New";
import PropTypes from "prop-types";
import { modes } from "../../constants/constants";

export class New extends Component {
    render() {
        const { mode } = this.context;

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

New.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string
};

export default New;
