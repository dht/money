import React, {Component} from 'react';
import './CreateNew.css';
import * as api from "../../utils/firebase";
import {guid8} from "../../utils/guid";
import Spinner from "../Login/Spinner/Spinner";
import PropTypes from 'prop-types';
import {modes} from "../../constants/constants";
import alerts from "../../utils/alerts";

export class CreateNew extends Component {

    state = {
        loading: true,
        user: null,
    }

    createBoard = (mode) => {
        const {user} = this.state;

        this.setState({loading: true});

        const guid = guid8();
        api.createBoard(guid, user.uid, mode)
            .then(() => {
                this.props.setCurrentBoard(guid);
                this.props.history.push(`/${guid}/`);
            })
            .catch((e) => {
                alerts.alert(e.message, 'אוקיי');
            })
    }

    login = (user) => {
        if (!user) {
            this.props.history.push('/login');
            return;
        }

        const redirect = localStorage.getItem('redirect');

        if (redirect) {
            localStorage.setItem('redirect', '');
            document.location.href = redirect;
            setTimeout(() => {
                document.location.reload(true);
            }, 100)
            return;
        }

        this.setState({user, loading: false});
    }

    componentDidMount() {
        api.currentUser().then(this.login);
    }

    renderLoading() {
        return <div className="CreateNew-container">
            <Spinner size={60}/>
        </div>;
    }

    render() {
        const {loading} = this.state;

        if (loading) {
            return this.renderLoading();
        }

        return (
            <div className="CreateNew-container">
                <div className="title">איזה סוג של לוח?</div>
                <ul>
                    <li onClick={() => this.createBoard(modes.TIME)}>
                        זמן
                    </li>
                    <li onClick={() => this.createBoard(modes.MONEY)}>
                        כסף
                    </li>
                </ul>
            </div>
        );
    }
}

CreateNew.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string,
};


export default CreateNew;