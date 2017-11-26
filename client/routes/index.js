import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../components/App';
import Header from '../components/Header';
import SecurityDetails from '../components/SecurityDetails';
import About from '../components/about';

//TODO: Fix this so Header can have path-information as well
export default (
    <BrowserRouter>
        <div>
            <Header />
            <Route exact path="/" component={App} />
            <Route path="/security/:tickerId" component={SecurityDetails} />
            <Route path="/about" component={About} />
        </div>
    </BrowserRouter>
); 
