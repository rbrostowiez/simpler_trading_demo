import React from 'react';

import SecuritiesStore from '../stores/SecuritiesStore';
import SecuritiesActions from '../actions/SecuritiesActions';


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

        let {tickerId} = this.state;

        return (
            <div className="security-details">
                <div className="row">
                    <div className="col">
                        <h2>{tickerId}</h2>
                    </div>
                </div>
                <div className="row">
                    
                </div>
            </div>
        )
    }
}