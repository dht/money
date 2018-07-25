import React from "react";
import {connect} from "react-redux";
import List from './List';
import {addItem, removeItem, updateItem, setCurrentIndex} from "../../reducers/adhoc/adhoc_thunks";
import {adhocListSelector} from "../../selectors/adhocListSelector";
import {currentIndexAdhocSelector} from "../../selectors/adhocSelector";
import {currentWeekSelector} from "../../selectors/appStateSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        week: currentWeekSelector(state),
        currentIndex: currentIndexAdhocSelector(state),
        items: adhocListSelector(state),
        extraInfo: true,
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
        setCurrentIndex: (index) => {
            dispatch(setCurrentIndex(index));
        },
        postponeItem: () => {
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
