import React from "react";
import PropTypes from "prop-types";

export const withContext = WrappedComponent => {
    class WithContext extends React.Component {
        render() {
            const { i18n } = this.context;
            return <WrappedComponent i18n={i18n} {...this.props} />;
        }
    }

    WithContext.contextTypes = {
        i18n: PropTypes.object
    };

    return WithContext;
};
