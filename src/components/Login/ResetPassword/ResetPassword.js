import React, {Component} from 'react';
import './ResetPassword.css';
import Input from "../Input/Input";
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import {validateEmail} from "../utils";
import {getIsRTL, getLanguage} from "../i18n/language";

export class ResetPassword extends Component {

    state = {
        email: '',
        loading: false,
        done: false,
        i18n: {},
    }

    componentDidMount() {
        const isRTL = getIsRTL(),
            i18n = getLanguage();

        this.setState({i18n, isRTL});
    }

    validate = (email) => {
        const {i18n} = this.state;

        if (!validateEmail(email)) {
            return i18n.INVALID_EMAIL;
        }
    }

    reset = () => {
        const {email} = this.state;

        const error = this.validate(email);
        this.setState({error});

        if (error) return null;

        this.setState({loading: true});

        this.props.reset(email)
            .then(() => {
                this.setState({done: true});
            })
            .catch(e => {
                alert(e.message);
            })
            .finally(() => {
                this.setState({loading: false});
            })
    }

    renderSuccess() {
        const {i18n} = this.state;

        return (
            <div className="ResetPassword-container">
                <h1>{i18n.HEADER_RESET}</h1>
                <p>
                    {i18n.RESET_SUCCESS}
                </p>
                <Link to='/login'>{i18n.LINK_LOGIN}</Link>
            </div>
        );
    }

    render() {
        const {email, error, loading, done, i18n, isRTL} = this.state;

        if (done)
            return this.renderSuccess();

        return (
            <div
                className="ResetPassword-container"
                style={{direction: isRTL ? 'rtl' : 'ltr'}}>
                <h1>
                    {i18n.HEADER_RESET}
                </h1>
                <Input
                    placeholder={i18n.PLACEHOLDER_PASSWORD}
                    value={email}
                    onChange={(email) => this.setState({email})}/>
                <Button
                    isPink={true}
                    onClick={this.reset}
                    label={i18n.BUTTON_RESET}
                    loading={loading}/>

                {error ? <div className="error">{error}</div> : null}

                <div className="question">
                    {i18n.QUESTION_REMEMBER}
                </div>
                <Link to='/login'>
                    {i18n.LINK_LOGIN}
                </Link>
            </div>
        );
    }
}

export default ResetPassword;