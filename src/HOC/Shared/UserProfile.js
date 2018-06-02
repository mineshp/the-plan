import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveProfiles } from '../../actions/controlCentre';
import { addNotification } from '../../actions/notification';
import { setProfilesToDisplay, setCurrentUser } from '../../actions/authentication';
import UserProfileComponent from '../../components/Shared/UserProfile';

import LoadingComponent from '../../components/Shared/Loading';

/* istanbul ignore next: not testing buildProjectDropdownOptions */
const buildProfileDropdownOptions = (profiles) => {
    if (!profiles) { return []; }
    return profiles.map((profile) => ({
        // eslint-disable-next-line no-underscore-dangle
        key: profile._id,
        value: profile.name,
        text: profile.name
    }));
};

class UserProfile extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleDropDownSelection =
            this.handleDropDownSelection.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { profilesAssigned: this.props.user.profilesToDisplay };
    }

    async componentDidMount() {
        await this.props.actions.retrieveProfiles();
    }

    handleDropDownSelection(event, data) {
        event.preventDefault();
        this.setState({ profilesAssigned: [...data.value] });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.setProfilesToDisplay(this.state.profilesAssigned, this.props.user)
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.context.router.history.push('/');
            });
    }

    /* istanbul ignore next: not testing render */
    render() {
        const { admin, user } = this.props;
        const userProfiles = admin.controlCentre.profiles.filter((elem) =>
            user.profile.find((profile) => profile === elem.name));

        return (
            !admin.controlCentre || !admin.controlCentre.profiles || !userProfiles
                ? <LoadingComponent />
                : <UserProfileComponent
                    profileOptions={buildProfileDropdownOptions(userProfiles)}
                    profilesAssigned={this.state.profilesAssigned}
                    handleDropDownSelection={this.handleDropDownSelection}
                    handleSubmit={this.handleSubmit}
                />
        );
    }
}

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => ({
    admin: state.controlCentre,
    user: state.authentication.user,
    notification: state.authentication.notification,
});

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            retrieveProfiles, setProfilesToDisplay, addNotification, setCurrentUser
        }, dispatch)
    }
);

const UserProfileConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);

UserProfile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string,
        isAdmin: PropTypes.bool,
        profile: PropTypes.arrayOf(PropTypes.string),
        profilesToDisplay: PropTypes.arrayOf(PropTypes.string)
    }),
    actions: PropTypes.shape({
        retrieveProfiles: PropTypes.func.isRequired,
        setProfilesToDisplay: PropTypes.func.isRequired,
        setCurrentUser: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    admin: PropTypes.shape({
        controlCentre: PropTypes.shape({
            profiles: PropTypes.arrayOf(PropTypes.shape({}))
        })
    }),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    })
};

UserProfile.defaultProps = {
    user: null,
    actions: null,
    admin: null,
    notification: null
};

UserProfile.contextTypes = {
    router: PropTypes.object
};

export {
    UserProfile,
    UserProfileConnectedComponent
};
