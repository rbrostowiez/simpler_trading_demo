import React from 'react';
import _ from 'underscore';

import SecuritiesStore from '../stores/SecuritiesStore';

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = SecuritiesStore.getSecuritySummary();
    }

    render(){

        let tableBody = _.map( this.state, security => (
            <tr>
                <td>{security.tickerId}</td>
                <td>{security.seriesTotals.open}</td>
                <td>{security.seriesTotals.close}</td>
                <td>{security.seriesTotals.high}</td>
                <td>{security.seriesTotals.low}</td>
                <td>{security.seriesTotals.volume}</td>
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
