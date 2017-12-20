const jsreport = require('jsreport-core')();
const fs = require('fs');
const path = require('path');

const date = new Date();
const todaysDate = date.toLocaleString();

const template = {
    phantom: {
        phantomjsVersion: '2.1.1',
        orientation: 'landscape',
        margin: {
            top: '10px',
            bottom: '10px',
            left: '10px',
            right: '10px'
        },
        footer: fs.readFileSync(path.join(path.resolve(path.join(__dirname, './')), 'templates/pdfListFooterTemplate.hbs')).toString('utf-8'),
        fitToPage: false
    },
    content: fs.readFileSync(path.join(path.resolve(path.join(__dirname, './')), 'templates/pdfListTemplate.hbs')).toString('utf-8'),
    engine: 'handlebars',
    recipe: 'phantom-pdf'
};

const writePDF = (resp, pdfFileName) => {
    fs.open(path.join(path.resolve(path.join(__dirname, './')), `files/${pdfFileName}`), 'w', (fserror, fd) => {
        if (fserror) {
            throw Error(`error opening file: ${fserror}`);
        }
        fs.write(fd, resp.content, 0, resp.content.length, null, (fderror) => {
            if (fderror) throw Error(`error writing file: ${fderror}`);
            fs.close(fd, () => {
                console.log(`writing ./files/${pdfFileName}`);
            });
        });
    });
};

const renderReport = (listData) => (
    jsreport.render({
        template,
        data: {
            list: listData,
            date: todaysDate
        }
    })
);

const renderPDFReport = (listData) => jsreport.init()
    .then(() => renderReport(listData))
    .then((resp) => {
        resp.result.on('finish', () => {
            process.exit();
        });
        const listName = listData.listName.replace(/\s/g, '-');
        const pdfFileName = `${listName}-list.pdf`;
        writePDF(resp, pdfFileName);
        return Promise.resolve(pdfFileName);
    })
    .catch((e) => {
        console.log(e);
    });

module.exports.renderPDF = renderPDFReport;
