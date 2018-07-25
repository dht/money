import React, {Component} from 'react';
import './Graph.css';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Highcharts from 'highcharts'
import OptionsButton from "../OptionsButton/OptionsButton";
import {graphTypes, graphRanges} from "../../reducers/graph/graph";
import PropTypes from 'prop-types';

ReactChartkick.addAdapter(Highcharts)

class Graph extends Component {

    state = {
        graphOptions: [
            {code: graphTypes.B, title: 'עובר ושב'},
            {code: graphTypes.S, title: 'חסכונות'},
            // {code: graphTypes.I, title: 'השקעות'},
            {code: graphTypes.P, title: 'פנסיה'},
            {code: graphTypes.M, title: 'ביטוח מנהלים'},
            {code: graphTypes.H, title: 'קרן השתלמות'},
        ].reverse(),
        rangeOptions: [
            {code: graphRanges.T, title: 'עד סוף השנה'},
            {code: graphRanges.Y, title: 'שנה'},
            {code: graphRanges.Y2, title: 'שנתיים'},
            {code: graphRanges.Y3, title: '3 שנים'},
            {code: graphRanges.Y4, title: '4 שנים'},
            {code: graphRanges.Y5, title: '5 שנים'},
            {code: graphRanges.Y10, title: '10 שנים'},
        ].reverse(),
    }

    componentDidMount() {
        this.props.loadGraphSettingsFromLocalStorage();
    }

    renderOptionButtons() {
        const {graphType, graphRange} = this.props;
        const {graphOptions, rangeOptions} = this.state;

        return <div className="time-buttons">
            <OptionsButton
                options={rangeOptions}
                value={graphRange}
                onSelect={(value) => this.props.setGraphRange(value)} />
            <OptionsButton
                options={graphOptions}
                value={graphType}
                onSelect={(value) => this.props.setGraphType(value)} />
        </div>
    }

    render() {
        const {graph, currency} = this.props;

        return (
            <div className="Graph-container">
                <LineChart ytitle="עובר ושב" data={graph} thousands="," prefix={currency} width="100%" height={'800px'} />

                {this.renderOptionButtons()}
            </div>
        );
    }
}

Graph.contextTypes = {
    i18n: PropTypes.object,
};


export default Graph;
