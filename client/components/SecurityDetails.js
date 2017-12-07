import React from 'react';
import _ from 'underscore';

import SecuritiesStore from '../stores/SecuritiesStore';
import SecuritiesActions from '../actions/SecuritiesActions';
import AppConstants from '../../shared/constants/AppConstants';


export default class SecurityDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = false;

        this.onSecuritiesStoreChange = () => {
            this.setState(SecuritiesStore.getCurrentSecurityDetails());
        };

        SecuritiesActions.setCurrentSecurity(this.props.match.params.symbol);
    }

    componentDidMount(){
        SecuritiesStore.on('change', this.onSecuritiesStoreChange);
    }

    componentWillUnmount(){
        SecuritiesStore.removeListener('change', this.onSecuritiesStoreChange);
    }

    render(){
        if(!this.state){
            return (<div className="alert alert-danger">Loading!</div>)
        }

        let {interval: { symbol, lastRefreshed, open, close, high, low, volume, dataStart, dataEnd }, intervalData} = this.state;

        return (
            //TODO: More components and less giant blocks of HTML!
            <div className="security-details container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card bg-light mb-3">
                            <div className="card-header">
                                {symbol}
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <strong className="d-block">Last Refreshed: </strong>
                                        <span >{lastRefreshed}</span>
                                    </div>
                                    <div className="col">
                                        <strong className="d-block">Data Start: </strong>
                                        <span >{dataStart}</span>
                                    </div>
                                    <div className="col">
                                        <strong className="d-block">Data End: </strong>
                                        <span>{dataEnd}</span>
                                    </div>
                                    <div className="col">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Open</th>
                                                <th>Close</th>
                                                <th>High</th>
                                                <th>Low</th>
                                                <th>Volume</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{open.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{close.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{high.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{low.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{volume.toLocaleString('en-us')}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Interval</th>
                                            <th>Open</th>
                                            <th>Close</th>
                                            <th>High</th>
                                            <th>Low</th>
                                            <th>Volume</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {_.map(intervalData, ({dataStart, open, close, high, low, volume}) => (
                                            <tr key={dataStart}>
                                                <td>{dataStart}</td>
                                                <td>{open.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{close.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{high.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{low.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{volume.toLocaleString('en-us')}</td>
                                            </tr>
                                        ), this)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
