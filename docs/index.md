# react pods

React Pods is a pattern that for organizing React components loosely inspired by my experience working with Ember applications. It defines where functionality should live and how to test it. I have successfully used this pattern in codebases with 16+ engineers in multiple time zones.

## Pods

A *pod* is a way to wrap a React component to encapsulate how it is connected to the redux flow. A pod will always export only one *Component*, but the implementation of this component can be distributed through other concepts:

### Static Component

The *Static Component* is an implementation of a *Functional Component*. It has no state and no access to the store. Most pods will have a Static Component that renders HTML or other Pods.

The tests for Static Components should check that the expected HTML or child components are being rendered.


#### Example

`components/utils/LoadingMessage/component.js`

```javascript
import React from 'react';

export default function LoadingMessage() {
  return <div className="message message-loader">Loading...</div>;
}

LoadingMessage.displayName = 'LoadingMessage';

```

`specs/components/utils/LoadingMessage/component.spec.js`

```javascript
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Component from 'root/components/utils/LoadingMessage';

describe('components/utils/LoadingMessage/component', function () {
  it('renders the correct markup', function() {
    const renderer = new ShallowRenderer();
    renderer.render(<Component />);
    const output = renderer.getRenderOutput();
    expect(output.type).to.equal('div');
    expect(output.props).to.deep.equal({
      className: "message message-loader",
      children: 'Loading...',
    });
  });
});
```

### Controller Component

The *Controller Component* is an implementation of a *Class Component*. It can have it's own state or it can have its own instance methods, which can then be passed to the child components as props.

The tests for Static Components should check that the correct behavior is executed during the lifecycle methods, that the correct props are passed to the child components and that the functions that are passed as props execute the expected behavior.


#### Example

`components/utils/DropdownMenu/controller.js`

```javascript
import React from 'react';
import classnames from 'classnames';
import DropdownOption from 'components/utils/DropdownMenu/DropdownOption';

export default class DropdownMenu extends React.Component {
  constructor() {
    super();
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.state = {
      isOpen: false;
    };
  }

  onTriggerClick(e) {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { triggerText, dropdownOptions } = this.props;
    const menuClasses = classnames('dropdown-menu', {
      open: this.state.isOpen
    });
    return <div className="dropdown">
      <button onClick={this.onTriggerClick} className="dropdown-trigger">{triggerText}</button>
      <div className={menuClasses}>
        {dropdownOptions.map(o => <DropdownOption key={o.href} {...o} />)}
      </div>
    </div>;
  }
}

DropdownMenu.displayName = 'DropdownMenu';
```

`specs/components/utils/DropdownMenu/controller.spec.js`

```javascript
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import Controller from 'root/components/utils/DropdownMenu';

describe('components/utils/DropdownMenu/controller', function () {
  it('renders the correct markup', function() {
    const props = {
      dropdownOptions: [{ href: '/href-1' }, { href: '/href-2' }],
      triggerText: 'cool trigger text',
    };
    const renderer = new ShallowRenderer();
    renderer.render(<Controller {...props} />);
    const output = renderer.getRenderOutput();
    const button = TestUtils.findRenderedComponentWithType(output, 'button');
    expect(button.props.className).to.equal('dropdown-trigger');
    expect(button.props.children).to.equal('cool trigger text');
  });

  describe('toggle functionality on click', function() {
    it('toggles the open className on the menu', function() {
      const props = {
        dropdownOptions: [{ href: '/href-1' }, { href: '/href-2' }],
        triggerText: 'cool trigger text',
      };
      const renderer = new ShallowRenderer();
      renderer.render(<Controller {...props} />);

      let output = renderer.getRenderOutput();
      let menu = TestUtils.findRenderedDOMComponentWithClass(output, 'dropdown-menu');

      const button = TestUtils.findRenderedComponentWithType(output, 'button');
      expect(menu.className).to.equal('dropdown-menu');
      const preventDefault = sinon.stub();
      button.onClick({ preventDefault });

      output = renderer.getRenderOutput();
      menu = TestUtils.findRenderedDOMComponentWithClass(output, 'dropdown-menu');
      expect(menu.className).to.equal('dropdown-menu open');
    });  
  });
});
```

### Connector

The *connector* is a function that takes a Component and connects it to the store. It maps closely to the `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])` method in react-redux.

My preferred way to test the connector is to export each one of the argument functions and test each function independently. I have tried to test the connector function itself, but found that testing each function is good enough most of the times and it keeps the tests way simpler.

#### Example

`components/Contacts/ContactList/connector.js`

```javascript
import { connect } from 'react-redux';

export function mapStateToProps(state, ownProps) {
  const { query } = ownProps;
  function isContactMatch(contact) {
    return contact.name.indexOf(query) >= 0;
  }

  return {
    contacts: query ? state.contacts.filter(isContactMatch) : state.contacts;
  };
}

export default connect(mapStateToProps);
```

`spec/components/Contacts/ContactList/connector.spec.js`

```javascript
import { mapStateToProps } from 'root/components/Contacts/ContactList/connector';

describe('components/Contacts/ContactList/connector', function () {
  describe('#mapStateToProps', function() {
    const STATE = {
      dummyData: 'so dummy',
      contacts: [
        { name: 'Ned Flanders' },
        { name: 'Tod Flanders' },
        { name: 'Hank Hill' },
      ],
    };

    it('returns the unfiltered contacts if no query', function() {
      const result = mapStateToProps(STATE, {});
      expect(result).to.deep.equal({
        contacts: [
          { name: 'Ned Flanders' },
          { name: 'Tod Flanders' },
          { name: 'Hank Hill' },
        ],
      });
    });

    it('filters the contacts if a query is present', function() {
      const result = mapStateToProps(STATE, { query: 'Flanders' });
      expect(result).to.deep.equal({
        contacts: [
          { name: 'Ned Flanders' },
          { name: 'Tod Flanders' },
        ],
      });
    });
  });
});
```

### Example 1 - Stateless component

The simplest pod is a functional component that only renders HTML. It does not have access to the store or any state. Since there's a guarantee that this object will not grow any more complex it is ok to store it in a file named after the component.

`components/utils/LoadingMessage.js`

```javascript
import React from 'react';

export default function LoadingMessage() {
  return <div class="message message-loader">Loading...</div>;
}

LoadingMessage.displayName = 'LoadingMessage';

```

### Example 2 - Stateless component that has potential to become more complex

If there's a chance that the component could need to start tracking state or use the store then it's ok to save it in an `index.js` file in a directory named after the component:

`components/UserDropdown/index.js`

```javascript
import React from 'react';

export default function UserDropdown(props) {
  const { user } = props;
  return <div class="dropdown">
    <button class="dropdown-trigger">{user.emailAddress}</button
    <div class="dropdown-menu">
      <div class="dropdown-item"><a href="/settings">Settings</a></div>
      <div class="dropdown-item"><a href="/logout">Logout</a></div>
    </div>
  </div>;
}

UserDropdown.displayName = 'UserDropdown';
```
