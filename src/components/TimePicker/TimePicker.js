import React, {Component} from 'react';
import './TimePicker.css';
import alerts from "../../utils/alerts";

export class TimePicker extends Component {

    state = {
    }

    onClick = () => {
        const {startTime} = this.props;

        alerts.prompt({
            yesText: 'שמירה',
            message: 'start time?',
            value: startTime,
            callback: (startTime) => {
                if (startTime) {
                    this.props.setStartTime(startTime);
                }
            }
        });
    }

    render() {
        const {startTime} = this.props;

        return (
            <div className="TimePicker-container" onClick={this.onClick}>
                {startTime}
            </div>
        );
    }
}

export default TimePicker;