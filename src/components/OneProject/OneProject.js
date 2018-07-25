import React, {Component} from 'react';
import './OneProject.css';
import ViewToggler from "../ViewToggler/ViewToggler";
import WeekHeaderOne from "../TimeHeader/OneProjectHeaderContainer";
import ListOne from "../List/ListProjectLinesContainer";
import {getParams} from "../../utils/params";
import Button from "../Button/Button";

export class OneProject extends Component {

    state = {
        projectId: null,
    }

    loadProject(projectId) {
        if (projectId !== this.state.projectId) {
            this.setState({projectId});
            this.props.setCurrentProject(projectId);
        }
    }

    componentDidMount() {
        const {projectId} = getParams(this.props);

        this.loadProject(projectId);
    }

    componentWillReceiveProps(props) {
        const {projectId} = getParams(props);

        this.loadProject(projectId);
    }

    goBack = () => {
        const {boardId} = getParams(this.props);

        this.props.history.push(`/${boardId}/projects`)
    }

    render() {
        const {projectId} = this.state;
        const listClassNames = ['list'];

        return (
            <div className="OneProject-container page-structure">
                <div className={listClassNames.join(' ')}>

                    <div className="actions">
                        <Button icon={"home"} onClick={this.goBack}/>
                    </div>

                    <WeekHeaderOne onChange={() => {
                    }}/>
                    <ListOne withSum={true} projectId={projectId}/>

                </div>
                <div className="content">
                </div>

                <ViewToggler/>

            </div>
        );
    }
}

export default OneProject;