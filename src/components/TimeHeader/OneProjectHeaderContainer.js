import React from "react";
import {connect} from "react-redux";
import TimeHeader from './TimeHeader';
import {getPeriodNumber} from "../../utils/date";
import {currentProjectSelector} from "../../selectors/projectsSelector";

const mapStateToProps = (state, ownProps) => {

    const project = currentProjectSelector(state) || {};

    return {
        subtitle: 'תכנון פרוייקט',
        title: project.title,
        todayUnit: getPeriodNumber(),
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