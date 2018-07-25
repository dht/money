import React from "react";
import {connect} from "react-redux";
import Budgets from './Budgets';
import {categoriesSelector} from "../../selectors/categoriesSelector";
import {addItem, removeItem, updateItem} from "../../reducers/categories/category_thunks";
import {budgetSelector} from "../../selectors/budgetsSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: categoriesSelector(state),
        budgets: budgetSelector(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCategory: (item) => {
            dispatch(addItem(item))
        },
        updateCategory: (id, item) => {
            dispatch(updateItem(id, item, true))
        },
        removeCategory: (id) => {
            dispatch(removeItem(id))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Budgets);