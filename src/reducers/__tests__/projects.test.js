import projects from '../projects'

describe('projects reducer', () => {
    describe('CREATE ACTIONS', () => {
        it('should handle initial state', () => {
            expect(
                projects(undefined, {})
            ).toEqual({})
        })

        it('should handle CREATE_PROJECT', () => {
            expect(
                projects({}, {
                    type: 'CREATE_PROJECT',
                    projectName: 'Test Project',
                    colour: 'red'
                })
            ).toEqual({
                projectName: 'Test Project',
                colour: 'red',
                shouldRedirect: false
            });
        });

        it('should handle PROJECT_CREATION_SUCCESS', () => {
            expect(
                projects({}, {
                    type: 'PROJECT_CREATION_SUCCESS',
                    data: {
                        _id: "1234",
                        projectName: "TEST PROJECT",
                        colour: "green",
                        createdDate: "2017-08-15T12:02:00.000Z"
                    }
                })
            ).toEqual(
                {
                    success: {
                        data: {
                            _id: "1234",
                            projectName: "TEST PROJECT",
                            colour: "green",
                            createdDate: "2017-08-15T12:02:00.000Z"
                        },
                        message: 'Successfully created project'
                    },
                    shouldRedirect: true
                }
                )
        });

        it('should handle PROJECT_CREATION_ERROR', () => {
            expect(
                projects({}, {
                    type: 'PROJECT_CREATION_ERROR',
                    error: 'Error creating project'
                })
            ).toEqual(
                {
                    error: {
                        message: 'Error creating project',
                        isError: true
                    },
                    shouldRedirect: false
                }
                )
        });
    });

    describe('DELETE ACTIONS', () => {
        it('should handle PROJECT_DELETION_SUCCESS', () => {
            expect(
                projects({}, {
                    type: 'PROJECT_DELETION_SUCCESS',
                    data: {
                        projectName: "TEST PROJECT",
                    }
                })
            ).toEqual(
                {
                    success: {
                        data: {
                            projectName: "TEST PROJECT"
                        },
                        message: 'Successfully deleted project TEST PROJECT'
                    }
                }
            )
        });

        it('should handle PROJECT_DELETION_ERROR', () => {
            expect(
                projects({}, {
                    type: 'PROJECT_DELETION_ERROR',
                    error: 'Error deleting project'
                })
            ).toEqual(
                {
                    error: {
                        message: 'Error deleting project',
                        isError: true
                    }
                }
            )
        });
    });
});