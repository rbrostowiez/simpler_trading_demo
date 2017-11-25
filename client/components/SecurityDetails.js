import React from 'react';

export default class SecurityDetails extends React.Component{
    render(){

        let {match, location, history} = this.props;
        let {tickerId} = match.params;

        return (
            <div className="security-details">
                <h2>{tickerId}</h2>
            </div>
        )
    }
}