import React, { Component } from "react";
import "./Mappings.css";
import Autocomplete from "../Autocomplete/Autocomplete";
import PropTypes from "prop-types";

export class Mappings extends Component {
    state = {};

    onSelect = (name, category) => {
        const previousCategoryId = name.categoryId,
            newCategoryId = category.id;

        this.props.addCategoryName(newCategoryId, { title: name.title });
        this.props.removeCategoryName(previousCategoryId, name.title);
    };

    componentDidMount() {
        setTimeout(() => {
            this.forceUpdate();
        }, 100);
    }

    renderLine(name, index) {
        const { i18n } = this.context;
        const { autoComplete } = this.props;

        return (
            <div key={index} className="row">
                <div className="mapping-title">{name.title}</div>
                <Autocomplete
                    items={autoComplete}
                    className="white"
                    placeholder={i18n.category}
                    onSelect={category => this.onSelect(name, category)}
                    value={name.categoryTitle}
                    id="first"
                />
            </div>
        );
    }

    render() {
        const { names } = this.props;

        return (
            <div className="Mappings-container">
                {names.map((name, index) => this.renderLine(name, index))}
            </div>
        );
    }
}

Mappings.contextTypes = {
    i18n: PropTypes.object
};

export default Mappings;
