import { connect } from "react-redux";
import CashCredit from "./CashCredit";

const mapStateToProps = (state, ownProps) => {
    const { appState } = state,
        { currency } = appState;

    return {
        currency
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {}
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CashCredit);
