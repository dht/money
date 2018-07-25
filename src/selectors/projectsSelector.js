import { createSelector } from 'reselect'

const projectsSelector = state => state.projects

export const projectsItemsSelector = createSelector(
    projectsSelector,
    (projects) => projects.items || {}
)


export const projectsCurrentIdSelector = createSelector(
    projectsSelector,
    (projects) => projects.currentProjectId
)

export const projectsShowInWeekSelector = createSelector(
    projectsSelector,
    (projects) => projects.showInWeek
)

export const currentProjectSelector = createSelector(
    projectsItemsSelector,
    projectsCurrentIdSelector,
    (items, projectId) => {
        return items[projectId];
    }
)

export const projectsListSelector = createSelector(
    projectsItemsSelector,
    (items) => {
        const keys = Object.keys(items);

        return keys
            .map(key => items[key])
            .sort(function (a, b) {
                if (a.order === b.order) return 0;

                return a.order > b.order ? 1 : -1;
            })
    }
)

