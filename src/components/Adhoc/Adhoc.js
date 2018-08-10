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
import classNames from "classnames";
import PropTypes from "prop-types";
import App from "../App";

class Adhoc extends Component {
    state = {};

    componentDidMount() {
        this.props.setIsAdHoc(true);
    }

    componentWillUnmount() {
        this.props.setIsAdHoc(false);
    }

    onClear = () => {
        const { i18n } = this.context;

        alerts.confirm(
            i18n.areYouSure,
            answer => {
                if (answer) {
                    this.props.clearAdhoc();
                }
            },
            i18n.resetList
        );
    };

    render() {
        const { currentIndex, week, showList } = this.props;

        return (
            <div
                className={classNames("Adhoc-container", "page-structure", {
                    alternative: currentIndex % 2 === 0
                })}
            >
                <div className={classNames("list", { hide: !showList })}>
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

Adhoc.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string
};

export default Adhoc;
