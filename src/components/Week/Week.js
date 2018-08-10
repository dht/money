import React, { Component } from "react";
import "./Week.css";
import "animate.css/animate.css";
import List from "../List/ListContainer";
import "react-datepicker/dist/react-datepicker.css";
import Dashboard from "../Dashboard/Dashboard";
import WeekHeader from "../TimeHeader/WeekHeaderContainer";
import { getParams } from "../../utils/params";
import ViewToggler from "../ViewToggler/ViewToggler";

class Week extends Component {
    state = {};

    getParams = props => {
        const { match } = props || this.props,
            { params } = match || {};

        return params;
    };

    setWeek = week => {
        if (week !== this.state.week) {
            this.setState({ week });
            this.props.setCurrentWeek(week);
        }
    };

    componentDidMount() {
        const { week } = this.getParams(this.props);

        window.addEventListener("keydown", this.keydown);

        this.setWeek(week);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keydown);
    }

    componentWillReceiveProps(props) {
        const { week } = this.getParams(props);

        this.setWeek(week);
    }

    keydown = ev => {
        if (ev.ignore) return;

        if (ev.which === 37) {
            this.nudgeWeek(+1);
        }

        if (ev.which === 39) {
            this.nudgeWeek(-1);
        }
    };

    changeWeek = week => {
        const { boardId } = getParams(this.props);

        this.props.history.push(`/${boardId}/${week}`);
    };

    nudgeWeek = delta => {
        const { week } = this.state;

        let newWeek = parseInt(week, 10) + delta;

        newWeek = Math.min(Math.max(newWeek, 0), 52);

        this.changeWeek(newWeek);
    };

    render() {
        const { currentIndex, showList } = this.props;
        const { week } = this.state,
            listClassNames = ["list"];

        if (!showList) {
            listClassNames.push("hide");
        }

        return (
            <div
                className={`Week-container page-structure ${
                    currentIndex % 2 === 0 ? "alternative" : ""
                }`}
            >
                <div className={listClassNames.join(" ")}>
                    <WeekHeader onChange={this.changeWeek} />
                    <List week={week} />
                </div>
                <div className="content">
                    <Dashboard />
                </div>

                <ViewToggler />
            </div>
        );
    }
}

export default Week;
