import { createSelector } from 'reselect'
import {adhocLinesSelector, adhocStartTimeSelector} from "./adhocSelector";
import moment from "moment";

export const adhocListSelector = createSelector(
    adhocStartTimeSelector,
    adhocLinesSelector,
    (startTime, lines) => {
        const keys = Object.keys(lines);

        let time = moment(startTime, ['h:m a', 'H:m']);

        return keys
            .map(key => lines[key])
            .sort(function (a, b) {
                if (a.order === b.order) return 0;

                return a.order > b.order ? 1 : -1;
            })
            .map(item => {
                const {sum = 0} = item;

                item.startTime = time.format('LT')
                time.add(sum || 0, 'minutes');

                return item;
            })
    }
)

