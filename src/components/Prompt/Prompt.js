import React, {Component} from 'react';
import './Prompt.css';
import Input from "../Input/Input";
import Button from "../Button/Button";

const isClickInRoot = (root, target) => {
    let run = 0;

    while (run < 10) {

        if (root === target) return true;

        if (target && target.parentNode) {
            target = target.parentNode;
        }
        run++;
    }
}

export class Prompt extends Component {

    state = {
        value: ''
    }

    componentWillReceiveProps(props) {
    }

    keydown = (ev) => {
        if (ev.which === 27) {
            this.props.onClose();
        }
    };

    onClose = () => {
        this.setState({visible: false});
    }

    componentDidMount() {
        const {value} = this.props;

        window.addEventListener('keydown', this.keydown);

        this.timeout = setTimeout(() => {
            document.getElementById('prompt_input').focus();
            document.getElementById('prompt_input').select();
            window.addEventListener('click', this.onClick);
        }, 100)

        this.setState({value});
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('click', this.onClick);
        clearTimeout(this.timeout);
    }

    onClick = (ev) => {
        const root = this.refs['root'],
            target = ev.target;

        if (!isClickInRoot(root, target)) {
            this.props.onClose();
        }
    }

    onSave = () => {
        const {value} = this.state;
        this.props.onSave(value);
        this.props.onClose();
    }

    render() {
        const {value} = this.state;

        return (
            <div className="Prompt-container">
                <div className="dialog" ref={"root"}>
                    <div className="modal-header">
                        <div className="title">
                            {this.props.title}
                        </div>
                        <div className="close">
                            <i className="material-icons" onClick={this.props.onClose}>close</i>
                        </div>
                    </div>
                    <div className="content">
                        <Input id={"prompt_input"}
                               className="big" value={value}
                               onChange={value => this.setState({value})}
                               onEnter={this.onSave}
                        />
                        <Button label={"שמירה"} onClick={this.onSave}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Prompt;