const LOGIN_URIS = ['login', 'join', 'logout', 'reset'];
const STATS_URIS = ['stats', 'adhoc'];

export const getPathParams = () => {
    let params = {};
    const parts = document.location.pathname.split('/');

    if (parts.length === 1) return params;


    if (LOGIN_URIS.indexOf(parts[1]) < 0) {
        params.boardId = parts[1];
    }

    if (STATS_URIS.indexOf(parts[2]) < 0) {
        params.week = parts[2];
    }

    return params;
}

export const getParams = (props) => {
    const {match} = props || {},
        {params} = match || {};

    return params;
}

const views = {
    '/:boardId/:week' : 'WEEK',
    '/:boardId/adhoc' : 'AD_HOC',
    '/:boardId/projects' : 'PROJECTS',
    '/:boardId/projects/:projectId' : 'PROJECTS',
    '/:boardId/stats' : 'STATS',
    '/:boardId/week' : 'WEEK',
}

export const getView = (props) => {
    const {match} = props || {},
        {path} = match || {};

    return views[path];
}
