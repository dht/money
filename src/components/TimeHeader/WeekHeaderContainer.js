import React from "react";
import { connect } from "react-redux";
import TimeHeader from "./TimeHeader";
import { currentWeekSelector } from "../../selectors/appStateSelector";
import { getWeekNumber, weekRange } from "../../utils/dateAndMoney";
import { withContext } from "../../utils/withContext";

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;

    const currentUnit = currentWeekSelector(state);

    return {
        currentUnit,
        title: `${i18n.week} ${currentUnit}`,
        todayUnit: getWeekNumber(),
        subtitle: weekRange(currentUnit),
        max: 52
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
