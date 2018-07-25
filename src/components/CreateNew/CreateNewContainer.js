import React from "react";
import {connect} from "react-redux";
import CreateNew from './CreateNew';
import {setCurrentBoard} from "../../reducers/appState/appState_actions";

const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setCurrentBoard: (boardId) => {
            dispatch(setCurrentBoard(boardId));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNew);