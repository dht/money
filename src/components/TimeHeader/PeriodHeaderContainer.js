import React from "react";
import { connect } from "react-redux";
import TimeHeader from "./TimeHeader";
import { currentPeriodSelector } from "../../selectors/appStateSelector";
import { getPeriodNumber, monthHeader, monthRange } from "../../utils/dateAndMoney";

const mapStateToProps = (state, ownProps) => {
    const currentUnit = currentPeriodSelector(state);

    return {
        title: monthHeader(currentUnit),
        currentUnit,
        todayUnit: getPeriodNumber(),
        subtitle: monthRange(currentUnit),
        max: 12
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeHeader);
