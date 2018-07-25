import React from "react";
import {connect} from "react-redux";
import TimeHeader from './TimeHeader';
import {currentPeriodSelector} from "../../selectors/appStateSelector";
import {getPeriodNumber, monthHeader, monthRange} from "../../utils/date";
import {adhocStartTimeSelector, currentIndexSelector} from "../../selectors/adhocSelector";

const mapStateToProps = (state, ownProps) => {

    const currentUnit = currentPeriodSelector(state);

    return {
        title: 'סשן',
        todayUnit: getPeriodNumber(),
        subtitle: 'ציור בחול',
        showTimePicker: true,
        startTime: adhocStartTimeSelector(state),
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