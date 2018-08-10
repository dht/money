import { connect } from "react-redux";
import Projects from "./Projects";
import { toggleShowInWeek } from "../../reducers/projects/projects_thunks";
import { projectsShowInWeekSelector } from "../../selectors/projectsSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        showInWeek: projectsShowInWeekSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleShowInWeek: () => {
            dispatch(toggleShowInWeek());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);
