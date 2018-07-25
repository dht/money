import React, {Component} from 'react';
import './Input.css';

export class Input extends Component {

    state = {}

    render() {
        return <div className="Input-container">
            <input id={this.props.id}
                   type="text"
                   style={this.props.style}
                   placeholder={this.props.placeholder}
                   value={this.props.value}
                   className={this.props.className}
                   onChange={(ev) => this.props.onChange(ev.target.value)}
                   onKeyDown={(ev) => {
                       if (ev.which === 13 && this.props.onEnter) {
                           ev.stopPropagation();
                           this.props.onEnter(ev.target.value)
                       }
                   }}/>
        </div>
    }
}

export default Input;