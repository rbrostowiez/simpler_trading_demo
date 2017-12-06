import {EventEmitter} from 'events';
import _ from 'underscore';
import moment from 'moment';

import AppDispatcher from '../dispatcher/AppDispatcher';
import SecuritiesActions from '../actions/SecuritiesActions';
import AppConstants from '../constants/AppConstants';
import RequestStore from './RequestStore';

class SecuritiesStore extends EventEmitter {
    constructor(){
        super();

        this.filter = {tokens: ['MSFT', 'GOOG']};
        this.currentSecurityId = null;
        this.securitiesDetailCache = {};
        this.dataRangeMinDate = moment().format(AppConstants.DATE_FORMAT);
        this.dataRangeMaxDate = AppConstants.DATE_FORMAT_EPOCH;
        this.totalVolume = 0;
        this.currentRequestId = null;
        this.rawData = null;
        this.partial = '';
        this.suggestions = [];
        this.processingPartial = false;

        this.currentRequestId = SecuritiesActions.loadData();

        AppDispatcher.register((payload) => {
            let {action} = payload;

            switch(action.actionType){
                case AppConstants.SET_CURRENT_SECURITY:
                    this.setCurrentSecurity(action.tickerId);
                    break;
                case AppConstants.PERFORM_REQUEST:
                    this.handleRequestPerformed(action);
                    break;
                case AppConstants.REQUEST_COMPLETED:
                    this.handleRequestCompleted(action.requestId);
                    break;
                case AppConstants.UPDATE_SECURITY_SEARCH_FILTER:
                    this.updateFilter(action.fieldName, action.fieldValue);
                    break;
                default: return true;
            }

            this.emit('change');
        });
    }

    setCurrentSecurity(symbol){
        this.currentSecurityId = symbol;
    }

    getCurrentSecurityDetails(){
        if(!this.securitiesDetailCache.hasOwnProperty(this.currentSecurityId)){
            this.currentRequestId = SecuritiesActions.loadSecurity();
        }
        return this.securitiesDetailCache[this.currentSecurityId];
    }

    getSecuritiesSummary(){
        return {
            dataRangeMaxDate: this.dataRangeMaxDate,
            dataRangeMinDate: this.dataRangeMinDate,
            numIntervals: this.numIntervals,
            securityDetails: this.securitiesDetailCache,
            totalVolume: this.totalVolume,
            partial: this.partial,
            suggestions: this.suggestions,
            processingPartial: this.processingPartial,
            filter: this.filter
        };
    }

    /**
     * This is a function used to generate summary data and normalize the received data object for use in Components.
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
        //Reduce to get totals, and has side efect of re-mapping source object to simpler keys
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

                seriesData[interval] = {
                    open,
                    close,
                    high,
                    low,
                    volume
                };

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

    handleRequestCompleted(requestId) {
        if(requestId !== this.currentRequestId){
            return;
        }

        let result = RequestStore.getRequestResults(this.currentRequestId);

        if(result.url.indexOf(`${AppConstants.API_SECURITY}/data`) !== -1){
            this.rawData = result.body;

            _.each(this.rawData, this.generateSecurityDetails, this);
        }
        else if(result.url.indexOf(`${AppConstants.API_SECURITY}/details`) !== -1){
            this.securitiesDetailCache[result.body.symbol] = result.body;
        }
        else if(result.url.indexOf(`${AppConstants.API_SECURITY}/lookup`) !== -1){
            this.suggestions = result.body;
            this.processingPartial = false;
        }

        this.currentRequestId = null;
    }

    updateFilter(fieldName, fieldValue) {
        if(this.filter.hasOwnProperty(fieldName)){
            this.filter[fieldName] = fieldValue;
        }
        else if(fieldName === 'addToken'){
            this.partial = '';
            this.suggestions = [];
            this.filter.tokens.push(fieldValue);
            this.filter.tokens = _.uniq(this.filter.tokens);

        }
        else if(fieldName === 'removeToken'){
            this.filter.tokens = _.without(this.filter.tokens, fieldValue);
        }
    }


    handleRequestPerformed(action) {
        //TODO: currentRequestId for all requests should probably come in this fashion
        if(action.url.indexOf(`${AppConstants.API_SECURITY}/lookup`) !== -1){
            this.partial = action.partial;
            this.currentRequestId = action.requestId;
            this.processingPartial = true;
        }
    }
}


export default new SecuritiesStore();