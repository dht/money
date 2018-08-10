import * as api from "../../utils/firebase";
import * as actions from "./categories_actions";
import categories from "./categories";

export const addItem = item => {
    return dispatch => {
        api.addCategory(item).then(({ key }) => {
            item.id = key;
            dispatch(actions.addCategory(key, item));
        });
    };
};

export const updateItem = (id, data, immediate) => {
    return dispatch => {
        if (immediate) {
            dispatch(actions.updateCategory(id, data));
        }

        api.updateCategory(id, data).then(() => {
            if (!immediate) {
                dispatch(actions.updateCategory(id, data));
            }
        });
    };
};

export const removeItem = id => {
    return dispatch => {
        api.removeCategory(id).then(() => {
            dispatch(actions.removeCategory(id));
        });
    };
};

export const addItemName = (categoryId, item) => {
    return dispatch => {
        api.addCategoryName(categoryId, item).then(({ key }) => {
            item.id = key;
            dispatch(actions.addCategoryName(categoryId, key, item));
        });
    };
};

export const removeItemName = (categoryId, title) => {
    return (dispatch, getState) => {
        const state = getState(),
            { categories } = state,
            category = categories[categoryId] || {},
            { names } = category || {};

        const id = Object.keys(names || {}).reduce((output, key) => {
            const name = names[key];
            if (name.title === title) {
                output = name.id;
            }

            return output;
        }, null);

        if (!id) return;

        api.removeCategoryName(categoryId, id).then(() => {
            dispatch(actions.removeCategoryName(categoryId, id));
        });
    };
};
