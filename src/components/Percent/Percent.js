import React, { Component } from "react";
import "./Percent.css";

export class Percent extends Component {
    state = {};

    render() {
        const { value, className } = this.props,
            classNames = ["Percent-container", className];

        return (
            <div className={classNames.join(" ")}>
                <span>%{value}</span>
            </div>
        );
    }
}

export default Percent;
