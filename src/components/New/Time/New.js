import React, { Component } from "react";
import "./New.css";
import Input from "../../Input/Input";
import CashCredit from "../../CashCredit/CashCreditContainer";
import Autocomplete from "../../Autocomplete/AutocompleteContainer";
import PropTypes from "prop-types";

function IsNumeric(val) {
    return Number(parseFloat(val)) === val;
}

export class New extends Component {
    state = {
        date: "",
        title: "",
        sum: ""
    };

    clear = () => {
        this.setState({ date: "", title: "", sum: "" });
        setTimeout(
            () => document.querySelector(".react-autosuggest__input").focus(),
            0
        );
    };

    validate = () => {
        let { title, sum } = this.state;

        sum = parseInt(sum, 10);

        return title && sum && IsNumeric(sum);
    };

    save = () => {
        let { title, sum } = this.state;

        const isValid = this.validate();

        if (!isValid) {
            this.focusOnSum();
            return;
        }

        this.props.save({ title, sum });
        this.clear();
    };

    focusOnSum = () => {
        const elm = document.querySelector(".New-container .sum");
        if (elm) {
            elm.focus();
        }
    };

    onSelect = ({ title }) => {
        this.setState({ title });
        this.focusOnSum();
    };

    render() {
        const { i18n } = this.context;
        const {
            placeholder = i18n.minutes,
            single,
            noAutoComplete
        } = this.props;
        const { title, sum } = this.state;

        return (
            <div className="New-container">
                {/*<Input placeholder={i18n.date} onChange={(date) => this.setState({date})} value={date} id="date"*/}
                {/*className="date" style={{width: 100, direction: 'ltr', textAlign: 'right'}}/>*/}
                <Autocomplete
                    className="title"
                    placeholder={i18n.newItem}
                    onSelect={this.onSelect}
                    value={title}
                    noAutoComplete={noAutoComplete}
                    id="first"
                />
                {single ? null : (
                    <Input
                        placeholder={placeholder}
                        onChange={sum => this.setState({ sum })}
                        value={sum}
                        className="sum"
                        onEnter={this.save}
                    />
                )}
                <button onClick={this.save}>{i18n.add}</button>
            </div>
        );
    }
}

New.contextTypes = {
    i18n: PropTypes.object
};

export default New;
