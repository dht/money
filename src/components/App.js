import React, {Component} from 'react';
import './App.css';
import "animate.css/animate.css";
import 'react-datepicker/dist/react-datepicker.css';
import Week from "./Week/WeekContainer";
import Stats from "./Stats/StatsContainer";
import {getWeekNumber} from "../utils/date";
import {currentUser} from "../utils/firebase";
import Spinner from "./Spinner/Spinner";
import i18n from '../constants/i18n';
import PropTypes from 'prop-types';

import vex from 'vex-js';
import Logout from "./Login/Logout/Logout";
import CreateNew from "./CreateNew/CreateNewContainer";
import Join from "./Login/Join/JoinContainer";
import Login from "./Login/Login/LoginContainer";
import ResetPassword from "./Login/ResetPassword/ResetPasswordContainer";
import {Redirect, Route, BrowserRouter, Switch} from "react-router-dom";
import Adhoc from "./Adhoc/AdhocContainer";
import * as api from "../utils/firebase";
import Permissions from "./Permissions/Permissions";
import {log} from "../utils/log";
import {modes} from "../constants/constants";
import Projects from "./Projects/ProjectsContainer";
import Logo from "./Logo/Logo";
import Spinner2 from "./Spinner/Spinner2";
import OneProject from "./OneProject/OneProjectContainer";

vex.registerPlugin(require('vex-dialog'))
vex.defaultOptions.className = 'vex-theme-uno'
vex.dialog.buttons.YES.text = 'שמירה'
vex.dialog.buttons.NO.text = 'ביטול'

const ToWeek = (props) => {
    const {match} = props,
        {params} = match || {},
        {boardId} = params;

    if (boardId === 'login' ||
        boardId === 'logout' ||
        boardId === 'join' ||
        boardId === 'permissions' ||
        boardId === 'reset')
        return null;

    const week = getWeekNumber();

    return <Redirect to={`/${boardId}/${week}`}/>
}

class App extends Component {

    getChildContext = () => {
        const {mode} = this.state;

        return {
            i18n: i18n,
            mode,
        }
    };

    state = {
        boardId: null,
    };

    loadBoard = (boardId) => {
        if (boardId !== this.state.boardId) {
            log('board change', boardId);

            this.setState({boardId});

            if (boardId) {
                this.props.loadData(boardId);
                this.checkPermission();
            }
        } else {
            log('same board', boardId);
        }
    }


    checkPermission = () => {
        log('checking permissions');
        this.timeout = setTimeout(() => {
            api.checkPermissions()
                .catch(() => {
                    log('no permissions');
                    this.props.navigateTo('/permissions')
                    this.setState({boardId: null});
                })
        }, 500);
    }

    componentWillReceiveProps(props) {
        const {mode, boardId} = props;

        log(props);

        this.loadBoard(boardId);

        if (mode !== this.state.mode) {
            log('mode change', mode);
            this.setState({mode});
            if (mode ===modes.MONEY) {
                this.props.setShowList(true);
            }
        }
    }

    loadPath = () => {
        const {path} = this.props;
        this.loadBoard(path.boardId);
    }

    componentDidMount() {
        log('componentDidMount');

        currentUser()
            .then(user => {
                if (!user) {
                    log('no user is logged in');
                    this.props.navigateTo('/login', true);
                    this.setState({boardId: null});
                } else {
                    log('found user');
                }
            });

        this.loadPath();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    renderSpinner = () => {
        const {isLoading} = this.props;

        if (!isLoading) return null;

        return <div className="spinner">
            <Spinner2 size={30}/>
        </div>;
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch id="router">
                        <Route exact path="/" component={CreateNew}/>
                        <Route exact path="/join/" component={Join}/>
                        <Route exact path="/login/" component={Login}/>
                        <Route exact path="/logout/" component={Logout}/>
                        <Route exact path="/reset/" component={ResetPassword}/>
                        <Route exact path="/permissions/" component={Permissions}/>
                        <Route exact path="/:boardId/" component={ToWeek}/>
                        <Route exact path="/:boardId/adhoc" component={Adhoc}/>
                        <Route exact path="/:boardId/projects" component={Projects}/>
                        <Route exact path="/:boardId/projects/:projectId" component={OneProject}/>
                        <Route exact path="/:boardId/stats" component={Stats}/>
                        <Route exact path="/:boardId/:week" component={Week}/>
                    </Switch>
                </BrowserRouter>

                {this.renderSpinner()}

            </div>
        );
    }
}

App.childContextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string,
};

export default App;
