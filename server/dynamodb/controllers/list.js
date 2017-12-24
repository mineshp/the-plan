const dynamoDBClient = require('../models/DynamoDBClient');
const pdfExporter = require('../../export/pdf');
const uuidv4 = require('uuid/v4');

const env = process.env.NODE_ENV || 'development';
const dbType = process.env.DB_TYPE || 'mongodb';
const config = require('../../config/config')[env][dbType];

exports.getAllLists = (req, res) => {
    const payload = {
        TableName: config.listsTable
    };

    dynamoDBClient.scan(payload, (data) => {
        if (data.error) {
            res.status(500).json({ error: data.error });
        } else {
            res.send(data.Items);
        }
    });
};

// TODO: Needs work on it
exports.getAllListsForProject = (req, res) => {
    const projectName = req.params.projectName;
    const payload = {
        TableName: config.listsTable,
        FilterExpression: '#k_projects.#k_name = :v_projects_name',
        ExpressionAttributeNames: {
            '#k_projects': 'projects',
            '#k_name': 'name'
        },
        ExpressionAttributeValues: {
            ':v_projects_name': projectName
        }
    };

    dynamoDBClient.query(payload, (data) => {
        if (data.error) {
            res.status(500).json({ error: data.error });
        } else {
            res.send(data.Items);
        }
    });
};

exports.getListById = (req, res) => {
    const listId = req.params.id;
    const payload = {
        TableName: config.listsTable,
        Key: {
            _id: listId
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

exports.createNewList = (req, res) => {
    const listName = req.body.listName;
    const validateListNamePayload = {
        TableName: config.listsTable,
        IndexName: 'listName-index',
        KeyConditionExpression: 'listName = :v_listName',
        ExpressionAttributeValues: {
            ':v_listName': listName
        },
        ScanIndexForward: false
    };

    const createListPayload = {
        TableName: config.listsTable,
        KeyConditions: {
            listName: {
                ComparisonOperator: 'EQ',
                AttributeValueList: [listName]
            }
        },
        Item: {
            _id: uuidv4(),
            listName: req.body.listName,
            headings: req.body.headings,
            items: req.body.items,
            projects: req.body.projects,
            createdDate: Date.now(),
            updatedDate: Date.now()
        }
    };

    dynamoDBClient.query(validateListNamePayload, (data) => {
        if (data.error) {
            res.status(500).json({ error: data.error });
        } else if (data.Items.length === 0) {
            dynamoDBClient.put(createListPayload, (newListData) => {
                if (data.error) {
                    res.status(500).json({ error: newListData.error });
                } else {
                    res.send(createListPayload.Item);
                }
            });
        } else {
            res.status(400);
            res.json(
                {
                    message: 'Error: List with the same name already exists, please choose another name.'
                }
            );
        }
    });
};

exports.updateList = (req, res) => {
    const listId = req.params.id;
    const payload = {
        TableName: config.listsTable,
        Item: {
            _id: listId,
            listName: req.body.listName,
            headings: req.body.headings,
            items: req.body.items,
            projects: req.body.projects,
            createdDate: req.body.createdDate,
            updatedDate: Date.now()
        }
    };

    dynamoDBClient.put(payload, (data) => {
        if (data.error) {
            res.status(400);
            res.json(
                {
                    message: `Error: List update failed for list ${req.body.listName}, error: ${data.error}.`
                }
            );
        } else {
            res.status(201);
            res.send(payload.Item);
        }
    });
};

exports.delete = (req, res) => {
    const listId = req.params.id;

    const payload = {
        TableName: config.listsTable,
        Key: {
            _id: listId
        }
    };

    dynamoDBClient.get(payload, (data) => {
        if (data.error) {
            res.status(400).json(
                {
                    message: `Error: Unable to find list with id ${projectId}. Error ${data.error}.`
                }
            );
        } else {
            dynamoDBClient.delete(payload, (deleteData) => {
                if (deleteData.error) {
                    res.status(400);
                    res.json(
                        {
                            message: `Error: Unable to delete list id ${projectId}. Error ${deleteData.error}.`
                        }
                    );
                } else {
                    res.send(Object.assign({}, {
                        listName: data.Item.listName
                    }));
                }
            });
        }
    });
};

exports.generatePDF = (req, res) => {
    const listId = req.params.id;
    const payload = {
        TableName: config.listsTable,
        Key: {
            _id: listId
        }
    };

    dynamoDBClient.get(payload, (data) => {
        if (data.error) {
            res.status(500).json({ error: data.error });
        } else {
            pdfExporter.renderPDF(data.Item)
                .then(() => res.send(data.Item))
                .catch((error) => {
                    res.status(400);
                    res.json(
                        {
                            message: `Error: Unable to generate pdf for list ${data.Items.listName}, error ${error}.`
                        }
                    );
                });
        }
    });
};
