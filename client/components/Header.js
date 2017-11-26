import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component{
    
    render(){
        //TODO: Add a nav element for the current security if one is selected(via SecuritiesStore)
        return (
            <header className="navbar navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    Simpler Trading Demo App
                </Link>
                <Link to="/about" className="nav-link">
                    About
                </Link>
            </header>
        )
    }
}