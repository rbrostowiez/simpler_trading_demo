import {EventEmitter} from 'events';
import AppConstants from "../../shared/constants/AppConstants";
import RequestStore from "./RequestStore";
import AppDispatcher from '../dispatcher/AppDispatcher';

class ReadMeStore extends EventEmitter {
    constructor(){
        super();

        this.readme = null;

        AppDispatcher.register((payload) => {
            let {action} = payload;

            switch(action.actionType){
                case AppConstants.REQUEST_COMPLETED:
                    this.handleRequestCompleted(action);
                    break;
                case AppConstants.PERFORM_REQUEST:
                    this.handlePerformRequest(action);
                    break;
                default:
                    return true;
            }

            this.emit('change');
        });
    }

    handleRequestCompleted(action){
        if(action.requestId = this.currentRequestId){
            let results = RequestStore.getRequestResults(this.currentRequestId);

            this.readme = results.body.text;

            this.currentRequestId = null;
        }
    }

    handlePerformRequest(action){
        if(action.url.indexOf(`${AppConstants.README_URL}`) !== -1){
            this.currentRequestId = action.requestId;
        }
    }

    getReadMe(){
        return {text: this.readme};
    }
}

export default new ReadMeStore();
