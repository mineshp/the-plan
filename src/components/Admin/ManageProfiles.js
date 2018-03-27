import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Container, Icon } from 'semantic-ui-react';
import ViewProfiles from './ViewProfiles';
import UpdateProfile from './UpdateProfile';
import AssignProjectsToProfile from './AssignProjectsToProfile';

const ManageProfiles = ({
    activeIndex, handleManageProfilesAccordionClick,
    handleDeleteProfile, profiles, handleProfileNameChange,
    handleProfileActiveChange, handleSubmit, handleProfileStatus,
    handleDropDownChange, handleSubmitToAssignProjectsToProfile,
    projects, handleProjectCheckboxChange
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
    handleSubmit: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })).isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
    })).isRequired
};

export default ManageProfiles;
