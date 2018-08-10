import React, { Component } from "react";
import "./TimeHeader.css";
import TimeBar from "../TimeBar/TimeBar";
import TimePicker from "../TimePicker/TimePickerContainer";

export class TimeHeader extends Component {
    state = {};

    renderTimeBar() {
        return <TimeBar {...this.props} />;
    }

    renderTimePicker() {
        return <TimePicker {...this.props} />;
    }

    render() {
        const { title, subtitle, showTimePicker } = this.props;

        return (
            <div className="TimeHeader-container">
                <div className="title"> {title}</div>
                <div className="subtitle">{subtitle}</div>

                <div className="bar">
                    {showTimePicker
                        ? this.renderTimePicker()
                        : this.renderTimeBar()}
                </div>
            </div>
        );
    }
}

export default TimeHeader;
