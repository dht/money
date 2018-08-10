import React, { Component } from "react";
import "./Menu.css";
import Button from "../../Button/Button";

export class Menu extends Component {
    state = {};

    render() {
        const { down } = this.props;

        const position = down ? "down" : "up";

        return (
            <div className={`Menu-container ${position}`}>
                <Button
                    icon={"menu"}
                    light={true}
                    onClick={this.props.toggleList}
                />
            </div>
        );
    }
}

export default Menu;
