import { connect } from "react-redux";
import Stats from "./Stats";
import { currentPeriodSelector } from "../../selectors/appStateSelector";
import { setCurrentPeriod } from "../../reducers/appState/appState_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        period: currentPeriodSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPeriodChange: period => {
            dispatch(setCurrentPeriod(period));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stats);
