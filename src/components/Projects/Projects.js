import React, {Component} from 'react';
import './Projects.css';
import ViewToggler from "../ViewToggler/ViewToggler";
import WeekHeader from "../TimeHeader/ProjectsHeaderContainer";
import List from "../List/ListProjectsContainer";
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

export class Projects extends Component {

    state = {}

    render() {
        const listClassNames = ['list'];
        return (
            <div className="Projects-container page-structure">
                <div className={listClassNames.join(' ')}>

                    <WeekHeader onChange={() => {
                    }}/>

                    <List withSum={true}/>

                    <div className="hide-projects">
                        <Toggle
                            defaultChecked={this.props.showInWeek}
                            onChange={this.props.toggleShowInWeek}
                            icons={{
                                unchecked: null,
                            }}
                        />
                    </div>

                </div>
                <div className="content">
                </div>

                <ViewToggler/>

            </div>
        );
    }
}

export default Projects;