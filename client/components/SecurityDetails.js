import React from 'react';
import _ from 'underscore';

import SecuritiesStore from '../stores/SecuritiesStore';
import SecuritiesActions from '../actions/SecuritiesActions';
import AppConstants from '../constants/AppConstants';


export default class SecurityDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = false;
    }

    componentDidMount(){
        SecuritiesStore.on('change', e => this.setState(SecuritiesStore.getCurrentSecurityDetails()), this);
        SecuritiesActions.setCurrentSecurity(this.props.match.params.tickerId);
    }


    render(){
        if(!this.state){
            return (<div className="alert alert-danger">Loading!</div>)
        }

        let {tickerId, seriesTotals, startInterval, endInterval, lastRefreshed, seriesData} = this.state;

        return (
            <div className="security-details container-fluid">
                <div className="row">
                    <div className="col">
                        <h2></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card bg-light mb-3">
                            <div className="card-header">
                                {tickerId}
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <strong className="d-block">Last Refreshed: </strong>
                                        <span >{lastRefreshed}</span>
                                    </div>
                                    <div className="col">
                                        <strong className="d-block">Data Start: </strong>
                                        <span >{startInterval}</span>
                                    </div>
                                    <div className="col">
                                        <strong className="d-block">Data End: </strong>
                                        <span>{endInterval}</span>
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
                                                <td>{seriesTotals.open.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{seriesTotals.close.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{seriesTotals.high.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{seriesTotals.low.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{seriesTotals.volume.toLocaleString('en-us')}</td>
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
                                        {_.map(seriesData, (interval, intervalName) => (
                                            <tr key={intervalName}>
                                                <td>{intervalName}</td>
                                                <td>{interval.open.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{interval.close.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{interval.high.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{interval.low.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                                                <td>{interval.volume.toLocaleString('en-us')}</td>
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