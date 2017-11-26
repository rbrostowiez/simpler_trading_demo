import React from 'react';
import _ from 'underscore';
import {Link} from 'react-router-dom';

import SecuritiesStore from '../stores/SecuritiesStore';

const currencyOptions = {
    style: 'currency',
    currency: 'USD'
};

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = SecuritiesStore.getSecuritiesSummary();
    }

    render() {

        let tableBody = _.map(this.state.securityDetails, security => (
            <tr key={security.tickerId}>
                <td>
                    <Link to={`/security/${security.tickerId}`}>{security.tickerId}</Link>
                </td>
                <td>
                    From: {security.startInterval} through {security.endInterval}, last refreshed: {security.lastRefreshed}
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
                    <div className="col">
                        <p className="alert alert-warning">
                            <strong>NOTE: </strong>
                            Most of the filter controls are disabled because there is not enough data to support their
                            functionality.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <form>
                            <div className="form-row">
                                <div className="col form-group">
                                    <input disabled type="text" className="form-control" name="ticker-search" placeholder="Ticker Search"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label htmlFor="interval-range-start">Start: </label>
                                    <select className="form-control" name="interval-range-start"
                                            id="interval-range-start" disabled>
                                        <option value={this.state.dataRangeMinDate}>
                                            {this.state.dataRangeMinDate}
                                        </option>
                                    </select>
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="interval-range-end"> End:</label>
                                    <select className="form-control" name="interval-range-end" id="interval-range-end"
                                            disabled>
                                        <option value={this.state.dataRangeMaxDate}>
                                            {this.state.dataRangeMaxDate}
                                        </option>
                                    </select>
                                </div>
                                <div className="col form-group">
                                    <label htmlFor="interval-size">Interval Size:</label>
                                    <select className="form-control" name="interval-size" id="interval-size" disabled>
                                        <option value="week">Week</option>
                                    </select>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col">
                                <strong>Securities Found: </strong>
                                <span>{Object.keys(this.state.securityDetails).length}</span>
                            </div>
                            <div className="col">
                                <strong>Total Volume: </strong>
                                <span>{this.state.totalVolume.toLocaleString('en-us')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Ticker Symbol</th>
                            <th>Data Coverage</th>
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
