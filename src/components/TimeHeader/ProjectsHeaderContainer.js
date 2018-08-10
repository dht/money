import { connect } from "react-redux";
import TimeHeader from "./TimeHeader";
import { getPeriodNumber } from "../../utils/dateAndMoney";
import { withContext } from "../../utils/withContext";

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;

    return {
        title: i18n.projects,
        subtitle: i18n.stepByStep,
        max: 52
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
