import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Component(props) {
  const { contacts } = props;
  return <div>
    <h2>Contacts list</h2>
    <ul className="nav nav-tabs">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Welcome</NavLink></li>
      <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/contacts/new">New</NavLink></li>
    </ul>
    <div className="row">
      <div className="col-sm-4">
        <ul>
          {contacts.map((c) => <li key={c.id}>{c.attributes.name}</li>)}
        </ul>
      </div>
      <div className="col-sm-8">
        {props.children}
      </div>
    </div>
  </div>
}
