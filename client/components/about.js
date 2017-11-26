import React from 'react';

export default class About extends React.Component {
    render(){
        return (
            <div className="about container-fluid">
                <div className="card bg-light mb-3">
                    <div className="card-header">
                        About
                    </div>
                    <div className="card-body">
                        <p>
                            This is a demo app for Simpler Trading; please refere to README.md for more information.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}