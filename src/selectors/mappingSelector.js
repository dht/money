import { createSelector } from "reselect";
import { autocompleteSelector } from "./autocompleteSelector";
import { reverseNamesSelector } from "./categoriesSelector";

export const mappingSelector = createSelector(
    autocompleteSelector,
    reverseNamesSelector,
    (lines, names) => {
        return lines.map(line => {
            const { title } = line || {},
                name = names[title] || {};

            return {
                ...line,
                ...name
            };
        });
    }
);
