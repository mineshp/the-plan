import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create } from '../../actions/list';
import { listProjects } from '../../actions/project';
import UpdateListComponent from '../../components/List/UpdateList';

class UpdateList extends Component {
    constructor(props, context) {
        super(props, context);

        this.createOrUpdateProject = this.createOrUpdateList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropDownSelection = this.handleDropDownSelection.bind(this);
        this.handleHeaderInputChange = this.handleHeaderInputChange.bind(this);
        this.addHeading = this.addHeading.bind(this);
        this.removeHeading = this.removeHeading.bind(this);

        this.state = {
            headings: [
                {
                    name: '',
                    id: uuidv4()
                }
            ]
        };
    }

    componentWillMount() {
        this.props.actions.listProjects();
    }

    createOrUpdateList() {
        this.props.actions.create(this.state)
            .then((listCreated) => {
                /* istanbul ignore else */
                if (listCreated && listCreated.type === 'LIST_CREATION_SUCCESS') {
                    this.redirect();
                }
            });
    }

    addHeading() {
        const headings = this.state.headings;
        headings.push({
            id: uuidv4(),
            name: ''
        });
        this.setState(headings);
    }

    removeHeading(event, data) {
        const headingToDeleteIndex = this.state.headings.findIndex((heading) => heading.id === data.id);
        const headingsClone = Object.assign([], this.state.headings);
        if (headingToDeleteIndex > -1) {
            headingsClone.splice(headingToDeleteIndex, 1);
        }

        this.setState({
            headings: headingsClone
        });
    }

    handleChange(event) {
        this.setState({ listName: event.target.value });
    }

    handleHeaderInputChange(event, data) {
        if (!event.target.value || event.target.value === '') {
            return;
        }
        const headingToReplaceIndex = this.state.headings.findIndex((heading) => heading.id === data.id);
        const headingsClone = Object.assign([], this.state.headings);
        headingsClone[headingToReplaceIndex].name = event.target.value;

        this.setState({
            headings: headingsClone
        });
    }

    handleDropDownSelection(event, data) {
        event.preventDefault();
        const projectsData = [];
        data.value.map((projectName) => (
            projectsData.push({
                id: uuidv4(),
                name: projectName
            })
        ));
        this.setState({ projects: projectsData });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createOrUpdateList();
    }

    redirect() {
        this.context.router.history.push('/list/all');
    }

    render() {
        return (
            (!this.props.result || this.props.projectOptions.length === 0)
                ? <p>Loading Data...</p>
                : <UpdateListComponent
                    result={this.props.result}
                    projectOptions={this.props.projectOptions}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleDropDownSelection={this.handleDropDownSelection}
                    handleHeaderInputChange={this.handleHeaderInputChange}
                    addHeading={this.addHeading}
                    removeHeading={this.removeHeading}
                    headings={this.state.headings}
                />
        );
    }
}

UpdateList.propTypes = {
    actions: PropTypes.shape({
        create: PropTypes.func.isRequired,
        listProjects: PropTypes.func.isRequired
    }).isRequired,
    result: PropTypes.shape({
        _id: PropTypes.string
    }),
    projectOptions: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired
};

UpdateList.defaultProps = {
    listName: null,
    match: null,
    result: null,
    projects: { data: [] },
    headings: []
};

// Pull in the React Router context so router is available on this.context.router
UpdateList.contextTypes = {
    router: PropTypes.object
};

const buildProjectDropdownOptions = (allProjects) => {
    if (!allProjects.data) { return []; }
    return allProjects.data.map((project) => ({
        // eslint-disable-next-line no-underscore-dangle
        key: project._id,
        value: project.projectName,
        text: project.projectName
    }));
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => {
    const { projects } = state;

    // TODO: Build empty list object
    const emptyList = {
        listName: '',
        headings: [
            {
                name: '',
                position: 1,
                id: 'aaaa1-uuiui-jjj' // guid generator
            }
        ],
        items: []
    };

    const list = Object.assign({}, emptyList);
    return {
        result: list,
        projectOptions: buildProjectDropdownOptions(projects)
    };
};

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            create, listProjects
        }, dispatch)
    }
);

const UpdateListConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateList);

export {
    UpdateList,
    UpdateListConnectedComponent,
    buildProjectDropdownOptions // Exported for testing only
};
