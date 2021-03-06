import React, { Component } from "react";
import "./Resource.css";
import {money} from "../../../utils/dateAndMoney";

export class Resource extends Component {
    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        let {
                locale,
                className,
                value = "",
                abs,
                color,
                colorValue = value
            } = this.props,
            classNames = [className],
            text;

        value = parseInt(value, 10);

        // it is the value according which the color is decided
        colorValue = parseInt(colorValue, 10);

        if (color) {
            abs = true;

            if (colorValue !== 0) {
                classNames.push(colorValue > 0 ? "green" : "red");
            }
        }

        if (this.props.onClick) {
            classNames.push("clickable");
        }

        if (abs) {
            value = Math.abs(value);
        }

        if (value === 0 || isNaN(value)) {
            text = "-";
        } else {
            text = money(value, locale);
        }

        return (
            <div
                className={`Resource-container ${classNames.join(" ")}`}
                onClick={this.onClick}
            >
                {text}
            </div>
        );
    }
}

export default Resource;
