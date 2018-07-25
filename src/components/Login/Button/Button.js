import React, {Component} from 'react';
import './Button.css';
import Spinner from "../Spinner/Spinner";

export class Button extends Component {
    render() {
        const {label, loading, isGold, isPink} = this.props,
            className = ['Login-button-container'];

        let inner = !loading ? label : [label, <Spinner key={"spinner"} className="spinner"/>];

        if (isPink) {
            className.push('pink');
        }

        if (isGold) {
            className.push('gold');
        }

        if (loading) {
            className.push('working');
        }

        return (<button className={className.join(' ')} onClick={this.props.onClick}>
            {inner}
            </button>);
    }
}

export default Button;