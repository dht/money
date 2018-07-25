import { createSelector } from 'reselect'
import {appStateSelector} from "./appStateSelector";


export const linesSelector = createSelector(
    appStateSelector,
    appState => appState.lines || {}
)

