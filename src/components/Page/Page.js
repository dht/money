import React, { Component } from "react";
import "./Page.css";

export class Page extends Component {
    state = {};

    render() {
        let { title, done, showPage } = this.props,
            empty = title === "-";

        if (done && !empty) {
            title = "😊";
        }

        if (!showPage) {
            title = "";
        }

        return (
            <div className="Page-container" onClick={this.props.togglePage}>
                {title}
            </div>
        );
    }
}

export default Page;
