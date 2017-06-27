import React from 'react';
import { Switch, Route, Router } from 'react-router';
import { NavLink } from 'react-router-dom'
import Layout from './components/Layout';
import createBrowserHistory from 'history/createBrowserHistory';

import ContactsRoot from './components/Contacts/Root';
import ContactsCreate from './components/Contacts/Create';

const history = createBrowserHistory();

export default function Component(props) {
  return <Router history={history}>
    <Switch>
      <Layout>
        <Route exact path="/" component={ContactsRoot} />
        <Route path="/contacts/new" component={ContactsCreate} />
      </Layout>
    </Switch>
  </Router>;
}
