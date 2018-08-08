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

        let titles = {};

        return keys
            .map(key => {
                if (titles[key]) return null;

                titles[key] = true;

                return {
                    id: key,
                    title: autoComplete[key].title
                }
            })
            .filter(item => item)
    }
)
