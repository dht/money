import React, {Component} from 'react';
import './Join.css';
import Input from "../Input/Input";
import {Link} from "react-router-dom";
import {validateEmail, validatePassword} from "../utils";
import Button from "../Button/Button";
import {getIsRTL, getLanguage} from "../i18n/language";

export class Join extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
        i18n: {},
        direction: 'ltr',
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

    join = () => {
        const {email, password, i18n} = this.state;

        const error = this.validate(email, password);
        this.setState({error});

        if (error) return null;

        this.setState({loading: true});

        this.props.join(email, password)
            .then(({user}) => {
                this.setState({loading: false});

                if (user) {
                    this.props.history.push(`/`)
                } else {
                    alert(i18n.ERROR_JOINING_TRY_LATER);
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
            <div className="Join-container" style={{direction: isRTL ? 'rtl' : 'ltr'}}>
                <h1>
                    {i18n.HEADER_JOIN}
                </h1>
                <Input
                    placeholder={i18n.PLACEHOLDER_EMAIL}
                    value={email}
                    onChange={(email) => this.setState({email})}/>
                <Input
                    type="password"
                    placeholder={i18n.PLACEHOLDER_PASSWORD_CHOOSE}
                    value={password}
                    onChange={(password) => this.setState({password})}
                    onEnter={this.join}/>

                <Button onClick={this.join} label={i18n.BUTTON_JOIN} loading={loading}/>

                {error ? <div className="error">{error}</div> : null}

                <div className="question">
                    {i18n.QUESTION_ALREADY_A_USER}
                </div>
                <Link to='/login'>
                    {i18n.LINK_LOGIN}
                </Link>
            </div>
        );
    }
}

export default Join;