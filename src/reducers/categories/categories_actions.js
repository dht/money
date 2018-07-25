import {ActionTypes} from "./categories";

export const setCategories = (value) => {

    return {
        type: ActionTypes.CATEGORY_SET_ITEMS,
        value,
    }
}

export const addCategory = (id, value) => {

    return {
        type: ActionTypes.CATEGORY_ADD_ITEM,
        id,
        value,
    }
}

export const updateCategory = (id, value) => {

    return {
        type: ActionTypes.CATEGORY_UPDATE_ITEM,
        id,
        value,

    }
}

export const removeCategory = (id) => {

    return {
        type: ActionTypes.CATEGORY_REMOVE_ITEM,
        id,

    }
}

export const addCategoryName = (id, nameId, value) => {

    return {
        type: ActionTypes.CATEGORY_ADD_NAME,
        id,
        nameId,
        value

    }
}

export const removeCategoryName = (id, nameId) => {

    return {
        type: ActionTypes.CATEGORY_REMOVE_NAME,
        id,
        nameId
    }
}