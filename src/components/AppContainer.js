import React from "react";
import {connect} from "react-redux";
import App from './App';
import {fetchAdhoc, fetchBoard} from "../reducers/app_thunks";
import {currentParamsSelector} from "../selectors/appStateSelector";
import {log} from "../utils/log";
import {setShowList} from "../reducers/appState/appState_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        ...currentParamsSelector(state),
        pathname: document.location.pathname
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadData: (boardId) => {
            if (!boardId) return;

            log('fetching board', boardId);
            dispatch(fetchBoard(boardId))
        },
        navigateTo: (path, saveRedirect) => {
            if (document.location.pathname === path) return;

            log('navigating', path);

            if (saveRedirect) {
                localStorage.setItem('redirect', document.location.pathname)
            }

            document.location.href = path;
        },
        setShowList: () => {
            dispatch(setShowList(true));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);