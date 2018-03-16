import uuidv4 from 'uuid/v4';

const hasHeadings = (headingsFromState, headingsFromProps) => {
    if (headingsFromState && headingsFromState.length > 0 && headingsFromState[0].name !== '') {
        return true;
    } else if (headingsFromProps && headingsFromProps.length > 0 && headingsFromProps[0].name !== '') {
        return true;
    }
    return false;
};

const hasProjects = (projectsFromState, projectsFromProps) => {
    if (projectsFromState && projectsFromState.length > 0 && projectsFromState[0].name !== '') {
        return true;
    } else if (projectsFromProps && projectsFromProps.length > 0 && projectsFromProps[0].name !== '') {
        return true;
    }
    return false;
};

const validateHeadings = (headings) => {
    const headingsUpdated = headings.filter((heading) => (
        heading.name !== ''
    ));
    return headingsUpdated;
};

const getHeadings = (updatedHeadings, originalHeadings) => {
    if (updatedHeadings && updatedHeadings.length > 0 && updatedHeadings[0].name !== '') {
        return validateHeadings(updatedHeadings);
    }
    return validateHeadings(originalHeadings);
};

const getProjects = (updatedProjects, originalProjects) => {
    if (updatedProjects && updatedProjects.length > 0 && updatedProjects[0].name !== '') {
        return updatedProjects;
    }
    return originalProjects;
};

const listSetupIsComplete = (stateData, propsData) => {
    if (
        hasHeadings(stateData.headings, propsData.headings) &&
        hasProjects(stateData.projects, propsData.projects)
    ) {
        return true;
    }
    return false;
};

const addItemColumn = (headingName) => ({
    columnName: headingName,
    columnValue: ''
});

const addOrRemoveItems = (action, itemsExist, position = 0) => {
    switch (action) {
    case 'add':
        itemsExist.map((item) => {
            const rowId = uuidv4();
            item.columns.push(addItemColumn(uuidv4()));
            item.rowId = rowId; // eslint-disable-line no-param-reassign
            return undefined;
        });
        break;
    case 'remove':
        itemsExist.map((item) => {
            item.columns.splice(position, 1);
            return undefined;
        });
        break;
    default:
        break;
    }
    return itemsExist;
};

const buildListData = (originalObject, { listName, headings, projects, items }) => (
    Object.assign({}, {
        _id: originalObject._id, // eslint-disable-line no-underscore-dangle
        listName: listName || originalObject.listName,
        headings: getHeadings(headings, originalObject.headings),
        projects: getProjects(projects, originalObject.projects),
        items: items || originalObject.items,
        updatedDate: new Date(),
        createdDate: originalObject.createdDate
    })
);

export {
    buildListData,
    listSetupIsComplete,
    validateHeadings,
    addOrRemoveItems
};
