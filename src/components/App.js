import React, { Component } from "react";
import "./App.css";
import "animate.css/animate.css";
import "react-datepicker/dist/react-datepicker.css";
import Week from "./Week/WeekContainer";
import Stats from "./Stats/StatsContainer";
import { getWeekNumber, setI18n } from "../utils/dateAndMoney";
import { currentUser } from "../utils/firebase";
import Spinner from "./Spinner/Spinner";
import PropTypes from "prop-types";
import classNames from "classnames";

import vex from "vex-js";
import Logout from "./Login/Logout/Logout";
import CreateNew from "./CreateNew/CreateNewContainer";
import Join from "./Login/Join/JoinContainer";
import Login from "./Login/Login/LoginContainer";
import ResetPassword from "./Login/ResetPassword/ResetPasswordContainer";
import { Redirect, Route, BrowserRouter, Switch } from "react-router-dom";
import Adhoc from "./Adhoc/AdhocContainer";
import * as api from "../utils/firebase";
import Permissions from "./Permissions/Permissions";
import { log } from "../utils/log";
import { modes } from "../constants/constants";
import Projects from "./Projects/ProjectsContainer";
import Logo from "./Logo/Logo";
import Spinner2 from "./Spinner/Spinner2";
import OneProject from "./OneProject/OneProjectContainer";
import type { i18nType } from "../constants/i18n/en";
import { qsToLocale, qsToLocaleParams } from "../utils/locale";

import moment from "moment";
import "moment/locale/de";
import "moment/locale/en-gb";
import "moment/locale/he";
import "moment/locale/it";
import "moment/locale/nl";
import "moment/locale/fr";
import "moment/locale/es";
import "moment/locale/hi";
import "moment/locale/zh-cn";

import { setLanguage } from "./Login/i18n/language";

vex.registerPlugin(require("vex-dialog"));
vex.defaultOptions.className = "vex-theme-uno";

const ToWeek = props => {
    const { match } = props,
        { params } = match || {},
        { boardId } = params;

    if (
        boardId === "login" ||
        boardId === "logout" ||
        boardId === "join" ||
        boardId === "permissions" ||
        boardId === "reset"
    )
        return null;

    const week = getWeekNumber();

    return <Redirect to={`/${boardId}/${week}`} />;
};

class App extends Component {
    getChildContext = () => {
        const { locale, isRTL, i18n } = this.props;
        const { mode } = this.state;

        return {
            i18n,
            locale,
            isRTL,
            mode
        };
    };

    state = {
        boardId: null,
        locale: "en"
    };

    loadBoard = boardId => {
        if (boardId !== this.state.boardId) {
            log("board change", boardId);

            this.setState({ boardId });

            if (boardId) {
                this.props.loadData(boardId);
                this.checkPermission();
            }
        } else {
            log("same board", boardId);
        }
    };

    checkPermission = () => {
        log("checking permissions");
        this.timeout = setTimeout(() => {
            api.checkPermissions().catch(() => {
                log("no permissions");
                this.props.navigateTo("/permissions");
                this.setState({ boardId: null });
            });
        }, 500);
    };

    componentWillReceiveProps(props) {
        const { mode, boardId, i18n, locale } = props;

        log(props);

        this.loadBoard(boardId);

        if (mode !== this.state.mode) {
            log("mode change", mode);
            this.setState({ mode });
            if (mode === modes.MONEY) {
                this.props.setShowList(true);
            }
        }

        if (locale !== this.state.locale) {
            moment.locale(locale);
            setLanguage(locale);
            vex.dialog.buttons.YES.text = i18n.save;
            vex.dialog.buttons.NO.text = i18n.cancel;
        }
    }

    loadPath = () => {
        const { path } = this.props;
        this.loadBoard(path.boardId);
    };

    componentDidMount() {
        const { locale } = this.props;

        log("componentDidMount");

        moment.locale(locale);

        currentUser().then(user => {
            if (!user) {
                log("no user is logged in");
                this.props.navigateTo("/login", true);
                this.setState({ boardId: null });
            } else {
                log("found user");
            }
        });

        this.loadPath();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    renderSpinner = () => {
        const { isLoading } = this.props;

        if (!isLoading) return null;

        return (
            <div className="spinner">
                <Spinner2 size={30} />
            </div>
        );
    };

    changeLanguage = ev => {
        this.props.setLocale(ev.target.value);
    };

    renderLanguagePicker() {
        const languages = [
            "en",
            "he",
            "fr",
            "zn-cn",
            "en-gb",
            "it",
            "de",
            "nl",
            "hi",
            "de"
        ];

        return (
            <div className="language-container">
                <select onChange={this.changeLanguage}>
                    {languages.map(lan => (
                        <option key={lan} value={lan}>
                            {lan}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    render() {
        const { isRTL } = this.props;

        return (
            <div className={classNames("App", { rtl: isRTL })}>
                <BrowserRouter>
                    <Switch id="router">
                        <Route exact path="/" component={CreateNew} />
                        <Route exact path="/join/" component={Join} />
                        <Route exact path="/login/" component={Login} />
                        <Route exact path="/logout/" component={Logout} />
                        <Route exact path="/reset/" component={ResetPassword} />
                        <Route
                            exact
                            path="/permissions/"
                            component={Permissions}
                        />
                        <Route exact path="/:boardId/" component={ToWeek} />
                        <Route exact path="/:boardId/adhoc" component={Adhoc} />
                        <Route
                            exact
                            path="/:boardId/projects"
                            component={Projects}
                        />
                        <Route
                            exact
                            path="/:boardId/projects/:projectId"
                            component={OneProject}
                        />
                        <Route exact path="/:boardId/stats" component={Stats} />
                        <Route exact path="/:boardId/:week" component={Week} />
                    </Switch>
                </BrowserRouter>

                {this.renderSpinner()}
                {this.renderLanguagePicker()}
            </div>
        );
    }
}

App.childContextTypes = {
    i18n: PropTypes.object,
    locale: PropTypes.string,
    isRTL: PropTypes.bool,
    mode: PropTypes.string
};

export default App;
