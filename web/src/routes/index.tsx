import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Landing, OrphanagesMap, CreateOrphanage, Orphanage } from '../pages'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch> 
        <Route exact path="/" component={Landing} />
        <Route exact path="/orphanages" component={OrphanagesMap} />
        <Route exact path="/orphanages/create" component={CreateOrphanage} />
        <Route exact path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;