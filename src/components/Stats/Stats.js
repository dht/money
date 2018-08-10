import React, { Component } from "react";
import "./Stats.css";
import "animate.css/animate.css";
import Graph from "../Graph/GraphContainer";
import "react-datepicker/dist/react-datepicker.css";
import Pie from "../Pie/PieContainer";
import Period from "../Period/PeriodContainer";
import Button from "../Button/Button";
import WeekHeader from "../TimeHeader/PeriodHeaderContainer";
import Settings from "../Settings/SettingsContainer";
import ViewToggler from "../ViewToggler/ViewToggler";

class Stats extends Component {
    state = {
        showSettings: false
    };

    render() {
        const { showSettings } = this.state;

        return (
            <div className={`Stats-container adhoc`}>
                <div className="list">
                    <WeekHeader onChange={this.props.onPeriodChange} />

                    <Period />

                    <div className="actions-bar">
                        <Button
                            icon={"settings"}
                            onClick={() =>
                                this.setState({ showSettings: true })
                            }
                        />
                    </div>
                </div>
                <div className="content">
                    <Pie />
                    <Graph />

                    {showSettings ? (
                        <Settings
                            onClose={() =>
                                this.setState({ showSettings: false })
                            }
                        />
                    ) : null}
                </div>

                <ViewToggler />
            </div>
        );
    }
}

export default Stats;
