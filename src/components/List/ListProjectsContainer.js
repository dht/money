import React from "react";
import {connect} from "react-redux";
import List from './List';
import {addItem, removeItem, updateItem} from "../../reducers/projects/projects_thunks";
import {projectsListSelector} from "../../selectors/projectsSelector";
import {setCurrentProject} from "../../reducers/projects/projects_actions";
import withRouter from "react-router-dom/es/withRouter";
import {getParams} from "../../utils/params";

const mapStateToProps = (state, ownProps) => {
    return {
        week: 0,
        currentIndex: 0,
        items: projectsListSelector(state),
        placeholder: 'שעות',
        noAutoComplete: true,
        actionIcon: 'edit',
        showDrilldown: true,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addItem: (item) => {
            dispatch(addItem(item))
        },
        updateItem: (id, data, immediate, noChangeLog) => {
            dispatch(updateItem(id, data, immediate, noChangeLog))
        },
        removeItem: (id) => {
            dispatch(removeItem(id))
        },
        setCurrentIndex: () => {},
        drilldown:(item) => {
            const {boardId} = getParams(ownProps);
            ownProps.history.push(`/${boardId}/projects/${item.id}`);
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(List));
