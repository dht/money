import { connect } from "react-redux";
import Money from "./Resource";

const mapStateToProps = (state, ownProps) => {
    const { appState } = state,
        { timeUnit } = appState;

    return {
        unit: timeUnit
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Money);
