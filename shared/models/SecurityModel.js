import data from '../data';

import _ from 'underscore';
import moment from 'moment';


const ONE_YEAR_MS = 31536000000;
const ONE_WEEK_MS = 604800000;

const TODAY_STRING = moment().format('YYYY-MM-DD');

const SYMBOL_LETTERS = 'BCDFGHJKLMNQRSTVXYZ';

function normalize(security) {

    let {
        "Meta Data": {"2. Symbol": symbol, "3. Last Refreshed": lastRefreshed, "4. Time Zone": timeZone},
        "Weekly Adjusted Time Series": rawData
    } = security;

    let seriesData = {};

    for (const interval in rawData) {
        let {
            '1. open': open,
            '2. high': high,
            '3. low' : low,
            '4. close': close,
            '5. adjusted close': adjustedClose,
            '6. volume': volume,
            '7. dividendAmount': dividendAmount
        } = rawData[interval];

        seriesData[interval] = {open, high, low, close, adjustedClose, volume, dividendAmount};
    }

    return {
        symbol,
        lastRefreshed,
        timeZone,
        seriesData
    };
}


function generateSymbol() {

    let symbol = [];
    for (let i = 0; i < 4; i++) {
        symbol.push(SYMBOL_LETTERS.charAt(Math.floor(Math.random() * SYMBOL_LETTERS.length)));
    }
    return symbol.join('');
}

function generateRandomCompanyData() {
    let symbol = generateSymbol();
    //Ensuring no duplicate symbols
    while (_.find(data, item => symbol === item['Meta Data']['2. Symbol'])) {
        console.log(`duplicate symbol: ${symbol}`);
        symbol = generateSymbol();

    }

    data.push({
        'Meta Data': {
            "1. Information": "Weekly Adjusted Prices and Volumes",
            "2. Symbol": symbol,
            "3. Last Refreshed": TODAY_STRING,
            "4. Time Zone": "US/Eastern"
        },
        'Weekly Adjusted Time Series': generateYearOfData()
    });
}


function generateYearOfData() {
    const volatility = Math.random() * 0.2 + 0.05; //Range: [5 - 24.999%]
    const volumeFactor = Math.min(Math.floor(Math.random() * 100000000), 500000);//Range: [500,000:9,999,999] with high chances on 500,000
    const dividendWeek = Math.floor(Math.random() * 52);//Pick a random week and pay against current score
    const startPrice = Math.floor(Math.random() * 1000);

    let score = Math.floor(Math.random() * 52) - 26;//Used to determine dividends, could be used for more
    let lastPrice = startPrice;
    let startDate = Date.now() - ONE_YEAR_MS;
    let intervalData = {};

    for (let i = 0; i < 52; i++) {
        let interval = moment(startDate + i * ONE_WEEK_MS).format('YYYY-MM-DD');
        const didWell = Math.floor(Math.random() * 2) == 0;
        score += didWell ? 1 : -1;

        const high = didWell ? lastPrice * (1 + Math.random() * volatility * 10) : lastPrice * (1 + Math.random() * volatility);
        const low = Math.max(didWell ? lastPrice * (1 - Math.random() * volatility) : lastPrice * (1 - Math.random() * volatility * 10), 1);
        const adjustedClose = Math.max(close + (Math.random() * volatility * didWell ? 1 : -1), 1);
        const close = didWell ? lastPrice + Math.random() * Math.abs(high - lastPrice) : lastPrice - Math.random() * Math.abs(lastPrice - low);
        const volume = volumeFactor * Math.abs(high - low) / lastPrice;
        const dividend = i === dividendWeek ? startPrice * score / 1000 : 0.0;

        intervalData[interval] = {
            "1. open": lastPrice,
            "2. high": high,
            "3. low": low,
            "4. close": close,
            "5. adjusted close": adjustedClose,
            "6. volume": volume,
            "7. dividend amount": dividend
        };

        lastPrice = close;
    }

    return intervalData;
}


class SecurityModel {

    constructor() {
        //Generating some random data
        let count = Math.floor(Math.random() * 25) + 10;
        for (let i = 0; i < count; i++) {
            generateRandomCompanyData();
        }
    }

    getSecurityByTickerSymbol(symbol) {
        let security = _.find(data, item => symbol.toUpperCase() === item['Meta Data']['2. Symbol']);


        return normalize(security);
    }

    lookupSymbol(partial) {
        let symbols = _.map(_.filter(data, item => item['Meta Data']['2. Symbol'].indexOf(partial.toUpperCase()) === 0),
            item => item['Meta Data']['2. Symbol'].toUpperCase());


        return symbols;
    }

    /**
     *
     * @param {SecuritySearchFilter} filter
     */
    getSecuritiesByFilter(filter) {
        let securities = data;
        let {intervalStart: start, intervalEnd: end, symbols} = filter;
        //Filtering Securities
        securities = _.filter(securities, (security) => {
            let {'Meta Data': {'2. Symbol': symbol}, 'Weekly Adjusted Time Series': seriesData} = security;
            let weeks = Object.keys(seriesData).sort();

            if (symbols.length && symbols.indexOf(symbol) !== -1) {
                return false;
            }

            if (start && weeks[weeks.length - 1] > start) {
                return false;
            }

            if (end && weeks[0] < end) {
                return false;
            }

            return true;
        });
        //Performing filter-specific transformations on the data-set
        _.each(securities, (security) => {
            let {'Meta Data': {'2. Symbol': symbol}, 'Weekly Adjusted Time Series': seriesData} = security;

            let intervalWeeks = _.filter(Object.keys(seriesData).sort(), week =>(start && week >= start) || (end && week <= end) );
            security['Weekly Adjusted Time Series'] = _.pick(seriesData, intervalWeeks );

        });

        return securities;
    }

    getAllData() {
        return data;
    }
}

export default new SecurityModel();