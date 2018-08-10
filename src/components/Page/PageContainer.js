import { connect } from "react-redux";
import Page from "./Page";
import { pageSelector } from "../../selectors/pageSelector";
import { showPageSelector } from "../../selectors/appStateSelector";
import { togglePage } from "../../reducers/appState/appState_thunks";

const mapStateToProps = (state, ownProps) => {
    return {
        showPage: showPageSelector(state),
        title: pageSelector(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        togglePage: () => {
            dispatch(togglePage());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page);
