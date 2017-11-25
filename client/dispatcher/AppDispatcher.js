import {Dispatcher} from 'flux';

const AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = (action) => {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
};

export default AppDispatcher;