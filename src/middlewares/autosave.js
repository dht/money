const api_middleware = store => next => action => {

    let result = next(action);

        return result
}

export default api_middleware;
