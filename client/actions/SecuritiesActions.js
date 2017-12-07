import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../../shared/constants/AppConstants';
import UUID from 'uuid/v4';
import SecuritiesStore from "../stores/SecuritiesStore";

export default class SecuritiesActions {
    /**
     * Broadcasts the provided security symbol for SecuritiesStore consumption along with a request to fetch the data
     * for the symbol
     *
     * @param {string} symbol The security symbol to query
     */
    static setCurrentSecurity(symbol){
        AppDispatcher.handleAction({
            actionType: AppConstants.SET_CURRENT_SECURITY,
            symbol: symbol
        });

        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: `${AppConstants.API_SECURITY}/details/${symbol}`,
            requestId: UUID()
        });
    }

    /**
     * Broadcasts the provided partial symbol and broadcasts a request to retrieve the suggestions
     *
     * @param {string} partial The partial symbol to check
     */
    static lookupSymbol(partial){
        AppDispatcher.handleAction({ actionType: AppConstants.UPDATE_SECURITY_SEARCH_UPDATE_PARTIAL, partial: partial });

        if(partial === ''){
            return;
        }

        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: `${AppConstants.API_SECURITY}/lookup/${partial}`,
            partial: partial,
            requestId: UUID()
        });
    }

    /**
     * Broadcasts the updated field value with name and if the SecuritiesStore is stale, it will trigger a request for
     * search results.
     *
     * NOTE: Empty strings for field name and value ultimately change nothing, but mark the state as dirty
     *
     * @param {string} fieldName The field being changed
     * @param {any} fieldValue The value for the field
     */
    static updateSecuritySearchFilter(fieldName, fieldValue){
        AppDispatcher.handleAction({
            actionType: AppConstants.UPDATE_SECURITY_SEARCH_FILTER,
            fieldName: fieldName,
            fieldValue: fieldValue
        });

        if(SecuritiesStore.isFilterStale()){
            let postPayload = JSON.stringify(SecuritiesStore.getFilter());

            AppDispatcher.handleAction({
                actionType: AppConstants.PERFORM_REQUEST,
                url: `${AppConstants.API_SECURITY}/data`,
                requestOptions: {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': postPayload.length
                    },
                    body: new Buffer(postPayload)
                },
                requestId: UUID()
            });
        }
    }
}
