import React, { Component } from "react";
import "./Line.css";
import CashCredit from "../../CashCredit/CashCreditContainer";
import Resource from "../../Resource/Resource";

export class Line extends Component {
    state = {
        date: new Date()
    };

    render() {
        const { item } = this.props,
            { isCredit, title, sum } = item || {};

        return (
            <li
                className="Line-container line"
                key={item.id}
                data-id={item.order}
            >
                <div>
                    <CashCredit
                        isCredit={isCredit}
                        onToggle={() => this.props.onToggleCredit(item)}
                    />
                </div>

                {/*<div className="date" onClick={() => this.props.onEdit('date', item)}>*/}
                {/*{dateText}*/}
                {/*</div>*/}
                <div
                    className="title"
                    onClick={() => this.props.onEdit("title", item)}
                >
                    {title}
                </div>
                <div onClick={() => this.props.onEdit("sum", item)}>
                    <Resource value={sum} color={true} />
                </div>

                <div className="actions">
                    <i
                        className="material-icons"
                        onClick={() => this.props.duplicateItem(item)}
                    >
                        layers
                    </i>
                    <i
                        className="material-icons"
                        onClick={() => this.props.deleteItem(item)}
                    >
                        delete
                    </i>
                </div>
            </li>
        );
    }
}

export default Line;
