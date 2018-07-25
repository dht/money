import React from "react";
import {connect} from "react-redux";
import ViewToggler from './ViewToggler';
import {getWeekNumber} from "../../../utils/date";
import {currentBoardSelector, currentWeekSelector} from "../../../selectors/appStateSelector";
import withRouter from "react-router-dom/es/withRouter";
import {getView} from "../../../utils/params";

const mapStateToProps = (state, ownProps) => {

    return {
        selected: getView(ownProps),
        week: currentWeekSelector(state),
        boardId: currentBoardSelector(state),
        options: [
            {
                id: 'WEEK',
                icon: 'calendar_today',
                title: 'הצג מבט שבועי',
                visible: true,
            },
            {
                id: 'STATS',
                icon: 'show_chart',
                title: 'הצג גרפים',
                visible: true,
            }
        ]
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNavigate: (boardId, toWhere, week = getWeekNumber()) => {
            switch (toWhere) {
                case 'WEEK':
                    ownProps.history.push(`/${boardId}/${week}`);
                    return;
                case 'STATS':
                    ownProps.history.push(`/${boardId}/stats`);
                    return;
                case 'AD_HOC':
                    ownProps.history.push(`/${boardId}/adhoc`);
                    return;
            }

        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewToggler));