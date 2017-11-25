import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../components/App';
import Header from '../components/Header';
import SecurityDetails from '../components/SecurityDetails';

export default (
    <BrowserRouter>
        <div>
            <Header />
            <Route path="/" component={App} />
            <Route path="/security/:tickerId" component={SecurityDetails} />
        </div>

    </BrowserRouter>
);
