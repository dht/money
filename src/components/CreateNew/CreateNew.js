import React, { Component } from "react";
import "./CreateNew.css";
import * as api from "../../utils/firebase";
import { guid8 } from "../../utils/guid";
import Spinner from "../Login/Spinner/Spinner";
import PropTypes from "prop-types";
import { modes } from "../../constants/constants";
import alerts from "../../utils/alerts";

export class CreateNew extends Component {
    state = {
        loading: true,
        user: null
    };

    createBoard = (user, mode) => {
        this.setState({ loading: true });

        const guid = guid8();
        api.createBoard(guid, user.uid, mode)
            .then(() => {
                this.props.setCurrentBoard(guid);
                this.props.history.push(`/${guid}/`);
            })
            .catch(e => {
                alerts.alert(e.message, "Ok");
            });
    };

    login = user => {
        if (!user) {
            this.props.history.push("/login");
            return;
        }

        const redirect = localStorage.getItem("redirect");

        if (redirect) {
            localStorage.setItem("redirect", "");
            document.location.href = redirect;
            setTimeout(() => {
                document.location.reload(true);
            }, 100);
        } else {
            this.createBoard(user, modes.TIME);
        }

        // this.setState({ user, loading: false });
    };

    componentDidMount() {
        api.currentUser().then(this.login);
    }

    renderLoading() {
        return (
            <div className="CreateNew-container">
                <Spinner size={60} />
            </div>
        );
    }

    render() {
        const { i18n } = this.context;
        const { loading } = this.state;

        if (loading) {
            return this.renderLoading();
        }

        return (
            <div className="CreateNew-container">
                <div className="title">{i18n.whatTypeOfBoard}</div>
                <ul>
                    <li onClick={() => this.createBoard(modes.TIME)}>
                        {i18n.time}
                    </li>
                    <li onClick={() => this.createBoard(modes.MONEY)}>
                        {i18n.money}
                    </li>
                </ul>
            </div>
        );
    }
}

CreateNew.contextTypes = {
    i18n: PropTypes.object,
    mode: PropTypes.string
};

export default CreateNew;
