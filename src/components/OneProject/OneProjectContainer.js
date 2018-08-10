import React from "react";
import { connect } from "react-redux";
import OneProject from "./OneProject";
import { setCurrentProject } from "../../reducers/projects/projects_actions";

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setCurrentProject: projectId => {
            dispatch(setCurrentProject(projectId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OneProject);
