import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';
import ListUsers from './ListUsers';
import ManageProfiles from './ManageProfiles';

const ControlCentre = ({
    handleResetPwd, handleDeleteUser, users,
    handleManageProfilesAccordionClick, activeIndex,
    handleDeleteProfile, profiles, handleProfileNameChange,
    handleProfileActiveChange, handleSubmit, handleProfileStatus,
    handleDropDownChange, handleSubmitToAssignProjectsToProfile, projects,
    handleProjectCheckboxChange, handleSubmitToAssignUsersToProfile, handleProfilesCheckboxChange,
    handleUsersDropDownChange, userProfilesAssigned
}) => (
    <Container className="content-body">
        <Header as="h1">Control Centre</Header>
        <ListUsers
            users={users}
            handleDeleteUser={handleDeleteUser}
            handleResetPwd={handleResetPwd}
        />
        <Header as="h2">Profile Management</Header>
        <ManageProfiles
            activeIndex={activeIndex}
            handleManageProfilesAccordionClick={handleManageProfilesAccordionClick}
            handleDeleteProfile={handleDeleteProfile}
            handleProfileStatus={handleProfileStatus}
            handleProfileNameChange={handleProfileNameChange}
            handleProfileActiveChange={handleProfileActiveChange}
            handleSubmit={handleSubmit}
            handleDropDownChange={handleDropDownChange}
            handleUsersDropDownChange={handleUsersDropDownChange}
            handleSubmitToAssignProjectsToProfile={handleSubmitToAssignProjectsToProfile}
            handleProjectCheckboxChange={handleProjectCheckboxChange}
            handleSubmitToAssignUsersToProfile={handleSubmitToAssignUsersToProfile}
            handleProfilesCheckboxChange={handleProfilesCheckboxChange}
            profiles={profiles}
            projects={projects}
            users={users}
            userProfilesAssigned={userProfilesAssigned}
        />
    </Container>
);

ControlCentre.propTypes = {
    handleDeleteUser: PropTypes.func.isRequired,
    handleResetPwd: PropTypes.func.isRequired,
    handleManageProfilesAccordionClick: PropTypes.func.isRequired,
    handleDeleteProfile: PropTypes.func.isRequired,
    handleProfileStatus: PropTypes.func.isRequired,
    handleProfileNameChange: PropTypes.func.isRequired,
    handleProfileActiveChange: PropTypes.func.isRequired,
    handleProjectCheckboxChange: PropTypes.func.isRequired,
    handleProfilesCheckboxChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDropDownChange: PropTypes.func.isRequired,
    handleUsersDropDownChange: PropTypes.func.isRequired,
    handleSubmitToAssignProjectsToProfile: PropTypes.func.isRequired,
    handleSubmitToAssignUsersToProfile: PropTypes.func.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })).isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
    })).isRequired,
    activeIndex: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })).isRequired,
    userProfilesAssigned: PropTypes.arrayOf(PropTypes.string)
};

ControlCentre.defaultProps = {
    users: null,
    userProfilesAssigned: []
};

export default ControlCentre;
