import {EventEmitter} from 'events';
import 'whatwg-fetch';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../../shared/constants/AppConstants';

class RequestStore extends EventEmitter {
    constructor(){
        super();

        this.requests = {};

        AppDispatcher.register((payload)=>{
            let {action} = payload;

            switch(action.actionType){
                case AppConstants.PERFORM_REQUEST:
                    this.fetch(action.url, action.requestOptions, action.requestId);
                    break;
                default: return true;
            }
        });
    }

    fetch(url, requestOptions, requestId) {
        fetch(`${AppConstants.SITE_URL}${url}`, requestOptions)
            .then(res => {
                return res.json().then((data) => {
                    return {
                        url: url,
                        body: data
                    }
                });
            })
            .then(res => {
                this.requests[requestId] = res;
                AppDispatcher.handleAction({
                    actionType: AppConstants.REQUEST_COMPLETED,
                    requestId: requestId
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    cancel(requestId){
        //TODO: this
    }


    getRequestResults(requestId) {
        let temp = this.requests[requestId];
        return temp;
    }
}

export default new RequestStore();
