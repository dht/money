export const graphTypes = {
    B: 'B',
    P: 'P',
    I: 'I',
    M: 'M',
    H: 'H',
    S: 'S',
}

export const graphRanges = {
    T: 'T',
    Y: 'Y',
    Y2: '2Y',
    Y3: '3Y',
    Y4: '4Y',
    Y5: '5Y',
    Y10: '10',
}

export const initialState = {
    graphType: graphTypes.P,
    graphRange: graphRanges.Y,
};

export const ActionTypes = {
    SET_GRAPH_TYPE: 'SET_GRAPH_TYPE',
    SET_GRAPH_RANGE: 'SET_GRAPH_RANGE',
};


const graphState = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.SET_GRAPH_TYPE:

            return {
                ...state,
                graphType: action.value
            }

        case ActionTypes.SET_GRAPH_RANGE:

            return {
                ...state,
                graphRange: action.value
            }


        default:
            return state
    }

}

export default graphState;

