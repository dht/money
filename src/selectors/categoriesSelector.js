import { createSelector } from "reselect";

const categoriesRawSelector = state => state.categories;

export const categoriesSelector = createSelector(
    categoriesRawSelector,
    categories => {
        const keys = Object.keys(categories);

        return keys.map(key => categories[key]);
    }
);

export const namesSelector = createSelector(categoriesSelector, categories => {
    return categories.map(category => {
        let { names } = category;
        const keys = Object.keys(names || {});

        names = keys.map(key => names[key].title);

        return {
            ...category,
            names
        };
    });
});

export const reverseNamesSelector = createSelector(namesSelector, items => {
    return items.reduce((output, item) => {
        let { id, title, names } = item;

        names.forEach(name => {
            output[name] = { categoryId: id, categoryTitle: title };
        });

        return output;
    }, {});
});
