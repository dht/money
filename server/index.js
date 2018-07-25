const fs = require('fs');
const iconv = require('iconv-lite');

const isDate = (str) => /\d\d\/\d\d\/\d\d\d\d/.test(str);
const isDateLine = (line) =>  isDate(line.substr(0, 10));

const mapping = {
    0: 'date',
    1: 'title',
    2: 'total',
    3: 'sum',
    4: 'reference',
    5: 'payments',
}

const mappingInternet = {
    0: 'date',
    1: 'dateOfPurchase',
    2: 'title',
    3: 'reference',
    4: 'sumOriginalCurrency',
    5: 'sumOriginal',
    6: 'sumCurrency',
    7: 'sum',
    8: 'moreInfo',
}

const parse = (filepath = './input.txt') => {
    const input = fs.readFileSync(filepath);
    const utf= iconv.decode(input, "ISO-8859-8");
    const array = convert(utf);
    fs.writeFileSync('./output.txt', JSON.stringify(array, null, 4));
}

const convert = (text) => {
    return text.split(/\n/gim)
        .filter(line => isDateLine(line))
        // .filter((line, index) => index === 0)
        .map(line => {
            const cols = line.split(/\t/gim),
                map = isDate(cols[1].trim()) ? mappingInternet : mapping;

            return cols
                .reduce((memo, value, index) => {
                    memo[map[index]] = value;
                    return memo;
                }, {});
        })
        .map(line => {
            line = {...line, ...convertPayments(line['payments'])}
            delete line["payments"];
            return line;
        })
}

const convertPayments = (payments = '') => {
    const regex = /(\d+)/gi;

    const matches = payments.match(regex);

    if (matches && matches.length >= 2) {
        return {
            paymentIndex: matches[0],
            paymentsTotal: matches[1],
        }
    }

    return {};
}

parse();

