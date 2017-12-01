module.exports.formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
};
