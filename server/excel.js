const fs = require('fs');
const xlsx = require('xlsx');
const moment = require('moment');


const c = (row, col) => {
    return String.fromCharCode(65 + col - 1) + row;
}

const map = {
    1: 'date',
    2: 'title',
    3: 'details',
    4: 'reference',
    5: 'charge',
    6: 'income',
    7: 'balance',
    8: 'dateOriginal',
    9: 'behalf',
    10: 'for',
};

const date = (excelDateNumber) => {
    if (!excelDateNumber) return '';

    const output = new Date(0, 0, 1, 0, 0, 0, 0);
    output.setDate(excelDateNumber - 1);
    return moment(output).format('YYYY-MM-DD');
}

const parse = (filepath = './excelNewTransactions.xlsx') => {
    const workbook = xlsx.readFile(filepath)

    const json = JSON.parse(JSON.stringify(workbook)),
        sheets = json.Sheets,
        firstKey = Object.keys(sheets).shift(),
        sheet = sheets[firstKey];

    let output = [];

    for (let row = 7; row < 1000; row++) {
        const item = {};

        for (let col = 1; col <= 10; col++) {
            const cell = (sheet[c(row, col)] || {v: ''}).v;
            item[map[col]] = cell;
        }

        item['date'] = date(item['date']);
        item['dateOriginal'] = date(item['dateOriginal']);

        if (item['date']) {
            output.push(item);
        }
    }

    fs.writeFileSync('./output2.json', JSON.stringify(output, null, 4));
}

parse();