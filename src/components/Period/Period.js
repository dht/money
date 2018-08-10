import React, { Component } from "react";
import "./Period.css";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import Resource from "../Resource/Resource";
import alerts from "../../utils/alerts";
import Percent from "../Percent/Percent";
import { planningModes } from "../../constants/constants";

export class Period extends Component {
    state = {};

    changePlannedFinished = (categoryId, value) => {
        const { period } = this.props;

        if (value === null) return;

        if (value.indexOf("+") >= 0) {
            value = value.replace("+", "");
        } else {
            value = -Math.abs(parseInt(value, 10));
        }

        if (value) {
            this.props.savePlannedBudget(period, categoryId, value);
        }
    };

    changePlanned = (categoryId, value) => {
        const { i18n } = this.context;

        const options = {
            yesText: i18n.save,
            message: i18n.planned,
            value,
            callback: value => {
                if (value === false) return;
                this.changePlannedFinished(categoryId, value);
            }
        };

        alerts.prompt(options);
    };

    renderLine = category => {
        const { budgets, period } = this.props,
            budget = budgets[period] || {},
            budgetForCategory = budget[category.id] || {},
            {
                actual,
                actualPercent,
                planned,
                plannedPercent
            } = budgetForCategory;

        let diff = Math.min(actual - planned, 0);

        return (
            <div className="row" key={category.id}>
                <div className="category-title">{category.title}</div>

                <Resource
                    className="p"
                    colorValue={0}
                    value={planned}
                    color={true}
                    onClick={() => this.changePlanned(category.id, planned)}
                />

                <Percent className="pp" value={plannedPercent} />

                <Resource
                    className="a"
                    colorValue={diff}
                    value={actual}
                    color={true}
                />

                <Percent className="ap" value={actualPercent} />
            </div>
        );
    };

    renderHeader() {
        const { i18n } = this.context;

        return (
            <div className="row header">
                <div className="category-title">{i18n.category}</div>
                <div className="th p">{i18n.planned}</div>
                <div className="th pp">{i18n.salaryPercent}*</div>
                <div className="th a">{i18n.actual}</div>
                <div className="th ap">{i18n.salaryPercent}*</div>
            </div>
        );
    }

    renderSummary() {
        const { sum, period } = this.props,
            summary = sum[period] || {},
            { planned, actual } = summary;

        return (
            <div className="row summary">
                <div className="category-title" />
                <Resource value={planned} color={true} className="p" />
                <Resource value={0} color={true} className="pp" />
                <Resource value={actual} color={true} className="a" />
                <Resource value={0} color={true} className="ap" />
            </div>
        );
    }

    toggleMode = () => {
        let { planningMode } = this.props;
        this.props.togglePlanningMode(planningMode);
    };

    renderTopAction = () => {
        return (
            <div className="top-actions">
                <Button onClick={this.toggleMode} icon={"view_week"} />
            </div>
        );
    };

    render() {
        const { i18n } = this.context;
        const { categories, planningMode } = this.props;

        let className;

        switch (planningMode) {
            case planningModes.PLANNED_VS_ACTUAL:
                className = "hide-pp hide-ap";
                break;
            case planningModes.PLANNED_AND_PERCENT:
                className = "hide-a hide-ap";
                break;
            case planningModes.ACTUAL_AND_PERCENT:
                className = "hide-p hide-pp";
                break;
            default:
                break;
        }

        return (
            <div className={`Period-container ${className}`}>
                {this.renderHeader()}
                {categories.map((category, index) =>
                    this.renderLine(category, index)
                )}
                {this.renderSummary()}

                <div className="actions">
                    <Button
                        onClick={this.props.showBudgets}
                        label={i18n.yearlyView}
                        icon={"calendar_today"}
                    />

                    <Button
                        onClick={this.props.refreshBudget}
                        label={i18n.refresh}
                        icon={"autorenew"}
                    />
                </div>

                {this.renderTopAction()}
            </div>
        );
    }
}

Period.contextTypes = {
    i18n: PropTypes.object,
    prompt: PropTypes.func
};

export default Period;
