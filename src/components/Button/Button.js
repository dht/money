import React, {Component} from 'react';
import './Button.css';

export class Button extends Component {

    state = {
    }


    render() {
        let {label, icon, round, light, className = ''} = this.props;

        className += ' Button-container';

        if (!label) {
            className += ' icon';
        }

        if (round) {
            className += ' round';
        }

        if (light) {
            className += ' light';
        }

        return (
            <div className={className} onClick={this.props.onClick}>
                <i className="material-icons">{icon}</i>
                <div className="title">{label}</div>
            </div>
        );
    }
}

export default Button;