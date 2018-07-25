import React, {Component} from 'react';
import './Settings.css';
import Modal from "../Modal/Modal";
import AllScreen from "./_settingsScreens";

export class Settings extends Component {

    state = {
        selectedId: 'CATEGORIES',
    }

    _getOption() {
        const {options} = this.props,
            {selectedId} = this.state;

        return options.reduce((output, option) => {
            return option.id === selectedId ? option : output;
        })
    }

    renderInnerSettings() {
        const selectedOption = this._getOption();

        if (!selectedOption) return null;

        const Comp = AllScreen[selectedOption.screen];

        return <Comp/>;
    }

    selectOption = ({id}) => {
        this.setState({selectedId: id});
    }

    renderList() {
        const {options} = this.props,
            {selectedId} = this.state;

        return <ul>
            {
                options.map(option => {
                    const {id, title} = option,
                        className = id === selectedId ? 'selected' : '';

                    return <li key={id}
                               className={className}
                               onClick={() => this.selectOption(option)}>
                        {title}
                    </li>;
                })
            }
        </ul>;
    }

    render() {
        return (
            <Modal onClose={this.props.onClose} title={'הגדרות'}>
                <div className="Settings-container">
                    <div className="settings-list">
                        {this.renderList()}
                    </div>
                    <div className="settings-content">
                        {
                            this.renderInnerSettings()
                        }
                    </div>
                </div>
            </Modal>

        );
    }
}

export default Settings;