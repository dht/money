import React from "react";
import {connect} from "react-redux";
import Adhoc from './Adhoc';
import {adhocStartTimeSelector, currentIndexAdhocSelector} from "../../selectors/adhocSelector";
import {setIsAdHoc} from "../../reducers/appState/appState_actions";
import {showListSelector} from "../../selectors/appStateSelector";
import {clearAdhoc} from "../../reducers/adhoc/adhoc_thunks";

const mapStateToProps = (state, ownProps) => {
    return {
        showList: showListSelector(state),
        startTime: adhocStartTimeSelector(state),
        currentIndex: currentIndexAdhocSelector(state),
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setIsAdHoc: (value) => {
            dispatch(setIsAdHoc(value))
        },
        clearAdhoc: () => {
            dispatch(clearAdhoc())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Adhoc);