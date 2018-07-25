import React, {Component} from 'react';
import './Pie.css';
import ReactChartkick, {LineChart, PieChart} from 'react-chartkick'
import Highcharts from 'highcharts'

ReactChartkick.addAdapter(Highcharts)

export class Pie extends Component {

    state = {}

    renderPie() {
        const {pie, currency} = this.props;

        return <PieChart
            data={pie}
            thousands=","
            prefix={currency}
            height="100%"
            width="100%"/>
    }

    render() {
        return (
            <div className="Pie-container">

            </div>
        );
    }
}

export default Pie;