import React, {Component} from 'react';
import './Logout.css';
import Spinner from "../Spinner/Spinner";
import {logout} from "../firebase";

export class Logout extends Component {

    state = {}

    componentDidMount() {
        logout()
            .then(() => {
                this.props.history.push('/');
            })
    }

    render() {
        return (
            <div className="Logout-container">
                <Spinner size={60}/>
            </div>
        );
    }
}

export default Logout;