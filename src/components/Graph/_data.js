import moment from 'moment';

const rnd = () => {
    return -1000 + Math.floor(4000 * Math.random());
}

const generateSeries = () => {
    let date = moment('2018-01-01'),
        now = moment(),
        diff =  now.diff(date, 'days'),
        total = 2000;

    let output = {};

    for (let cnt = 0; cnt < diff; cnt++) {
        date.add(1, 'day');
        total += rnd();
        output[date.week()] = total;
    }

    return output;
}

const generateData = () => {
    return generateSeries();
}

export default generateData();