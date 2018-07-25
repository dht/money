import React, {Component} from 'react';
import './Spinner.css';

export class Spinner extends Component {
    render() {
        const {size = 23} = this.props;

        return (
            <div className={`Spinner-container2 ${this.props.className}`}>
                <img style={{width:'100%'}} src={require('./uno.svg')}/>
            </div>
        );
    }
}

export default Spinner;