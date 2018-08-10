import React, { Component } from "react";
import "./Line.css";
import Resource from "../../Resource/Resource";

export class Line extends Component {
    state = {
        date: new Date()
    };

    render() {
        const {
                item,
                extraInfo,
                done,
                showDrilldown,
                middleColData = "sum"
            } = this.props,
            { title, sum, startTime } = item || {},
            classNames = ["Line-container", "line"];

        if (done) {
            classNames.push("done");
        }

        let middle = middleColData ? item[middleColData] : sum;

        return (
            <li
                className={classNames.join(" ")}
                key={item.id}
                data-id={item.order}
            >
                {extraInfo ? <div className="extra">{startTime}</div> : null}

                <div
                    className="title"
                    onClick={() => this.props.onEdit("title", item)}
                >
                    {title}
                </div>
                {showDrilldown ? null : (
                    <div onClick={() => this.props.onEdit(middleColData, item)}>
                        <Resource value={middle} color={true} />
                    </div>
                )}

                <div className="actions">
                    {showDrilldown ? (
                        <i
                            className="material-icons"
                            onClick={() => this.props.onDrilldown(item)}
                        >
                            view_list
                        </i>
                    ) : (
                        <i
                            className="material-icons"
                            onClick={() => this.props.postponeItem(item)}
                        >
                            arrow_back
                        </i>
                    )}
                    {showDrilldown ? null : (
                        <i
                            className="material-icons"
                            onClick={() => this.props.deleteItem(item)}
                        >
                            delete
                        </i>
                    )}
                </div>
            </li>
        );
    }
}

export default Line;
