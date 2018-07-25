import { createSelector } from 'reselect'
import {currentIndexSelector} from "./appStateSelector";
import {listByDateSelector} from "./listSelector";

const array = (number = 52) => {
    return [...Array(number).keys()];
}

export const graphSelector = createSelector(
    listByDateSelector,
    currentIndexSelector,
    (lines, currentIndex) => {
        let total = 0;

        return lines
            .reduce((output, item) => {
                total += parseInt(item.sum, 10) || 0;
                output[item.month] = total;

                return output;
            }, {})

    }
)
