import { connect } from "react-redux";
import ViewToggler from "./ViewToggler";
import { getWeekNumber } from "../../../utils/dateAndMoney";
import {
    currentBoardSelector,
    currentWeekSelector,
    showListSelector
} from "../../../selectors/appStateSelector";
import withRouter from "react-router-dom/es/withRouter";
import { getView } from "../../../utils/params";
import { withContext } from "../../../utils/withContext";

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;

    return {
        selected: getView(ownProps),
        week: currentWeekSelector(state),
        showList: showListSelector(state),
        boardId: currentBoardSelector(state),
        options: [
            {
                id: "WEEK",
                icon: "calendar_today",
                title: i18n.showWeekly,
                visible: true
            },
            {
                id: "AD_HOC",
                icon: "timer",
                title: i18n.session,
                visible: true
            },
            {
                id: "PROJECTS",
                icon: "view_quilt",
                title: i18n.projects,
                visible: true
            }
        ]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNavigate: (boardId, toWhere, week = getWeekNumber()) => {
            switch (toWhere) {
                case "WEEK":
                    ownProps.history.push(`/${boardId}/${week}`);
                    return;
                case "STATS":
                    ownProps.history.push(`/${boardId}/stats`);
                    return;
                case "AD_HOC":
                    ownProps.history.push(`/${boardId}/adhoc`);
                    return;
                case "PROJECTS":
                    ownProps.history.push(`/${boardId}/projects`);
                    return;
            }
        }
    };
};

export default withContext(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(ViewToggler)
    )
);
