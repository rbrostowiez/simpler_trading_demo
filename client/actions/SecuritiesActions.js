import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import UUID from 'uuid/v4';

export default class SecuritiesActions {
    static setCurrentSecurity(tickerId){
        AppDispatcher.handleAction({
            actionType: AppConstants.SET_CURRENT_SECURITY,
            tickerId: tickerId
        });
    }

    static loadData(){
        const reqId = UUID();
        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: `${AppConstants.API_SECURITY}/data`,
            requestId: reqId
        });
        return reqId;
    }

    static loadSecurity(symbol){
        let reqId = UUID();
        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: `${AppConstants.API_SECURITY}/details/${symbol}`,
            requestId: reqId
        });
        return reqId;
    }

    static lookupSymbol(partial){
        const reqId = UUID();
        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: `${AppConstants.API_SECURITY}/lookup/${partial}`,
            requestId: reqId
        });
        return reqId;
    }
}