import { connect } from "react-redux";
import Categories from "./Categories";
import { categoriesSelector } from "../../selectors/categoriesSelector";
import {
    addItem,
    removeItem,
    updateItem
} from "../../reducers/categories/category_thunks";

const mapStateToProps = (state, ownProps) => {
    return {
        categories: categoriesSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addCategory: item => {
            dispatch(addItem(item));
        },
        updateCategory: (id, item) => {
            dispatch(updateItem(id, item, true));
        },
        removeCategory: id => {
            dispatch(removeItem(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);
