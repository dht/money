import { connect } from "react-redux";
import Graph from "./Graph";
import { graphSelector } from "../../selectors/graphSelector";
import {
    loadGraphSettingsFromLocalStorage,
    setGraphRange,
    setGraphType
} from "../../reducers/graph/graphState_thunks";

const mapStateToProps = (state, ownProps) => {
    const { appState, graphState } = state,
        { currency } = appState,
        { graphType, graphRange } = graphState;

    return {
        graph: graphSelector(state),
        currency,
        graphType,
        graphRange
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setGraphType: value => {
            dispatch(setGraphType(value));
        },
        setGraphRange: value => {
            dispatch(setGraphRange(value));
        },
        loadGraphSettingsFromLocalStorage: () => {
            dispatch(loadGraphSettingsFromLocalStorage());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Graph);
