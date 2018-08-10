import { connect } from "react-redux";
import List from "./List";
import {
    addItem,
    removeItem,
    updateItem
} from "../../reducers/appState/appState_thunks";
import { listProjectSelector } from "../../selectors/listSelector";
import { middleOfTheWeek } from "../../utils/dateAndMoney";
import { multiPostpone } from "../../reducers/projects/projects_thunks";
import { withContext } from "../../utils/withContext";

const swapToProjectOrder = item => {
    if (!item.order) return item;

    const newItem = { ...item };
    newItem.orderProject = newItem.order;
    delete newItem.order;
    return newItem;
};

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;

    return {
        week: 0,
        currentIndex: 0,
        items: listProjectSelector(state),
        placeholder: i18n.week,
        middleColData: "week"
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addItem: item => {
            item.week = item.sum;
            item.date = middleOfTheWeek(item.week);
            item.sum = 20;
            item.project = ownProps.projectId;
            item.orderProject = item.order;
            item.order = Math.random() * 100;

            dispatch(addItem(item));
        },
        updateItem: (id, data, immediate, noChangeLog) => {
            dispatch(
                updateItem(id, swapToProjectOrder(data), immediate, noChangeLog)
            );
        },
        removeItem: id => {
            dispatch(removeItem(id));
        },
        setCurrentIndex: index => {},
        postponeItem: (itemId, fromWeek, toWeek) => {
            dispatch(multiPostpone(itemId, fromWeek, toWeek));
        }
    };
};

export default withContext(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(List)
);
