import React, { Component } from "react";
import "./TimePicker.css";
import alerts from "../../utils/alerts";
import PropTypes from "prop-types";
import List from "../List/List";

export class TimePicker extends Component {
    state = {};

    onClick = () => {
        const { i18n } = this.context;
        const { startTime } = this.props;

        alerts.prompt({
            yesText: i18n.save,
            message: i18n.startTime,
            value: startTime,
            callback: startTime => {
                if (startTime) {
                    this.props.setStartTime(startTime);
                }
            }
        });
    };

    render() {
        const { startTime } = this.props;

        return (
            <div className="TimePicker-container" onClick={this.onClick}>
                {startTime}
            </div>
        );
    }
}

TimePicker.contextTypes = {
    i18n: PropTypes.object
};

export default TimePicker;
