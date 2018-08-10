import React, { Component } from "react";
import Money from "./Money/DashboardContainer";
import Time from "./Time/DashboardContainer";
import PropTypes from "prop-types";
import { modes } from "../../constants/constants";

export class Dashboard extends Component {
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

Dashboard.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string
};

export default Dashboard;
