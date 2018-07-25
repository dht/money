import React, {Component} from 'react';

export class Logo extends Component {
    render() {

        return <img style={{width:'100%'}} src={require('./uno.svg')}/>
    }
}

export default Logo;