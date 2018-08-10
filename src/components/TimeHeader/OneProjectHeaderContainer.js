import { connect } from "react-redux";
import TimeHeader from "./TimeHeader";
import { getPeriodNumber } from "../../utils/dateAndMoney";
import { currentProjectSelector } from "../../selectors/projectsSelector";
import { withContext } from "../../utils/withContext";

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;

    const project = currentProjectSelector(state) || {};

    return {
        subtitle: i18n.projectPlanning,
        title: project.title,
        todayUnit: getPeriodNumber(),
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
