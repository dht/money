import React, { Component } from "react";
import "./Menu.css";

export class Menu extends Component {
    state = {};

    render() {
        const { down } = this.props;

        const position = down ? "down" : "up";

        return (
            <div className={`Menu-container ${position}`}>
                {this.props.children}
            </div>
        );
    }
}

export default Menu;
