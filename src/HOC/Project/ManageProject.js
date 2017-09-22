import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { addTodo } from '../actions'
import { Card } from 'semantic-ui-react';
import ProjectCard from '../../components/Project/ProjectCard';
import DisplayMessage from '../../components/Shared/DisplayMessage';

class ManageProject extends Component {
    state = {
        projects: [],
        notification: null
    }

    componentDidMount() {
        return fetch('/project/all')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(
                    new Error('Unable to retrieve projects, please try again later.'));
            })
            .then((projects) => {
                this.setState({ projects })
            })
            .catch(err => {
                // console.error(err);
                const displayError = {
                    error: {
                        message: err.message,
                        isError: true
                    }
                };
                this.setState({
                    notification: displayError
                });
            });
    }

    render() {
        let Cards = [];
        this.state.projects.map((project) => {
            return Cards.push(<ProjectCard data={project} key={project._id} />);
        });
        return (
            <div className="List main">
                {
                    this.state.notification &&
                        <DisplayMessage status={this.state.notification} />
                }
                <Card.Group itemsPerRow={3}>
                    { Cards }
                </Card.Group>
            </div>
        )
    }
};
//ManageList = connect()(ManageList)

export default ManageProject