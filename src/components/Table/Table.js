import React, { Component } from "react";
import "./Table.css";
import PropTypes from "prop-types";
import { Resource } from "../Resource/Resource";

export class Table extends Component {
    state = {};

    renderLines = () => {
        const { lines } = this.props;

        return lines.map(line => {
            this.total = 0;

            return (
                <tr key={line.id} className={line.nextLine ? "future" : ""}>
                    <td>{line.title}</td>
                    <td>{line.week}</td>
                    <td>
                        <Resource value={line.sum} color={true} />
                    </td>
                    <td>
                        <Resource value={line.total} color={true} />
                    </td>
                </tr>
            );
        });
    };
    render() {
        return (
            <div className="Table-container">
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>הוצאה</th>
                            <th>שבוע</th>
                            <th>סכום</th>
                            <th>משאבים</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderLines()}</tbody>
                </table>
            </div>
        );
    }
}

Table.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string
};

export default Table;
