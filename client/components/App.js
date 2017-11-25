import React from 'react';
import _ from 'underscore';
import {Link} from 'react-router-dom';

import SecuritiesStore from '../stores/SecuritiesStore';

const currencyOptions = {
    style: 'currency',
    currency: 'USD'
};

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = SecuritiesStore.getSecuritySummary();
    }

    render(){

        let tableBody = _.map( this.state, security => (
            <tr>
                <td>
                    <Link to={`/security/${security.tickerId}`}>{security.tickerId}</Link>
                </td>
                <td>{security.seriesTotals.open.toLocaleString('en-us', currencyOptions)}</td>
                <td>{security.seriesTotals.close.toLocaleString('en-us', currencyOptions)}</td>
                <td>{security.seriesTotals.high.toLocaleString('en-us', currencyOptions)}</td>
                <td>{security.seriesTotals.low.toLocaleString('en-us', currencyOptions)}</td>
                <td>{security.seriesTotals.volume.toLocaleString('en-us')}</td>
            </tr>
        ));

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1>Welcome!</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p>This is a demo app, below you can see the information on current financial securities.</p>
                    </div>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ticker Symbol</th>
                                <th>Open</th>
                                <th>Close</th>
                                <th>High</th>
                                <th>Low</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
