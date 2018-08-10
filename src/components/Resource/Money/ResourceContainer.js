import { connect } from "react-redux";
import Money from "./Resource";

const mapStateToProps = (state, ownProps) => {
    const { appState } = state,
        { locale } = appState;

    return {
        locale
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Money);
