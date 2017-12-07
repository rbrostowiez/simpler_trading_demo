import {EventEmitter} from 'events';
import _ from 'underscore';

import AppDispatcher from '../dispatcher/AppDispatcher';
import SecuritiesActions from '../actions/SecuritiesActions';
import AppConstants from '../../shared/constants/AppConstants';
import RequestStore from './RequestStore';
import SecuritySearchFilter from "../../shared/models/SecuritySearchFilter";
import SecuritySearchResults from "../../shared/models/SecuritySearchResults";
import SecuritySearchAutosuggest from "../../shared/models/SecuritySearchAutosuggest";
import SecuritySearchSummary from "../../shared/models/SecuritySearchSummary";

class SecuritiesStore extends EventEmitter {
    constructor(){
        super();

        this.initialized = false;

        this.filter = new SecuritySearchFilter({});
        this.autosuggest = new SecuritySearchAutosuggest({});
        this.searchResults = new SecuritySearchResults(this.filter, new SecuritySearchSummary({}), []);
        
        this.currentSecurityId = null;
        this.securitiesDetailCache = {};
        this.currentRequestId = null;

        AppDispatcher.register((payload) => {
            let {action} = payload;

            switch(action.actionType){
                case AppConstants.SET_CURRENT_SECURITY:
                    this.setCurrentSecurity(action.symbol);
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
                case AppConstants.UPDATE_SECURITY_SEARCH_UPDATE_PARTIAL:
                    this.updatePartial(action.partial);
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
        return this.securitiesDetailCache[this.currentSecurityId];
    }

    getSearchResults(){
        if(!this.initialized){
            SecuritiesActions.updateSecuritySearchFilter('','');
        }

        return this.searchResults;
    }

    getFilter(){
        return this.filter;
    }

    getAutoSuggest(){
        return this.autosuggest;
    }

    handleRequestCompleted(requestId) {
        if(requestId !== this.currentRequestId){
            return;
        }

        let result = RequestStore.getRequestResults(this.currentRequestId);
        if(result.url.indexOf(`${AppConstants.API_SECURITY}/data`) !== -1){
            this.initialized = true;
            this.searchResults = new SecuritySearchResults(result.body);
        }
        else if(result.url.indexOf(`${AppConstants.API_SECURITY}/details`) !== -1){
            this.securitiesDetailCache[result.body.interval.symbol] = result.body;
        }
        else if(result.url.indexOf(`${AppConstants.API_SECURITY}/lookup`) !== -1){
            this.autosuggest.suggestions = result.body;
            this.autosuggest.processingPartial = false;
        }

        this.currentRequestId = null;
    }

    updateFilter(fieldName, fieldValue) {
        if(this.filter.hasOwnProperty(fieldName)){
            this.filter[fieldName] = fieldValue;
        }
        else if(fieldName === 'addToken'){
            this.autosuggest.partial = '';
            this.autosuggest.suggestions = [];
            this.filter.symbols.push(fieldValue);
            this.filter.symbols = _.uniq(this.filter.symbols);

        }
        else if(fieldName === 'removeToken'){
            this.filter.symbols = _.without(this.filter.symbols, fieldValue);
        }
    }
    
    handleRequestPerformed(action) {
        if(action.url.indexOf(AppConstants.API_SECURITY) !== -1){
            this.currentRequestId = action.requestId;
        }

        if(action.url.indexOf(`${AppConstants.API_SECURITY}/lookup`) !== -1){
            this.autosuggest.processingPartial = true;
        }
    }

    updatePartial(partial) {
        this.autosuggest.partial = partial;
        if(partial === ''){
            this.autosuggest.suggestions = [];
        }
    }
}


export default new SecuritiesStore();
