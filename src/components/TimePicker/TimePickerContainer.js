import { connect } from "react-redux";
import TimePicker from "./TimePicker";
import { adhocStartTimeSelector } from "../../selectors/adhocSelector";
import { setStartTime } from "../../reducers/adhoc/adhoc_thunks";

const mapStateToProps = (state, ownProps) => {
    return {
        startTime: adhocStartTimeSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setStartTime: time => {
            dispatch(setStartTime(time));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimePicker);
