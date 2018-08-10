import React, { Component } from "react";
import "./Dashboard.css";
import Button from "../../Button/Button";
import Menu from "../../Menu/Menu";
import Page from "../../Page/PageContainer";
import PropTypes from "prop-types";
import Graph from "../../Graph/Graph";

export class Dashboard extends Component {
    state = {};

    nudgeCurrentIndex = delta => {
        const { adhoc } = this.props;

        if (adhoc) {
            this.props.nudgeCurrentIndexAdhoc(delta);
        } else {
            this.props.nudgeCurrentIndex(delta);
        }
    };

    renderLoading = () => {
        return <div className="Dashboard-container" />;
    };

    render() {
        const { i18n } = this.context;
        let { currentItem, adhoc, isLoading, currentIndex } = this.props,
            { startTime, title, sum } = currentItem || {},
            done = !currentItem,
            empty = done && currentIndex === 0;

        if (isLoading) {
            return this.renderLoading();
        }

        let subtitle = `${sum} ${i18n.minutes}`,
            showButton = true;

        if (done) {
            title = adhoc ? i18n.sessionEnded : i18n.weekEnded;
            subtitle = "";
            showButton = false;
        }

        if (empty) {
            title = "";
        }

        return (
            <div className="Dashboard-container">
                {startTime ? (
                    <div className="startTime">{startTime}</div>
                ) : null}

                <div className={`title ${empty ? "empty" : ""}`}>{title}</div>
                <div className="duration">{subtitle}</div>
                {showButton ? (
                    <div>
                        <Button
                            icon={"done"}
                            round={true}
                            onClick={() => this.nudgeCurrentIndex(+1)}
                        />
                    </div>
                ) : null}

                <Menu />

                <Page done={done} />
            </div>
        );
    }
}

Dashboard.contextTypes = {
    i18n: PropTypes.object
};

export default Dashboard;
