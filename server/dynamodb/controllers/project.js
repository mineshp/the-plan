const dynamoDBClient = require('../models/DynamoDBClient');
const uuidv4 = require('uuid/v4');

const env = process.env.NODE_ENV || 'development';
const dbType = process.env.DB_TYPE || 'mongodb';
const config = require('../../config/config')[env][dbType];

exports.getAllProjects = (req, res) => {
    const payload = {
        TableName: config.projectsTable
    };

    dynamoDBClient.scan(payload, (data) => {
        if (data.error) {
            res.status(500).json({ error: data.error });
        } else {
            res.send(data.Items);
        }
    });
};

exports.getProjectById = (req, res) => {
    const projectId = req.params.id;
    const payload = {
        TableName: config.projectsTable,
        Key: {
            _id: projectId
        }
    };

    dynamoDBClient.get(payload, (data) => {
        if (data.error) {
            res.status(500).json({ error: data.error });
        } else {
            res.send(data.Item);
        }
    });
};

exports.createNewProject = (req, res) => {
    const projectName = req.body.projectName;
    const validateProjectNamePayload = {
        TableName: config.projectsTable,
        IndexName: 'projectName-index',
        KeyConditionExpression: 'projectName = :v_projectName',
        ExpressionAttributeValues: {
            ':v_projectName': projectName
        },
        ScanIndexForward: false
    };

    const createProjectPayload = {
        TableName: config.projectsTable,
        KeyConditions: {
            projectName: {
                ComparisonOperator: 'EQ',
                AttributeValueList: [projectName]
            }
        },
        Item: {
            _id: uuidv4(),
            projectName,
            colour: req.body.colour,
            createdDate: Date.now(),
            updatedDate: Date.now()
        }
    };

    dynamoDBClient.query(validateProjectNamePayload, (data) => {
        if (data.error) {
            res.status(500).json({ error: data.error });
        } else if (data.Items.length === 0) {
            dynamoDBClient.put(createProjectPayload, (newProjectData) => {
                if (data.error) {
                    res.status(500).json({ error: newProjectData.error });
                } else {
                    res.send(createProjectPayload.Item);
                }
            });
        } else {
            res.status(400);
            res.json(
                {
                    message: 'Error: Project with the same name already exists, please choose another name.'
                }
            );
        }
    });
};

exports.updateProject = (req, res) => {
    const projectId = req.params.id;
    const payload = {
        TableName: config.projectsTable,
        Item: {
            _id: projectId,
            projectName: req.body.projectName,
            colour: req.body.colour,
            createdDate: req.body.createdDate,
            updatedDate: Date.now()
        }
    };

    dynamoDBClient.put(payload, (data) => {
        if (data.error) {
            res.status(400);
            res.json(
                {
                    message: `Error: Project update failed for project ${req.body.projectName}, error: ${data.error}.`
                }
            );
        } else {
            res.status(201);
            res.send(payload.Item);
        }
    });
};

exports.delete = (req, res) => {
    const projectId = req.params.id;

    const payload = {
        TableName: config.projectsTable,
        Key: {
            _id: projectId
        }
    };

    dynamoDBClient.get(payload, (data) => {
        if (data.error) {
            res.status(500).json(
                {
                    message: `Error: Unable to find project with id ${projectId}. Error ${data.error}.`
                }
            );
        } else {
            dynamoDBClient.delete(payload, (deleteData) => {
                if (deleteData.error) {
                    res.status(400);
                    res.json(
                        {
                            message: `Error: Unable to delete project id ${projectId}. Error ${deleteData.error}.`
                        }
                    );
                } else {
                    res.send(Object.assign({}, {
                        projectName: data.Item.projectName
                    }));
                }
            });
        }
    });
};
