import React, { Component } from "react";
import "./Graph.css";
import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Highcharts from "highcharts";
import OptionsButton from "../OptionsButton/OptionsButton";
import { graphTypes, graphRanges } from "../../reducers/graph/graph";
import PropTypes from "prop-types";

ReactChartkick.addAdapter(Highcharts);

class Graph extends Component {
    constructor(props, context) {
        super();

        const { i18n } = context;

        this.state = {
            graphOptions: [
                { code: graphTypes.B, title: i18n.checking },
                { code: graphTypes.S, title: i18n.savings },
                // {code: graphTypes.I, title: i18n.investments},
                { code: graphTypes.P, title: i18n.pension },
                { code: graphTypes.M, title: i18n.insurance },
                { code: graphTypes.H, title: i18n.providentFund }
            ].reverse(),
            rangeOptions: [
                { code: graphRanges.T, title: i18n.endOfYear },
                { code: graphRanges.Y, title: i18n.oneYear },
                { code: graphRanges.Y2, title: i18n.twoYears },
                { code: graphRanges.Y3, title: i18n.threeYears },
                { code: graphRanges.Y4, title: i18n.fourYears },
                { code: graphRanges.Y5, title: i18n.fiveYears },
                { code: graphRanges.Y10, title: i18n.tenYears }
            ].reverse()
        };
    }

    componentDidMount() {
        this.props.loadGraphSettingsFromLocalStorage();
    }

    renderOptionButtons() {
        const { graphType, graphRange } = this.props;
        const { graphOptions, rangeOptions } = this.state;

        return (
            <div className="time-buttons">
                <OptionsButton
                    options={rangeOptions}
                    value={graphRange}
                    onSelect={value => this.props.setGraphRange(value)}
                />
                <OptionsButton
                    options={graphOptions}
                    value={graphType}
                    onSelect={value => this.props.setGraphType(value)}
                />
            </div>
        );
    }

    render() {
        const { i18n } = this.context;
        const { graph, currency } = this.props;

        return (
            <div className="Graph-container">
                <LineChart
                    ytitle={i18n.checking}
                    data={graph}
                    thousands=","
                    prefix={currency}
                    width="100%"
                    height={"800px"}
                />

                {this.renderOptionButtons()}
            </div>
        );
    }
}

Graph.contextTypes = {
    i18n: PropTypes.object
};

export default Graph;
