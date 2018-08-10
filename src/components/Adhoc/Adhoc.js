import React, { Component } from "react";
import "./Adhoc.css";
import "animate.css/animate.css";
import List from "../List/ListAdhocContainer";
import "react-datepicker/dist/react-datepicker.css";
import Dashboard from "../Dashboard/Dashboard";
import WeekHeader from "../TimeHeader/AdhocHeaderContainer";
import ViewToggler from "../ViewToggler/ViewToggler";
import Button from "../Button/Button";
import alerts from "../../utils/alerts";

class Adhoc extends Component {
    state = {};

    componentDidMount() {
        this.props.setIsAdHoc(true);
    }

    componentWillUnmount() {
        this.props.setIsAdHoc(false);
    }

    onClear = () => {
        alerts.confirm(
            "are you sure?",
            answer => {
                if (answer) {
                    this.props.clearAdhoc();
                }
            },
            "איפוס"
        );
    };

    render() {
        const { currentIndex, week, showList } = this.props,
            listClassNames = ["list"];

        if (!showList) {
            listClassNames.push("hide");
        }

        return (
            <div
                className={`Adhoc-container page-structure ${
                    currentIndex % 2 === 0 ? "alternative" : ""
                }`}
            >
                <div className={listClassNames.join(" ")}>
                    <WeekHeader onChange={this.props.onWeekChange} />

                    <List week={week} withSum={true} />

                    <Button
                        onClick={this.onClear}
                        icon={"autorenew"}
                        className="clear-button"
                    />
                </div>
                <div className="content">
                    <Dashboard adhoc={true} />
                </div>

                <ViewToggler />
            </div>
        );
    }
}

export default Adhoc;
