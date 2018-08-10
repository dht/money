import React, { Component } from "react";
import "./TimeBar.css";

export class TimeBar extends Component {
    state = {
        units: []
    };

    loadUnits = currentUnit => {
        const units = [];

        for (let i = currentUnit - 2; i <= currentUnit + 2; i++) {
            units.push(i);
        }

        this.setState({ units });
    };

    componentDidMount() {
        const { currentUnit } = this.props;
        this.loadUnits(currentUnit);
    }

    componentWillReceiveProps(props) {
        const { currentUnit } = props;
        this.loadUnits(currentUnit);
    }

    renderUnit = unit => {
        const { currentUnit, todayUnit, max } = this.props;

        if (unit <= 0 || unit > max) {
            return <div className="blank" />;
        }

        let className = currentUnit === unit ? "selected" : "";

        if (todayUnit === unit) {
            className += " today";
        }

        if (todayUnit < unit) {
            className += " future";
        }

        return (
            <div
                key={unit}
                onClick={() => this.props.onChange(unit)}
                className={className}
            >
                {unit}
            </div>
        );
    };

    render() {
        const { units } = this.state;

        return (
            <div className="TimeBar-container">
                {units.map(unit => this.renderUnit(unit))}
            </div>
        );
    }
}

export default TimeBar;
