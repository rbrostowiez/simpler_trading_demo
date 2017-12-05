import fetch from 'fetch';

import {EventEmitter} from 'events';

class RequestStore extends EventEmitter {
    constructor(){
        super();


    }
}

export default new RequestStore();