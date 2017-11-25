import {EventEmitter} from 'events';
import _ from 'underscore';
import {Link} from 'react-router-dom';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import Data from '../../server/data';


class SecuritiesStore extends EventEmitter {
    constructor(){
        super();

        this.currentSecurityId = null;
        this.securitiesDetailCache = {};
        _.each(Data, this.generateSecurityDetails, this);


        AppDispatcher.register((payload) => {
            let {action} = payload;

            switch(action.actionType){
                case AppConstants.SET_CURRENT_SECURITY:
                    this.setCurrentSecurity(action.tickerId);
                    break;

                default: return true;
            }
        });
    }

    setCurrentSecurity(tickerId){
        this.currentSecurityId = tickerId;
    }

    getCurrentSecurityDetails(){
        return this.securitiesDetailCache[this.currentSecurityId];
    }

    getSecuritySummary(){
        return this.securitiesDetailCache;
    }

    /**
     * This is a function used to generate summary data and normalize the received Data object for use in Components.
     *
     * @param securityData A single 'raw' data object for a security
     */
    generateSecurityDetails(securityData) {
        let { 'Meta Data': {'2. Symbol':tickerId}, 'Weekly Adjusted Time Series': seriesData} = securityData;
        //Generating totals for the provided time series by retrieving the weeks as an array, sorting chronologically
        // ascending order, then crunch values as we iterate
        let seriesTotals = _.reduce(Object.keys(seriesData).sort(),
            (totals, week, weekIndex, weeksList) => {
                let {
                    '1. open': open,
                    '2. high': high,
                    '3. low': low,
                    '4. close': close,
                    '6. volume': volume
                } = seriesData[week];

                open = parseFloat(open);
                high = parseFloat(high);
                low = parseFloat(low);
                close = parseFloat(close);
                volume = parseInt(volume);

                if(weekIndex == 0 ){
                    totals.open = open;
                }

                if(weekIndex === weeksList.length - 1){
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

        this.securitiesDetailCache[tickerId] = {
            tickerId,
            seriesData,
            seriesTotals
        };
    }
}


export default new SecuritiesStore();