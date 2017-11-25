import React from 'react';

export default class Header extends React.Component{
    
    render(){
        return (
            <header className="navbar navbar-dark bg-dark">
                <a href="/" className="navbar-brand">
                    Simpler Trading Demo App
                </a>
            </header>
        )
    }
}