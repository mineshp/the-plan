module.exports.formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const formatted = date.toLocaleString('en-GB');
    console.log(`formatted Date ${formatted}`);
    return formatted;
};
