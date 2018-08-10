import React, { Component } from "react";
import Money from "./Money/Line";
import Time from "./Time/Line";
import PropTypes from "prop-types";
import { modes } from "../../constants/constants";

export class Line extends Component {
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

Line.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string
};

export default Line;
