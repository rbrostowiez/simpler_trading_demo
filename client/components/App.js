import React from 'react';
import _ from 'underscore';

import SecuritiesStore from '../stores/SecuritiesStore';
import SecuritySearchForm from './search-form/SecuritySearchForm';
import SecuritySearchResultRow from "./SecuritySearchResultRow";
import AppConstants from "../constants/AppConstants";


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onSecurityStoreChange = () => {
            this.setState(SecuritiesStore.getSearchResults());
        };

        this.state = SecuritiesStore.getSearchResults();
    }

    componentDidMount(){
        SecuritiesStore.on('change', this.onSecurityStoreChange);
    }

    componentWillUnmount(){
        SecuritiesStore.removeListener('change', this.onSecurityStoreChange);
    }

    render() {
        let {filter, securities, summary: {totalVolume, securityCount}} = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="alert alert-warning">
                            <strong>NOTE: </strong>
                            <ul>
                                <li>
                                    Generated symbols use the following letters:
                                    {AppConstants.GENERATED_SYMBOL_LETTERS.split('').join(', ')}.
                                </li>
                                <li>
                                    Start/End Dates use the current date to generate week intervals as it would take
                                    too much time to implement a full calendar picker integration.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">Search Securities</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <SecuritySearchForm props={filter} />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <div className="row">
                                            <div className="col">
                                                <strong>Securities Found: </strong>
                                                <span>{securityCount.toLocaleString('en-us')}</span>
                                            </div>
                                            <div className="col">
                                                <strong>Total Volume: </strong>
                                                <span>{totalVolume.toLocaleString('en-us')}</span>
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
                                            {_.map(securities, (security, index) => (
                                                <SecuritySearchResultRow {...security} key={`result-${index}`} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
