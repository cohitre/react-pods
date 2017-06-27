import React from 'react';

export default function Component(props) {
  const { handleSubmit, updateProperty } = props;

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit();
  }
  return <form onSubmit={onSubmit}>
    <h3>New Contact</h3>
    name: <input onChange={(e) => updateProperty('name', e.target.value) } /><br/>
    phone: <input onChange={(e) => updateProperty('phone', e.target.value) } /><br/>
    <button type="submit">Save</button>
  </form>;
}
