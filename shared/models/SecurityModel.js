import data from '../data';

import _ from 'underscore';
import moment from 'moment';
import SecurityInterval from "./SecurityInterval";
import SecurityIntervalCollection from "./SecurityIntervalCollection";
import SecuritySearchSummary from "./SecuritySearchSummary";
import SecuritySearchResults from "./SecuritySearchResults";
import AppConstants from "../constants/AppConstants";


const ONE_YEAR_MS = 31536000000;
const ONE_WEEK_MS = 604800000;

const TODAY_STRING = moment().format('YYYY-MM-DD');

/**
 * Generates a SecurityInterval generator for the provided start/end dates
 *
 * @param start
 * @param end
 * @returns {function()}
 */
function convertSecurityDataToInterval(start, end) {
    return (security) => {
        let {'Meta Data': {'2. Symbol': symbol, '3. Last Refreshed': lastRefreshed}, 'Weekly Adjusted Time Series': seriesData} = security;

        let intervals = _.filter(Object.keys(seriesData).sort(), interval =>(start && interval >= start) || (end && interval <= end) || (!start && !end));
        let filteredSeriesData = _.pick(seriesData, intervals);

        if(intervals.length === 0){
            return new SecurityInterval({
                symbol,
                open: 0.0,
                close: 0.0,
                high: 0.0,
                volume: 0.0,
                dataStart: 'n/a',
                dataEnd: 'n/a',
                lastRefreshed: lastRefreshed
            });
        }


        //Priming the reducer
        let firstInterval = intervals.shift();

        let totals = {
            symbol,
            open: filteredSeriesData[firstInterval]['1. open'],
            close: filteredSeriesData[ intervals.length === 0 ? firstInterval : intervals[intervals.length - 1] ]['4. close'],
            high: filteredSeriesData[firstInterval]['2. high'],
            low: filteredSeriesData[firstInterval]['3. low'],
            volume: filteredSeriesData[firstInterval]['6. volume'],
            dataStart: firstInterval,
            dataEnd: intervals.length === 0 ? firstInterval : intervals[intervals.length - 1],
            lastRefreshed
        };

        delete filteredSeriesData[firstInterval];
        //Reduce for a totals object that can be passed to the SecurityInterval's constructor
        return new SecurityInterval(_.reduce(filteredSeriesData,
            (memoTotals, intervalData, interval, intervalList) => {
                let {
                    '2. high': high,
                    '3. low': low,
                    '6. volume': volume
                } = intervalData;

                if (high > memoTotals.high) {
                    memoTotals.high = high;
                }

                if (low < memoTotals.low || memoTotals.low === null) {
                    memoTotals.low = low;
                }

                memoTotals.volume += volume;

                return memoTotals;
            }, totals));
    };
}

function convertSecurityDataToIntervalCollection(security) {
    let {'Meta Data': {'2. Symbol': symbol, '3. Last Refreshed': lastRefreshed}, 'Weekly Adjusted Time Series': seriesData} = security;


    //Reduce for a totals object that can be passed to the SecurityInterval's constructor
    let interval = convertSecurityDataToInterval()(security);

    let intervalData = _.map(seriesData, ({'1. open': open, '4. close': close, '2. high': high, '3. low': low, '6. volume': volume}, intervalName) => {
        return new SecurityInterval({
            symbol,
            open,
            close,
            high,
            low,
            volume,
            dataStart: intervalName,
            dataEnd: intervalName,
            lastRefreshed
        });
    });

    return new SecurityIntervalCollection({interval, intervalData})
}


function generateSymbol() {

    let symbol = [];
    for (let i = 0; i < 4; i++) {
        symbol.push(AppConstants.GENERATED_SYMBOL_LETTERS.charAt(Math.floor(Math.random() * AppConstants.GENERATED_SYMBOL_LETTERS.length)));
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
        const volume = Math.floor(volumeFactor * Math.abs(high - low) / lastPrice);
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

        return convertSecurityDataToIntervalCollection(security);
    }

    lookupSymbol(partial) {
        partial = partial.toUpperCase();

        let symbols = _.map(_.filter(data, item => item['Meta Data']['2. Symbol'].indexOf(partial) !== -1),
            item => item['Meta Data']['2. Symbol'].toUpperCase());

        symbols.sort((a, b) => {

            let aIndex = a.indexOf(partial);
            let bIndex = b.indexOf(partial);

            if(aIndex < bIndex){
                return -1;
            }
            if(aIndex > bIndex){
                return 1;
            }

            if(a < b){
                return -1;
            }
            if(a > b){
                return 1;
            }

            return 0;
        });

        return symbols;
    }

    /**
     *
     * @param {SecuritySearchFilter} filter
     * @return {SecuritySearchResults}
     */
    getSecuritySearchResultsByFilter(filter) {
        let securities = data;
        let {intervalStart: start, intervalEnd: end, symbols, volumeMin, volumeMax} = filter;
        //Filtering Securities
        securities = _.filter(securities, (security) => {
            let {'Meta Data': {'2. Symbol': symbol}, 'Weekly Adjusted Time Series': seriesData} = security;
            let intervals = Object.keys(seriesData).sort();

            if (symbols.length > 0 && symbols.indexOf(symbol) === -1) {
                return false;
            }

            if (start && intervals[intervals.length - 1] < start) {
                return false;
            }

            if (end && intervals[0] > end) {
                return false;
            }

            if(volumeMin || volumeMax){

                let securityVolume = _.reduce(seriesData, (total, intervalVolume) => total + intervalVolume['6. volume'], 0);


                if(volumeMin && securityVolume < volumeMin){
                    return false;
                }
                if(volumeMax && securityVolume > volumeMax){
                    return false;
                }
            }

            return true;
        });

        securities = _.map(securities, convertSecurityDataToInterval(start, end));
        let searchTotal = _.reduce(securities, (total, security) => total + security.volume, 0);

        let summary = new SecuritySearchSummary({securityCount: securities.length, totalVolume: searchTotal});

        return new SecuritySearchResults({filter, summary, securities});
    }
}

export default new SecurityModel();
