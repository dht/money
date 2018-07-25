import { createSelector } from 'reselect'
import {linesSelector} from "./linesSelector";
import _ from 'lodash';
import {categoriesSelector} from "./categoriesSelector";

export const autocompleteSelector = createSelector(
    linesSelector,
    (lines) => {
        const keys = Object.keys(lines);

        const arr = keys
            .map(key => lines[key].title)
            .sort();

        return _.uniq(arr).map((title, index) => ({
            id: index,
            title,
        }));
    }
)

export const autocompleteCategoriesSelector = createSelector(
    categoriesSelector,
    (categories) => {
        return categories;
    }
)
