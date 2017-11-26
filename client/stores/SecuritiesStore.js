import {EventEmitter} from 'events';
import _ from 'underscore';
import moment from 'moment';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import Data from '../../server/data';

class SecuritiesStore extends EventEmitter {
    constructor(){
        super();

        this.currentSecurityId = null;
        this.securitiesDetailCache = {};
        this.dataRangeMinDate = moment().format(AppConstants.DATE_FORMAT);
        this.dataRangeMaxDate = AppConstants.DATE_FORMAT_EPOCH;
        this.totalVolume = 0;

        _.each(Data, this.generateSecurityDetails, this);


        AppDispatcher.register((payload) => {
            let {action} = payload;

            switch(action.actionType){
                case AppConstants.SET_CURRENT_SECURITY:
                    this.setCurrentSecurity(action.tickerId);
                    break;

                default: return true;
            }

            this.emit('change');
        });
    }

    setCurrentSecurity(tickerId){
        this.currentSecurityId = tickerId;
    }

    getCurrentSecurityDetails(){
        return this.securitiesDetailCache[this.currentSecurityId];
    }

    getSecuritiesSummary(){
        return {
            dataRangeMaxDate: this.dataRangeMaxDate,
            dataRangeMinDate: this.dataRangeMinDate,
            numIntervals: this.numIntervals,
            securityDetails: this.securitiesDetailCache,
            totalVolume: this.totalVolume
        };
    }

    /**
     * This is a function used to generate summary data and normalize the received Data object for use in Components.
     *
     * NOTE: Most of what is done here should really be done server-side
     *
     * @param securityData A single 'raw' data object for a security
     */
    generateSecurityDetails(securityData) {
        let { 'Meta Data': {'2. Symbol':tickerId, '3. Last Refreshed': lastRefreshed}, 'Weekly Adjusted Time Series': seriesData} = securityData;
        //Generating totals for the provided time series by retrieving the interval names as an array, sorting  in
        //ascending order, then crunch values as we iterate
        let seriesIntervals = Object.keys(seriesData).sort();
        let numIntervals = seriesIntervals.length;

        //TODO: This should come from server-side API
        if(this.numIntervals < numIntervals){
            this.numIntervals = numIntervals;
        }
        
        if(this.dataRangeMaxDate < seriesIntervals[numIntervals - 1]){
            this.dataRangeMaxDate = seriesIntervals[numIntervals - 1];
        }

        if(this.dataRangeMinDate > seriesIntervals[0]){
            this.dataRangeMinDate = seriesIntervals[0];
        }

        let startInterval = seriesIntervals[0];
        let endInterval = seriesIntervals[numIntervals - 1];

        let seriesTotals = _.reduce(seriesIntervals,
            (totals, interval, intervalIndex, intervalList) => {
                let {
                    '1. open': open,
                    '2. high': high,
                    '3. low': low,
                    '4. close': close,
                    '6. volume': volume
                } = seriesData[interval];

                open = parseFloat(open);
                high = parseFloat(high);
                low = parseFloat(low);
                close = parseFloat(close);
                volume = parseInt(volume);

                if(intervalIndex == 0 ){
                    totals.open = open;
                }

                if(intervalIndex === intervalList.length - 1){
                    totals.close = close;
                }

                if(high > totals.high){
                    totals.high = high;
                }

                if(low < totals.low || totals.low === null){
                    totals.low = low;
                }

                totals.volume += volume;


                return totals;
            },
            { open: null, close: null, high: null, low: null, volume: 0 }
        );

        this.totalVolume += seriesTotals.volume;

        this.securitiesDetailCache[tickerId] = {
            tickerId,
            seriesData,
            seriesTotals,
            startInterval,
            endInterval,
            lastRefreshed
        };
    }
}


export default new SecuritiesStore();