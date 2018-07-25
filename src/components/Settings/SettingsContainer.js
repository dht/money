import React from "react";
import {connect} from "react-redux";
import Settings from './Settings';
import Categories from "../Categories/CategoriesContainer";
import Mappings from "../Mappings/MappingsContainer";

const mapStateToProps = (state, ownProps) => {
    return {
        options: [
            {
                id: 'CATEGORIES',
                title: 'קטגוריות',
                screen: 'Categories',
            },
            {
                id: 'MAPPINGS',
                title: 'מיפוי הוצאות',
                screen: 'Mappings',
            },
            {
                id: 'PENSIONS',
                title: 'הגדרות פנסיה',
                screen: 'Pensions',
            }
        ]
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);