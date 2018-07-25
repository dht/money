import React from "react";
import {connect} from "react-redux";
import TimeHeader from './TimeHeader';
import {currentWeekSelector} from "../../selectors/appStateSelector";
import {getWeekNumber, weekRange} from "../../utils/date";

const mapStateToProps = (state, ownProps) => {

    const currentUnit = currentWeekSelector(state);

    return {
        currentUnit,
        title: `שבוע ${currentUnit}`,
        todayUnit: getWeekNumber(),
        subtitle: weekRange(currentUnit),
        max: 52,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeHeader);