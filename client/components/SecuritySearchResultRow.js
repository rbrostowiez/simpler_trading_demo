import React from 'react';
import {Link} from 'react-router-dom';
import AppConstants from "../../shared/constants/AppConstants";


export default class SecuritySearchResultRow extends React.Component {
    render(){
        let {symbol, open, close, high, low, volume, lastRefreshed, dataStart, dataEnd} = this.props;
        return (
            <tr key={symbol}>
                <td>
                    <Link to={`/security/${symbol}`}>{symbol}</Link>
                </td>
                <td>
                    From: {dataStart} through {dataEnd}, last refreshed: {lastRefreshed}
                </td>
                <td>{open.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                <td>{close.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                <td>{high.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                <td>{low.toLocaleString('en-us', AppConstants.CURRENCY_OPTIONS)}</td>
                <td>{volume.toLocaleString('en-us')}</td>
            </tr>
        );
    }
}
