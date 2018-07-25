import React, {Component} from 'react';
import './List.css';
import ReactSortable from "react-sortablejs";
import {getNewOrder, lastOrder} from "../../utils/items";
import {middleOfTheWeek, parseDate} from "../../utils/date";
import Line from "../Line/Line";
import New from "../New/New";
import Categories from "../Categories/Categories";
import PropTypes from 'prop-types';
import alerts from "../../utils/alerts";


class List extends Component {
    state = {
        showTimer: false,
        timerTaskIndex: 0,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keydown);

        setTimeout(() => {
            const element = document.querySelector('input');
            if (element) {
                element.focus();
            }
        }, 0)
    }


    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydown)
    }

    addItem = ({isCredit = false, title, sum}) => {
        const {items, week} = this.props,
            order = lastOrder(items) + 1;

        const date = middleOfTheWeek(week);

        this.props.addItem({title, date, sum, order, isCredit, week});
    };


    keydown = (ev) => {
        let {currentIndex} = this.props;

        if (ev.ignore) return;

        if (ev.which === 38) {
            this.props.setCurrentIndex(currentIndex - 1);
        }

        if (ev.which === 40) {
            this.props.setCurrentIndex(currentIndex + 1);
        }
    };

    onToggleCredit = (item) => {
        const {id, isCredit} = item;

        this.props.updateItem(id, {isCredit: !isCredit}, true);
    }

    onEdit = (which, item) => {
        let defaultValue = item[which],
            {id} = item;

        if (which === 'date') {
            defaultValue = '';
        }

        const options = {
            yesText: 'שמירה',
            message: which,
            value: defaultValue,
            callback: (value) => {

                if (!value) return;

                switch (which) {
                    case 'date':
                        value = parseDate(value);
                        this.props.updateItem(id, {date: value});
                        break;

                    case 'title':
                        this.props.updateItem(id, {title: value});
                        break;

                    case 'sum':
                        this.props.updateItem(id, {sum: value});
                        break;
                }
            }
        };

        alerts.prompt(options);
    }

    deleteItem = ({id}) => {
        alerts.confirm('are you sure?', answer => {
            if (answer) {
                this.props.removeItem(id);
            }
        }, 'מחיקה')
    };

    duplicateItem = (item) => {
        alerts.prompt({
            yesText: 'אוקיי',
            message: 'every how many weeks?',
            value: '',
            callback: (weeks) => {
                alerts.prompt({
                    yesText: 'אוקיי',
                    message: 'occurrences?',
                    value: '',
                    callback: (occurrences) => {
                        if (weeks && occurrences) {
                            this.props.duplicateItem(item, weeks, occurrences);
                        }
                    }
                });
            }
        });
    };

    onSwap = (order, sortable, evt) => {
        let {items} = this.props,
            {oldIndex, newIndex} = evt;

        if (oldIndex === newIndex) return;

        const item = items[oldIndex] ||{},
            {id} = item;

        const delta = newIndex > oldIndex ? +1 : 0;

        const newOrder = getNewOrder(items, newIndex, delta)

        this.props.updateItem(id, {order: newOrder}, true, true);
    }

    postponeItem = (item) => {
        const options = {
            yesText: 'שמירה',
            message: 'to which week?',
            value: item.week,
            callback: (week) => {

                if (!week) return;

                const date = middleOfTheWeek(week);

                if (!this.props.postponeItem) {
                    this.props.updateItem(item.id, {week, date}, true, true);
                } else {
                    // multi postpone in project screen
                    this.props.postponeItem(item.id, item.week, week)

                }
            }
        };

        alerts.prompt(options);
    }

    renderItem(item, index) {
        let {currentIndex} = this.props;

        const done = (index < currentIndex);

        return <Line item={item} key={item.id}
                     done={done}
                     extraInfo={this.props.extraInfo}
                     showDrilldown={this.props.showDrilldown}
                     onEdit={this.onEdit}
                     middleColData={this.props.middleColData}
                     deleteItem={this.deleteItem}
                     duplicateItem={this.duplicateItem}
                     postponeItem={this.postponeItem}
                     onDrilldown={this.props.drilldown}
                     onToggleCredit={this.onToggleCredit}
        />
    }

    render() {
        const {items, placeholder, noAutoComplete} = this.props;


        return (
            <div className="List-container">
                <div className="top">
                    <New save={this.addItem}
                         noAutoComplete={noAutoComplete}
                         placeholder={placeholder}
                    />
                </div>
                <ReactSortable
                    tag="ul"
                    onChange={this.onSwap}>
                    {
                        items.map((item, index) => this.renderItem(item, index))
                    }
                </ReactSortable>
            </div>
        );
    }
}

List.contextTypes = {
    i18n: PropTypes.object,
};

export default List;
