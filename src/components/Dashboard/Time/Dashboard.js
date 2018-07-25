import React, {Component} from 'react';
import './Dashboard.css';
import Button from "../../Button/Button";
import Menu from "../../Menu/Menu";
import Page from "../../Page/PageContainer";

export class Dashboard extends Component {

    state = {}

    nudgeCurrentIndex = (delta) => {
        const {adhoc} = this.props;

        if (adhoc) {
            this.props.nudgeCurrentIndexAdhoc(delta);
        } else {
            this.props.nudgeCurrentIndex(delta);
        }
    }

    renderLoading = () => {
        return <div className="Dashboard-container">
        </div>
    }

    render() {
        let {currentItem, adhoc, isLoading, currentIndex} = this.props,
            {startTime, title, sum} = currentItem || {},
            done = !currentItem,
            empty = done && currentIndex === 0;

        if (isLoading) {
            return this.renderLoading();
        }

        let subtitle = `כ- ${sum} דקות`,
            showButton = true;

        if (done) {
            title = adhoc ? 'הסשן הסתיים!' : 'השבוע הסתיים!';
            subtitle = '';
            showButton = false;
        }

        if (empty) {
            title = '';
        }

        return (
            <div className="Dashboard-container">
                {startTime ? <div className="startTime">
                    {startTime}
                </div> : null}

                <div className={`title ${empty ? 'empty' : ''}`}>
                    {title}
                </div>
                <div className="duration">
                    {subtitle}
                </div>
                {showButton ? <div>
                    <Button
                        icon={"done"}
                        round={true}
                        onClick={() => this.nudgeCurrentIndex(+1)}/>
                </div> : null}

                <Menu/>

                <Page done={done}/>
            </div>
        );
    }
}

export default Dashboard;