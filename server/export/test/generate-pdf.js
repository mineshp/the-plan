const { renderPDF } = require('../pdf');

const listData = {
    _id: "5a197b1f0e6ee410f7fbf0de",
    listName: "Reception Guest List [MIN]",
    __v: 0,
    items: [
        {
            columns: [
                {
                    columnValue: "Min",
                    columnName: "Name"
                },
                {
                    columnValue: "HW",
                    columnName: "Location"
                }
            ],
            rowId: "6d8357d3-c325-420b-a8fc-0c8b6190e5c7"
        },
        {
            columns: [
                {
                    columnValue: "Vaish",
                    columnName: "Name"
                },
                {
                    columnValue: "HW",
                    columnName: "Location"
                }
            ],
            rowId: "da2b4f75-ffcf-45a8-9fba-1f5819af1ecb"
        },
        {
            columns: [
                {
                    columnValue: "Jigs",
                    columnName: "Name"
                },
                {
                    columnValue: "Watford",
                    columnName: "Location"
                }
            ],
            rowId: "8b420ebd-6fe7-4e61-bb8a-b9e8b1e9f004"
        },
        {
            rowId: "aabaeb44-893b-4cff-99e7-3f0edf58ff5b",
            columns: [
                {
                    columnName: "Name",
                    columnValue: "Tara"
                },
                {
                    columnName: "Location",
                    columnValue: "Stoke"
                }
            ]
        },
        {
            rowId: "a12ab153-f9cd-46ca-8427-23a0a25106b5",
            columns: [
                {
                    columnName: "Name",
                    columnValue: "Dhanu"
                },
                {
                    columnName: "Location",
                    columnValue: "Wooly"
                }
            ]
        }
    ],
    headings: [
        {
            _id: "5a197b1f0e6ee410f7fbf0e1",
            id: "fbe4d07f-2456-4be4-b3f8-9883ca2e62dc",
            name: "Name"
        },
        {
            _id: "5a197b1f0e6ee410f7fbf0e0",
            name: "Location",
            id: "cdb27aaa-4042-4f97-9dca-d1bc76615e56"
        }
    ],
    projects: [
        {
            _id: "5a2ef53ac7e0b8192f6974e4",
            name: "Reception",
            id: "fc4d71b4-768f-44d9-bfb4-ff69743c42f5"
        },
        {
            _id: "5a2ef53ac7e0b8192f6974e3",
            name: "Biology",
            id: "e437789f-5f53-4c0d-9bbb-cbbf2a3a8285"
        },
        {
            _id: "5a2ef53ac7e0b8192f6974e2",
            name: "Spanish",
            id: "60300c43-b6d2-47ec-8f6a-bfb056e806c8"
        },
        {
            _id: "5a2ef53ac7e0b8192f6974e1",
            name: "History",
            id: "06dd4b4b-fb18-41a3-a49d-e6c13467c518"
        },
        {
            _id: "5a2ef53ac7e0b8192f6974e0",
            name: "FOOTBALL",
            id: "09d4cdb6-64fb-4097-9af0-cf18ff5cc9f2"
        }
    ],
    updatedDate: "2017-12-11T21:14:34.658Z",
    createdDate: "2017-11-25T14:15:59.271Z"
};

renderPDF(listData);
