import React, { Component } from "react";
import "./CashCredit.css";

export class CashCredit extends Component {
    state = {};

    render() {
        const { currency } = this.props;

        return (
            <div className="CashCredit-container" onClick={this.props.onToggle}>
                {this.props.isCredit ? (
                    <div>
                        <i className="material-icons">credit_card</i>
                    </div>
                ) : (
                    <div>{currency}</div>
                )}
            </div>
        );
    }
}

export default CashCredit;
