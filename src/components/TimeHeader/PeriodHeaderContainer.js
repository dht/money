import React from "react";
import { connect } from "react-redux";
import TimeHeader from "./TimeHeader";
import { currentPeriodSelector } from "../../selectors/appStateSelector";
import {
    getPeriodNumber,
    monthHeader,
    monthRange
} from "../../utils/dateAndMoney";
import { withContext } from "../../utils/withContext";

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;
    const currentUnit = currentPeriodSelector(state);

    return {
        title: monthHeader(currentUnit),
        currentUnit,
        todayUnit: getPeriodNumber(),
        subtitle: monthRange(currentUnit) + " " + i18n.days,
        max: 12
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withContext(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TimeHeader)
);
