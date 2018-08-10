import React, { Component } from "react";
import "./Budgets.css";
import Modal from "../Modal/Modal";
import Resource from "../Resource/Resource";
import PropTypes from "prop-types";

export class Budgets extends Component {
    state = {};

    renderColumnHeader = () => {
        let arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(<div key={i}>{i}</div>);
        }
        return <div className="row col-header">{arr}</div>;
    };

    renderColumns = category => {
        let arr = [];
        const { budgets } = this.props;

        for (let i = 1; i <= 10; i++) {
            const week = budgets[i] || {},
                budget = week[category.id] || {},
                actual = budget.actual;

            arr.push(
                <div key={i}>
                    <Resource value={actual} color={true} />
                </div>
            );
        }
        return (
            <div key={category.id} className="row">
                {arr}
            </div>
        );
    };

    renderLine(category) {
        return (
            <div key={category.id} className="row">
                <div className="budget-title">{category.title}</div>
            </div>
        );
    }

    render() {
        const { i18n } = this.context;
        const { categories } = this.props;

        return (
            <Modal onClose={this.props.onClose} title={i18n.yearlyView}>
                <div className="Budgets-container">
                    <div className="first">
                        <div className="row">
                            <div className="budget-title">-</div>
                        </div>
                        {categories.map((category, index) =>
                            this.renderLine(category, index)
                        )}
                    </div>
                    <div className="second">
                        {this.renderColumnHeader()}
                        {categories.map((category, index) =>
                            this.renderColumns(category, index)
                        )}
                    </div>
                </div>
            </Modal>
        );
    }
}

Budgets.contextTypes = {
    i18n: PropTypes.object
};

export default Budgets;
