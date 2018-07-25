import React from "react";
import {connect} from "react-redux";
import Mappings from './Mappings';
import {addItemName, removeItemName,} from "../../reducers/categories/category_thunks";
import {mappingSelector} from "../../selectors/mappingSelector";
import {autocompleteCategoriesSelector} from "../../selectors/autocompleteSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        names: mappingSelector(state),
        autoComplete: autocompleteCategoriesSelector(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCategoryName: (categoryId, item) => {
            dispatch(addItemName(categoryId, item))
        },
        removeCategoryName: (categoryId, title) => {
            dispatch(removeItemName(categoryId, title))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mappings);