import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import UUID from 'uuid/v4';
import SecuritiesStore from "../stores/SecuritiesStore";

export default class SecuritiesActions {
    static setCurrentSecurity(tickerId){
        AppDispatcher.handleAction({
            actionType: AppConstants.SET_CURRENT_SECURITY,
            tickerId: tickerId
        });
    }

    static loadData(){
        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: `${AppConstants.API_SECURITY}/data`,
            requestId: UUID()
        });
    }

    static loadSecurity(symbol){
        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: `${AppConstants.API_SECURITY}/details/${symbol}`,
            requestId: UUID()
        });
    }

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

    static updateSecuritySearchFilter(fieldName, fieldValue){
        AppDispatcher.handleAction({
            actionType: AppConstants.UPDATE_SECURITY_SEARCH_FILTER,
            fieldName: fieldName,
            fieldValue: fieldValue
        });

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