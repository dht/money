import Autosuggest from 'react-autosuggest';
import React from "react";
import './Autocomplete.css';


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (items = [], value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : items.filter(item =>
        (item.title || '').toLowerCase().indexOf(inputValue) === 0
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.title}
    </div>
);

class Autocomplete extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
            highlighted: '',
        };
    }

    suggestInN = () => {
        const {value} = this.state;

        this.timeout = setTimeout(() => {
            this.props.onSelect({title: value});
        }, 300)
    }

    clearN = () => {
        clearTimeout(this.timeout);
    }

    clearHighlightedAutocomplete = () => {
        const {highlighted} = this.state;
        this.props.clearHighlightedAutocomplete(highlighted);
    }

    keydown = (ev) => {
        ev.ignore = true;

        if (ev.which === 13) {
            this.suggestInN();
        }
        if (ev.which === 8 && ev.metaKey) {
            this.clearHighlightedAutocomplete();
        }
    }

    componentDidMount() {
        const elem = document.querySelector('.react-autosuggest__input');
        elem.addEventListener('keydown', this.keydown);
    }

    componentWillUnmount() {
        const elem = document.querySelector('.react-autosuggest__input');
        elem.removeEventListener('keydown', this.keydown)
    }

    componentWillReceiveProps(props) {
        const {value} = props;

        if (value !== this.state.value) {
            this.setState({value});
        }
    }

    onSuggestionSelected = (event, {suggestion}) => {
        this.setState({value: suggestion.title});
        if (this.props.onSelect) {
            this.props.onSelect(suggestion);
            this.clearN();
        }
    }

    onChange = (event, {newValue, method}) => {
        this.setState({
            value: newValue
        });
    };

    onBlur = () => {
        setTimeout(() => {
            const {value} = this.state;
            if (this.props.onSelect) {
                this.props.onSelect({title: value});
            }
        }, 100);
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(this.props.items, value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionHighlighted = ({suggestion}) => {
        const {title} = suggestion || {};

        this.setState({highlighted: title});
    }

    render() {
        const {value, suggestions} = this.state;

        // Autosuggest will pass through all these props to the input.
        let inputProps = {
            placeholder: this.props.placeholder,
            onChange: this.onChange,
            onBlur: this.onBlur,
            value: ''
        };

        if (value) {
            inputProps['value'] = value;
        }

        // Finally, render it!
        return (<div className={'Autocomplete-container'}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionHighlighted={this.onSuggestionHighlighted}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    highlightFirstSuggestion={true}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default Autocomplete;