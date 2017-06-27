import React from 'react';
import Component from './component';

export default class Controller extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }

  handleSubmit() {
    this.props.createContact(this.state.name, this.state.phone);
  }

  updateProperty(propertyName, value) {
    this.setState({ [propertyName]: value });
  }

  render() {
    return <Component updateProperty={this.updateProperty} handleSubmit={this.handleSubmit} />;
  }
}
