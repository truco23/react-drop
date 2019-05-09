import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainComponent from './main/MainComponent';
import BoxComponent from './box/BoxComponent';

const AppRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ MainComponent } />
            <Route path="/box/:id" component={ BoxComponent } />
        </Switch>
    </BrowserRouter>
)

export default AppRoutes;