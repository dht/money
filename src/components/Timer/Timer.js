import React, {Component} from 'react';
import './Timer.css';

class Timer extends Component {

    state = {}

    keydown = (ev) => {

        if (ev.which === 27) {
            this.props.onClose();
        }
    };

    componentDidMount() {
        window.addEventListener('keydown', this.keydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydown)
    }

    render() {
        const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

        return (
            <div className="Timer-container">
                <div className="toggle-off" onClick={this.props.onClose}>
                    <i className="material-icons">close</i>
                </div>
                <div className="content">
                    <ul>
                        {
                            arr.map(minutes => <li
                                className={minutes == this.props.minutes ? 'selected' : ''}
                                key={minutes}
                                onClick={() => this.props.onSelect(minutes)}>{minutes}</li>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Timer;
