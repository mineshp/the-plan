import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Table } from 'semantic-ui-react';

const ViewProfiles = ({ handleDeleteProfile, handleProfileStatus, profiles }) => {
    const profileRows = [];
    profiles.map((profile) => {
        const profileId = profile._id; // eslint-disable-line no-underscore-dangle
        const profileStatusColour = (profile.active)
            ? 'activeProfileColour'
            : 'inActiveProfileColour';

        const profileStatus = (profile.active)
            ? 'ACTIVE'
            : 'DISABLED';

        const markProfileAsDisabledBtn = (
            <Button
                as="a"
                icon="unlock"
                color="violet"
                profile={profile}
                active={!profile.active}
                onClick={handleProfileStatus}
                title="Profile disabled"
            />
        );

        const markProfileAsActiveBtn = (
            <Button
                as="a"
                icon="lock"
                color="teal"
                profile={profile}
                active={!profile.active}
                onClick={handleProfileStatus}
                title="Profile active"
            />
        );

        const activeBtn = profile.active ? markProfileAsActiveBtn : markProfileAsDisabledBtn;


        return profileRows.push(
            <Table.Row key={`profile-${profile.name}`} negative={!profile.active} >
                <Table.Cell>{profile.name}</Table.Cell>
                <Table.Cell className={profileStatusColour}>{profileStatus}</Table.Cell>
                <Table.Cell collapsing>
                    {activeBtn}
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button
                        icon="trash"
                        color="pink"
                        id={profileId}
                        onClick={handleDeleteProfile}
                        title="Delete Profile"
                    />
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <Container>
            <p>
                Existing profiles that have been setup.
            </p>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {profileRows}
                </Table.Body>
            </Table>
        </Container>
    );
};

ViewProfiles.propTypes = {
    handleDeleteProfile: PropTypes.func.isRequired,
    handleProfileStatus: PropTypes.func.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })).isRequired
};

export default ViewProfiles;
