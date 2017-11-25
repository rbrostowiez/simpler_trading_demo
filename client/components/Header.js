import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component{
    
    render(){
        return (
            <header className="navbar navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    Simpler Trading Demo App
                </Link>
            </header>
        )
    }
}