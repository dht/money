import React, {Component} from 'react';
import './Categories.css';
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Budgets from "../Budgets/Budgets";
import PropTypes from 'prop-types';

export class Categories extends Component {

    state = {
        newValue: '',
        values:[]
    }

    componentDidMount() {
        this.loadValues(this.props);
    }

    componentWillReceiveProps(props) {
        this.loadValues(props);
    }

    loadValues(props) {
        const {categories} = props;

        const values = categories.map(category => category.title);

        this.setState({values});
    }

    addCategory = (value) => {
        this.props.addCategory({title: value});
        this.setState({newValue: ""})
    }

    changeValue = (value, index) => {
        const {values} = this.state;
        values[index] = value;
        this.setState({values});
    }


    saveValue = (id, value) => {
        this.props.updateCategory(id, {title: value});
    }

    renderLine(category, index) {
        const {values} = this.state;

        return   <Input
            key={category.id}
            value={values[index]}
            onChange={(newValue) => {
                this.changeValue(newValue, index);
                this.saveValue(category.id, newValue)
            }}
            onEnter={(value) => this.saveValue(category.id, value)} />
    }

    render() {
        const {categories} = this.props;
        const {newValue} = this.state;

        return (
                <div className="Categories-container">
                    {
                        categories.map((category, index) => this.renderLine(category, index))
                    }
                    <Input
                        placeholder={"הוספת קטגוריה"}
                        value={newValue}
                        onChange={(newValue) => this.setState({newValue})}
                        onEnter={this.addCategory} />
                </div>
        );
    }
}

Categories.contextTypes = {
    i18n: PropTypes.object,
};

export default Categories;