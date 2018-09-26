import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import ViewProfiles from './ViewProfiles';
import UpdateProfile from './UpdateProfile';
import AssignProjectsToProfile from './AssignProjectsToProfile';
import AssignUsersToProfile from './AssignUsersToProfile';

const ManageProfiles = ({
    activeIndex, handleManageProfilesAccordionClick,
    handleDeleteProfile, profiles, handleProfileNameChange,
    handleProfileActiveChange, handleSubmit, handleProfileStatus,
    handleDropDownChange, handleSubmitToAssignProjectsToProfile,
    projects, handleProjectCheckboxChange, handleSubmitToAssignUsersToProfile,
    users, handleProfilesCheckboxChange, handleUsersDropDownChange, userProfilesAssigned
}) => (
    <Container>
        <Accordion fluid styled>
            <Accordion.Title active={activeIndex === 0} id="0" onClick={handleManageProfilesAccordionClick}>
                <Icon name="dropdown" />
                    Profiles Setup
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                <ViewProfiles
                    handleDeleteProfile={handleDeleteProfile}
                    handleProfileStatus={handleProfileStatus}
                    profiles={profiles}
                />
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 1} id="1" onClick={handleManageProfilesAccordionClick}>
                <Icon name="dropdown" />
                    Create new profile
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
                <UpdateProfile
                    handleProfileNameChange={handleProfileNameChange}
                    handleProfileActiveChange={handleProfileActiveChange}
                    handleSubmit={handleSubmit}
                />
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 2} id="2" onClick={handleManageProfilesAccordionClick}>
                <Icon name="dropdown" />
                    Assign projects to profile
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
                <AssignProjectsToProfile
                    profiles={profiles}
                    projects={projects}
                    handleDropDownChange={handleDropDownChange}
                    handleSubmitToAssignProjectsToProfile={handleSubmitToAssignProjectsToProfile}
                    handleProjectCheckboxChange={handleProjectCheckboxChange}
                />
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 3} id="3" onClick={handleManageProfilesAccordionClick}>
                <Icon name="dropdown" />
                    Assign profiles to users
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
                <AssignUsersToProfile
                    profiles={profiles}
                    users={users}
                    handleUsersDropDownChange={handleUsersDropDownChange}
                    handleSubmitToAssignUsersToProfile={handleSubmitToAssignUsersToProfile}
                    handleProfilesCheckboxChange={handleProfilesCheckboxChange}
                    userProfilesAssigned={userProfilesAssigned}
                />
            </Accordion.Content>
        </Accordion>
    </Container>
);

ManageProfiles.propTypes = {
    handleManageProfilesAccordionClick: PropTypes.func.isRequired,
    handleDeleteProfile: PropTypes.func.isRequired,
    handleProfileStatus: PropTypes.func.isRequired,
    handleProfileNameChange: PropTypes.func.isRequired,
    handleProfileActiveChange: PropTypes.func.isRequired,
    handleDropDownChange: PropTypes.func.isRequired,
    handleSubmitToAssignProjectsToProfile: PropTypes.func.isRequired,
    handleProjectCheckboxChange: PropTypes.func.isRequired,
    handleProfilesCheckboxChange: PropTypes.func.isRequired,
    handleSubmitToAssignUsersToProfile: PropTypes.func.isRequired,
    handleUsersDropDownChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    })).isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
    })).isRequired,
    userProfilesAssigned: PropTypes.arrayOf(PropTypes.string)
};

ManageProfiles.defaultProps = {
    userProfilesAssigned: []
};

export default ManageProfiles;
