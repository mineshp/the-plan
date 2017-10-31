import projects from '../projects';

describe('projects reducer', () => {
    describe('CREATE ACTIONS', () => {
        it('should handle initial state', () => {
            expect(projects(undefined, {})).toEqual({});
        });

        it('should handle CREATE_PROJECT', () => {
            expect(projects({}, {
                type: 'CREATE_PROJECT',
                projectName: 'Test Project',
                colour: 'red'
            })).toEqual({
                projectName: 'Test Project',
                colour: 'red'
            });
        });

        it('should handle PROJECT_CREATION_SUCCESS', () => {
            expect(projects({}, {
                type: 'PROJECT_CREATION_SUCCESS',
                data: {
                    _id: '1234',
                    projectName: 'TEST PROJECT',
                    colour: 'green',
                    createdDate: '2017-08-15T12:02:00.000Z'
                }
            })).toEqual({
                notification: {
                    message: 'Successfully created project TEST PROJECT.',
                    level: 'success',
                    title: 'Success'
                },
                success: {
                    data: {
                        _id: '1234',
                        projectName: 'TEST PROJECT',
                        colour: 'green',
                        createdDate: '2017-08-15T12:02:00.000Z'
                    }
                }
            });
        });

        it('should handle PROJECT_CREATION_ERROR', () => {
            expect(projects({}, {
                type: 'PROJECT_CREATION_ERROR',
                error: 'Error creating project'
            })).toEqual({
                notification: {
                    message: 'Error creating project',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('DELETE ACTIONS', () => {
        it('should handle PROJECT_DELETION_SUCCESS', () => {
            expect(projects({}, {
                type: 'PROJECT_DELETION_SUCCESS',
                data: {
                    projectName: 'TEST PROJECT',
                }
            })).toEqual({
                notification: {
                    message: 'Successfully deleted project TEST PROJECT.',
                    level: 'success',
                    title: 'Success'
                },
                success: {
                    data: {
                        projectName: 'TEST PROJECT'
                    }
                }
            });
        });

        it('should handle PROJECT_DELETION_ERROR', () => {
            expect(projects({}, {
                type: 'PROJECT_DELETION_ERROR',
                error: 'Error deleting project'
            })).toEqual({
                notification: {
                    message: 'Error deleting project',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('UPDATE ACTIONS', () => {
        const aProject = {
            _id: '1234',
            projectName: 'Senorita',
            colour: 'gold',
            createdDate: '2017-09-22T21:33:42.096Z'
        };

        it('should handle PROJECT_UPDATE_SUCCESS', () => {
            expect(projects({}, {
                type: 'PROJECT_UPDATE_SUCCESS',
                data: aProject
            })).toEqual({
                notification: {
                    message: 'Successfully updated project Senorita.',
                    level: 'success',
                    title: 'Success'
                },
                success: {
                    data: aProject
                }
            });
        });

        it('should handle PROJECT_UPDATE_ERROR', () => {
            expect(projects({}, {
                type: 'PROJECT_UPDATE_ERROR',
                error: 'Unable to update project, please try again later.'
            })).toEqual({
                notification: {
                    message: 'Unable to update project, please try again later.',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('LIST ACTIONS', () => {
        const allProjects = [
            {
                _id: '1234',
                projectName: 'Tea',
                colour: 'brown',
                createdDate: '2017-09-22T21:33:42.096Z'
            },
            {
                _id: '1256',
                projectName: 'Coffee',
                colour: 'cream',
                createdDate: '2017-09-282T08:12:42.096Z'
            }
        ];

        it('should handle LIST_PROJECTS', () => {
            expect(projects({}, {
                type: 'LIST_PROJECTS',
                data: { allProjects }
            })).toEqual({
                data: {
                    allProjects
                }
            });
        });

        it('should handle PROJECT_LIST_RETRIEVED', () => {
            expect(projects({}, {
                type: 'PROJECT_LIST_RETRIEVED',
                data: { allProjects }
            })).toEqual({
                notification: {
                    message: 'Projects have been retrieved.',
                    level: 'success',
                    title: 'Success'
                },
                data: { allProjects }
            });
        });

        it('should handle PROJECT_LIST_ERROR', () => {
            expect(projects({}, {
                type: 'PROJECT_LIST_ERROR',
                error: 'Unable to retrieve projects, please try again later.'
            })).toEqual({
                notification: {
                    message: 'Unable to retrieve projects, please try again later.',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('FETCH SINGLE PROJECT ACTIONS', () => {
        const aProject = {
            _id: '1234',
            projectName: 'Tea',
            colour: 'brown',
            createdDate: '2017-09-22T21:33:42.096Z'
        };

        it('should handle SINGLE_PROJECT_RETRIEVED', () => {
            expect(projects({}, {
                type: 'SINGLE_PROJECT_RETRIEVED',
                data: {
                    aProject
                }
            })).toEqual({
                data: { aProject },
                notification: {
                    message: 'Single project has been retrieved.',
                    level: 'success',
                    title: 'Success'
                },
            });
        });

        it('should handle SINGLE_PROJECT_ERROR', () => {
            expect(projects({}, {
                type: 'SINGLE_PROJECT_ERROR',
                error: 'Unable to retrieve project with id 999, please try again later.'
            })).toEqual({
                notification: {
                    message: 'Unable to retrieve project with id 999, please try again later.',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });
});
