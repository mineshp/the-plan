import projects from '../projects'

describe('projects reducer', () => {
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