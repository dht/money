import React, {Component} from 'react';
import './Login.css';
import Input from "../Input/Input";
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import {validateEmail, validatePassword} from "../utils";
import {getIsRTL, getLanguage} from "../i18n/language";

export class Login extends Component {

    state = {
        email: localStorage.getItem('email'),
        password: '',
        loading: false,
        i18n: {}
    }

    componentDidMount() {
        const isRTL = getIsRTL(),
            i18n = getLanguage();

        this.setState({i18n, isRTL});
    }

    validate = (email, password) => {
        const {i18n} = this.state;

        if (!validateEmail(email)) {
            return i18n.INVALID_EMAIL;
        }

        if (!validatePassword(password)) {
            return i18n.INVALID_PASSWORD_SHORT;
        }
    }

    login = () => {
        const {email, password, i18n} = this.state;

        localStorage.setItem('email', email);

        const error = this.validate(email, password);
        this.setState({error});

        if (error) return null;

        this.setState({loading: true});

        this.props.login(email, password)
            .then(({user}) => {
                this.setState({loading: false});

                if (user) {
                    this.props.history.push(`/`)
                } else {
                    alert(i18n.ERROR_LOGIN_TRY_LATER);
                }
            })
            .catch(e => {
                this.setState({loading: false});
                alert(e.message);
            })
    }

    render() {
        const {email, password, error, loading, i18n, isRTL} = this.state;

        return (
            <div className="Login-container" style={{direction: isRTL ? 'rtl' : 'ltr'}}>
                <h1>
                    {i18n.HEADER_LOGIN}
                </h1>
                <Input
                    placeholder={i18n.PLACEHOLDER_EMAIL}
                    value={email}
                    onChange={(email) => this.setState({email})}/>
                <Input
                    type="password"
                    placeholder={i18n.PLACEHOLDER_PASSWORD}
                    value={password}
                    onChange={(password) => this.setState({password})}
                    onEnter={this.login}/>
                <Button
                    isGold={true}
                    onClick={this.login}
                    label={i18n.BUTTON_LOGIN}
                    loading={loading}/>

                {error ? <div className="error">{error}</div> : null}

                <div className="row">
                    <div>
                        <div className="question">
                            {i18n.QUESTION_NO_USER}
                        </div>
                        <Link to='/join'>
                            {i18n.LINK_JOIN}
                        </Link>
                    </div>
                    <div>
                        <div className="question">
                            {i18n.QUESTION_FORGOT_PASSWORD}
                        </div>

                        <Link to='/reset'>
                            {i18n.LINK_RESET}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;