import React, {Component} from 'react';
import './Period.css';
import Button from "../Button/Button";
import PropTypes from "prop-types";
import Resource from "../Resource/Resource";
import alerts from "../../utils/alerts";
import Percent from "../Percent/Percent";
import {planningModes} from "../../constants/constants";

export class Period extends Component {

    state = {
    }

    changePlannedFinished = (categoryId, value) => {
        const {period} = this.props;

        if (value === null) return;

        if (value.indexOf('+') >= 0) {
            value = value.replace('+', '');
        } else {
            value = -Math.abs(parseInt(value, 10));
        }

        if (value) {
            this.props.savePlannedBudget(period, categoryId, value);
        }
    }

    changePlanned = (categoryId, value) => {
        const options = {
            yesText: 'שמירה',
            message: 'planned',
            value,
            callback: (value) => {
                if (value === false) return;
                this.changePlannedFinished(categoryId, value);
            }
        }

        alerts.prompt(options);
    }

    renderLine = (category) => {
        const {budgets, period} = this.props,
            budget = budgets[period] || {},
            budgetForCategory = budget[category.id] || {},
            {actual, actualPercent, planned, plannedPercent} = budgetForCategory;

        let diff = Math.min(actual - planned, 0);

        return <div className="row" key={category.id}>

            <div className="category-title">
                {category.title}
            </div>

            <Resource
                className="p"
                colorValue={0}
                value={planned}
                color={true}
                onClick={() => this.changePlanned(category.id, planned)}/>

            <Percent
                className="pp"
                value={plannedPercent} />

            <Resource
                className="a"
                colorValue={diff}
                value={actual}
                color={true}/>

            <Percent
                className="ap"
                value={actualPercent} />
        </div>
    }

    renderHeader() {
        return <div className="row header">
            <div className="category-title">
                קטגוריה
            </div>
            <div className="th p">
                מתוכנן
            </div>
            <div className="th pp">
                % משכורת*
            </div>
            <div className="th a">
                בפועל
            </div>
            <div className="th ap">
                % משכורת*
            </div>
        </div>
    }

    renderSummary() {
        const {sum, period} = this.props,
            summary = sum[period] || {},
            {planned, actual} = summary;


        return <div className="row summary">
            <div className="category-title">
            </div>
            <Resource value={planned} color={true} className="p" />
            <Resource value={0} color={true} className="pp"/>
            <Resource value={actual} color={true} className="a"/>
            <Resource value={0} color={true} className="ap"/>

        </div>
    }

    toggleMode = () => {
        let {planningMode} = this.props;
        this.props.togglePlanningMode(planningMode);
    }

    renderTopAction = () => {
        return <div className="top-actions">
            <Button
                onClick={this.toggleMode}
                icon={'view_week'}/>
        </div>;
    }

    render() {
        const {categories, planningMode} = this.props;

        let className;

        switch (planningMode) {
            case planningModes.PLANNED_VS_ACTUAL:
                className = 'hide-pp hide-ap';
                break;
            case planningModes.PLANNED_AND_PERCENT:
                className = 'hide-a hide-ap';
                break;
            case planningModes.ACTUAL_AND_PERCENT:
                className = 'hide-p hide-pp';
                break;
        }

        return (
            <div className={`Period-container ${className}`}>
                {this.renderHeader()}
                {
                    categories.map((category, index) => this.renderLine(category, index))
                }
                {this.renderSummary()}

                <div className="actions">
                    <Button
                        onClick={this.props.showBudgets}
                        label={'מבט שנתי'}
                        icon={'calendar_today'}/>

                    <Button
                        onClick={this.props.refreshBudget}
                        label={'ריענון'}
                        icon={'autorenew'}/>
                </div>

                {this.renderTopAction()}

            </div>
        );
    }
}

Period.contextTypes = {
    i18n: PropTypes.object,
    prompt: PropTypes.func,
};


export default Period;