import { connect } from "react-redux";
import Settings from "./Settings";
import Categories from "../Categories/CategoriesContainer";
import Mappings from "../Mappings/MappingsContainer";
import {withContext} from "../../utils/withContext";

const mapStateToProps = (state, ownProps) => {
    const { i18n } = ownProps;

    return {
        options: [
            {
                id: "CATEGORIES",
                title: i18n.categories,
                screen: "Categories"
            },
            {
                id: "MAPPINGS",
                title: i18n.mapExpenses,
                screen: "Mappings"
            },
            {
                id: "PENSIONS",
                title: i18n.pensionSettings,
                screen: "Pensions"
            }
        ]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        method: () => {}
    };
};

export default withContext(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Settings)
);
