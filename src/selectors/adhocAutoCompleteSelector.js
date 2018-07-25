import {createSelector} from 'reselect'
import _ from 'lodash';

export const adhocSelector = state => state.adhoc

const adHocAutoCompleteRawSelector = createSelector(
    adhocSelector,
    adhoc => adhoc.autoComplete || {}
)

export const adHocAutoCompleteSelector = createSelector(
    adHocAutoCompleteRawSelector,
    autoComplete => {
        const keys = Object.keys(autoComplete);

        const arr = keys.map(key => autoComplete[key].title)
            .sort();

        return _.uniq(arr).map((title, index) => ({
            id: index,
            title,
        }));
    }
)
