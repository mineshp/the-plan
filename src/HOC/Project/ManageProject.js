import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { addTodo } from '../actions'
import { Card } from 'semantic-ui-react';
import ProjectCard from '../../components/Project/ProjectCard';

class ManageList extends Component {
    state = { projects: [] }

    componentDidMount() {
        fetch('/project/all')
            .then(res => res.json())
            .then(projects => this.setState({ projects }))
    };

    render() {
        let Cards = [];
        this.state.projects.map((project) => {
            return Cards.push(<ProjectCard data={project} key={project._id} />);
        });
        return (
            <div className="List main">
                <Card.Group itemsPerRow={3}>
                    { Cards }
                </Card.Group>
            </div>
        )
    }
};
//ManageList = connect()(ManageList)

export default ManageList