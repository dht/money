import React from "react";
import { connect } from "react-redux";
import List from "./List";
import { listSelector } from "../../selectors/listSelector";
import {
    addItem,
    duplicateItem,
    removeItem,
    setCurrentIndex,
    updateItem
} from "../../reducers/appState/appState_thunks";
import {
    currentIndexSelector,
    currentWeekSelector
} from "../../selectors/appStateSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        week: currentWeekSelector(state),
        currentIndex: currentIndexSelector(state),
        items: listSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addItem: item => {
            dispatch(addItem(item));
        },
        updateItem: (id, data, immediate, noChangeLog) => {
            dispatch(updateItem(id, data, immediate, noChangeLog));
        },
        removeItem: id => {
            dispatch(removeItem(id));
        },
        duplicateItem: (item, weeks, occurrences) => {
            dispatch(duplicateItem(item, weeks, occurrences));
        },
        setCurrentIndex: index => {
            dispatch(setCurrentIndex(index));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
