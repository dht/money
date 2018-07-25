import React, {Component} from 'react';
import './ViewToggler.css';

export class ViewToggler extends Component {

    state = {}

    renderOption = (option) => {
        const {boardId, selected, week} = this.props,
            {id, icon, title, visible} = option || {};

        if (!visible) return null;

        let className = 'material-icons';

        if (selected === id) {
            className += ' selected';
        }

        return <i key={id}
                  onClick={() => this.props.onNavigate(boardId, id, week)}
                  className={className}
                  title={title}>{icon}</i>;
    }

    render() {
        const {options, showList} = this.props;

        if (!showList) {
            return null;
        }

        return (
            <div className="ViewToggler-container">
                {options.map(option => this.renderOption(option))}
            </div>
        );
    }
}

export default ViewToggler;