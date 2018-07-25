import React, {Component} from 'react';
import './Permissions.css';
import {Link} from "react-router-dom";

export class Permissions extends Component {

    state = {
    }

    render() {
        return (
            <div className="Permissions-container">
                <div className="title">
            אין לך הרשאות ללוח הזה
                </div>

                <Link to={'/login'}>
                    כניסה כמשתמש אחר
                </Link>
            </div>
        );
    }
}

export default Permissions;