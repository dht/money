import React from "react";
import {connect} from "react-redux";
import TimeHeader from './TimeHeader';
import {getPeriodNumber} from "../../utils/date";

const mapStateToProps = (state, ownProps) => {

    return {
        title: 'פרוייקטים',
        subtitle: 'שלב אחרי שלב',
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