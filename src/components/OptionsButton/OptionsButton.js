import React, {Component} from 'react';
import './OptionsButton.css';

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


export class OptionsButton extends Component {

    state = {
        options: [],
        value: '',
        selected: false,
    }

    onClick = (ev) => {
        const root = this.refs['input'],
            target = ev.target;

        if (!isClickInRoot(root, target)) {
            this.setState({selected: false});
        }
    }

    loadProps(props) {
        const {options, value} = props;

        this.setState({options: options, value});
    }

    componentDidMount() {
        this.loadProps(this.props);
        window.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClick);
    }

    componentWillReceiveProps(props) {
        this.loadProps(props);
    }

    selectOption = (option) => {
        this.setState({value: option.code, selected: false});
        this.props.onSelect(option.code)
    }

    renderOptions = () => {
        const {options, value} = this.state;

        return options.map(option => {
            const {code, title} = option,
                className = code === value ? 'selected' : '';

            return <li key={code} className={className} onClick={() => this.selectOption(option)}>{title}</li>
        })
    }

    onToggle = () => {
        let {selected} = this.state;
        selected = !selected;

        this.setState({selected});
    }

    render() {
        const {selected, value} = this.state;

        let className = selected ? 'selected' : '';

        return (
            <div className={`OptionsButton-container ${className}`} ref={"input"}>
                <div onClick={this.onToggle}>
                    {value}
                </div>
                <ul className="options">
                    {this.renderOptions()}
                </ul>
            </div>
        );
    }
}

export default OptionsButton;