## How to Integrate Material Design Lite (MDL)

### Step 1

Install [`react-mdl`](http://www.npmjs.com/package/react-mdl) npm package:

```sh
$ npm install react-mdl --save
```

Add [Material Design Lite](https://getmdl.io) (MDL) CSS and JavaScript files as entry points
in [`webpack.config.js`](../../webpack.config.js):

```js
const config = {

  entry: [
    '!!style!css!react-mdl/extra/material.min.css',  // <==
    'react-mdl/extra/material.min.js',               // <==
    './main.js',
  ],

  ... 
  
};
```

**Note**: Due to compatibility issues of the Layout component in MDL `v1.1.x` with React, you must use
the the patched version of MDL from `react-mdl` npm package (as opposed to
[`material-design-lite`](https://www.npmjs.com/package/material-design-lite)). This is a [known
issue](https://github.com/google/material-design-lite/pull/1357), which will be fixed in `v2.x`.

### Step 2

Decorate your UI elements with MDL classes, for example:

#### Badge

```jsx
<span className="mdl-badge" data-badge="4">Inbox</span>
```

#### Grid

```jsx
<div className="mdl-grid">
  <div className="mdl-cell mdl-cell--4-col">Content</div>
  <div className="mdl-cell mdl-cell--4-col">goes</div>
  <div className="mdl-cell mdl-cell--4-col">here</div>
</div>
```

### List

```jsx
<ul className="mdl-list">
  <li className="mdl-list__item"></li>
  <li className="mdl-list__item"></li>
  <li className="mdl-list__item"></li>
</ul>
```

### Step 3
 
Create stand-alone React components for MDL elements that rely on JavaScript code to operate (see
MDL [source code](https://github.com/google/material-design-lite/tree/mdl-1.x/src)). After such
component mounts into the DOM, it need to notify MDL runtime that the underlying DOM elements can be
directly manipulated by MDL; likewise right before the React component is being removed from the DOM
it needs to notify MDL so it could do proper clean up. MDL provides `upgradeElement(node)` and
`downgradeElements(nodes)` API methods for that. For example, to implement a Button component you
would write code similar to this:

#### `components/Button/Button.js`

```js
import React, { PropTypes } from 'react';
import cx from 'classnames';

class Button extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    raised: PropTypes.bool,
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);      // <==
  }
  
  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);   // <==
  }

  render() {
    return (
      <button
        ref={node => (this.root = node)}                    // <==
        {...this.props}
        className={cx(
          'mdl-button',
          'mdl-js-button',
          this.props.raised && 'mdl-button--raised',
          this.props.className)}
      />
    );
  }

}

export default Button;
```

#### Usage Example:

```js
import Button from './components/Button';

function MyComponent() {
  return (
    <div>
      <Button raised={true}>Click me!</Button>
    </div>
  );
}

export default MyComponent;
```

### Step 4

Extend MDL components with your own styles (via [CSS Modules](https://github.com/css-modules/css-modules)
or [inline styles](https://facebook.github.io/react/tips/inline-styles.html)):

#### `components/Spinner/Spinner.css`

```css
.spinner {
  border: 1px solid red;
}
```

#### `components/Spinner/Spinner.js`

```js
import React, { PropTypes } from 'react';
import s from './Spinner.css';

class Spinner extends React.Component {

  static propTypes = {
    isActive: PropTypes.bool,
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }
  
  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const active = this.props.isActive ? ' is-active' : '';
    return (
      <div
        ref={node => (this.root = node)}
        className={`mdl-spinner mdl-js-spinner ${s.spinner}${active}`}
      />
    );
  }

}

export default Spinner;
```
