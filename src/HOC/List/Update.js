import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create, retrieveListById, update } from '../../actions/list';
import { listProjects } from '../../actions/project';
import { addNotification } from '../../actions/notification';
import UpdateListComponent from '../../components/List/UpdateList';
import { addOrRemoveItems, buildListData, listSetupIsComplete, validateHeadings } from '../../helpers/validators/list';
import LoadingComponent from '../../components/Shared/Loading';

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
            ],
            items: [],
            projects: [],
            result: {}
        };
    }

    async componentWillMount() {
        this.props.actions.listProjects();
        if (this.props.match.params && this.props.match.params.id) {
            const listId = this.props.match.params.id;
            await this.props.actions.retrieveListById(listId)
                .then((listRetrieved) => {
                    /* istanbul ignore else */
                    if (listRetrieved.type === 'LIST_RETRIEVED') {
                        const headingsClone = Object.assign([], listRetrieved.data.headings);
                        const itemsClone = Object.assign([], listRetrieved.data.items);
                        this.setState({
                            headings: headingsClone,
                            items: itemsClone
                        });
                    }
                });
        }
    }

    setupNewList() {
        const validatedHeadings = validateHeadings(this.state.headings);
        const { user } = this.props.authentication;
        const setupListState = Object.assign(
            {}, this.state, { headings: validatedHeadings }, { owner: user.username });

        this.props.actions.create(setupListState)
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.redirect();
            });
    }

    updateList() {
        const listObject = buildListData(this.props.result, this.state);
        this.props.actions.update(listObject)
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.redirect();
            });
    }

    createOrUpdateList() {
        if (this.props.result && this.props.result._id) { // eslint-disable-line no-underscore-dangle
            this.updateList();
        } else {
            this.setupNewList();
        }
    }

    addHeading() {
        const headingsClone = Object.assign([], this.state.headings);
        headingsClone.push({
            id: uuidv4(),
            name: ''
        });

        this.setState({
            headings: headingsClone
        });

        this.addItemColumn(this.state.items);
    }

    addItemColumn(itemsExist) {
        const ADD_ACTION = 'add';
        if (itemsExist.length > 0) {
            const itemsClone = addOrRemoveItems(ADD_ACTION, itemsExist);
            this.setState({
                items: itemsClone
            });
        }
    }

    removeHeading(event, data) {
        const headingToDeleteIndex = this.state.headings.findIndex((heading) => heading.id === data.id);
        const headingsClone = Object.assign([], this.state.headings);

        if (headingToDeleteIndex > -1) {
            headingsClone.splice(headingToDeleteIndex, 1);
            this.removeItemColumn(this.state.items, headingToDeleteIndex);
        }

        this.setState({
            headings: headingsClone
        });
    }

    removeItemColumn(itemsExist, removeAtPosition) {
        const REMOVE_ACTION = 'remove';
        if (itemsExist.length > 0) {
            const itemsClone = addOrRemoveItems(REMOVE_ACTION, itemsExist, removeAtPosition);
            this.setState({
                items: itemsClone
            });
        }
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
        if (listSetupIsComplete(this.state, this.props.result)) {
            this.createOrUpdateList();
        }
    }

    redirect() {
        this.context.router.history.push('/list/all');
    }

    render() {
        const { projectOptions, result } = this.props;

        return (
            !result || Array.isArray(result) || projectOptions.length === 0
                ? <LoadingComponent />
                : <UpdateListComponent
                    result={result}
                    projectOptions={projectOptions}
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
        listProjects: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
        retrieveListById: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired
    }).isRequired,
    authentication: PropTypes.shape({
        user: PropTypes.shape({})
    }).isRequired,
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    }),
    projectOptions: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

UpdateList.defaultProps = {
    listName: null,
    match: null,
    result: null,
    projects: { data: [] },
    headings: [],
    notification: null
};

// Pull in the React Router context so router is available on this.context.router
UpdateList.contextTypes = {
    router: PropTypes.object
};

/* istanbul ignore next: not testing buildProjectDropdownOptions */
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
const mapStateToProps = (state, ownProps) => {
    const { authentication, headings, lists, projects } = state;
    const listID = ownProps.match.params;

    const emptyList = {
        listName: '',
        items: [],
        headings
    };

    let list;
    if (Object.keys(listID).length !== 0) {
        // LIST_RETRIEVED action
        if (lists.data) {
            list = lists.data;
        // LIST_SUCCESS action
        } else if (lists && lists.success && lists.success.data) {
            list = lists.success.data;
        }
    } else {
        // LIST_UPDATE_ERROR
        list = lists.error
            ? lists
            : Object.assign({}, emptyList);
    }

    return {
        result: list,
        projectOptions: buildProjectDropdownOptions(projects),
        notification: lists.notification,
        authentication
    };
};

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            create, listProjects, addNotification, retrieveListById, update
        }, dispatch)
    }
);

const UpdateListConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateList);

export {
    UpdateList,
    UpdateListConnectedComponent
};
