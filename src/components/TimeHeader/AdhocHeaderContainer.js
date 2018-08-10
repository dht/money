import { connect } from "react-redux";
import TimeHeader from "./TimeHeader";
import { getPeriodNumber } from "../../utils/dateAndMoney";
import { adhocStartTimeSelector } from "../../selectors/adhocSelector";
import { withContext } from "../../utils/withContext";

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;

    return {
        title: i18n.session,
        todayUnit: getPeriodNumber(),
        subtitle: i18n.sandPaint,
        showTimePicker: true,
        startTime: adhocStartTimeSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withContext(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TimeHeader)
);
