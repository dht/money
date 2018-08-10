import React from "react";
import { connect } from "react-redux";
import Autocomplete from "./Autocomplete";
import { autocompleteSelector } from "../../selectors/autocompleteSelector";
import { adHocAutoCompleteSelector } from "../../selectors/adhocAutoCompleteSelector";
import { isAdhocSelector } from "../../selectors/appStateSelector";
import { removeAutoComplete } from "../../reducers/adhoc/adhoc_thunks";

const mapStateToProps = (state, ownProps) => {
    const isAdHoc = isAdhocSelector(state);

    let items = isAdHoc
        ? adHocAutoCompleteSelector(state)
        : autocompleteSelector(state);

    if (ownProps.noAutoComplete) {
        items = [];
    }

    return {
        items
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearHighlightedAutocomplete: title => {
            dispatch(removeAutoComplete(title));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Autocomplete);
