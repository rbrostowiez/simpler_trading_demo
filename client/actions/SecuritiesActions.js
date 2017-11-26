import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default class SecuritiesActions {
    static setCurrentSecurity(tickerId){
        AppDispatcher.handleAction({
            actionType: AppConstants.SET_CURRENT_SECURITY,
            tickerId: tickerId
        });
    }
}