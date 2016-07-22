## Button Component

An enhanced version of the standard HTML `<button>` element styled with [Material Design
Lite](https://getmdl.io) (MDL).

- http://www.google.com/design/spec/components/buttons.html
- https://github.com/google/material-design-lite/tree/mdl-1.x/src/button

### Example

```js
<Button primary={true}>Save</Button>
<Button>Cancel</Button>
<Button to="/some/page">View</Button>
```

### Options

| Prop          | Type     | Default     | Possible Values   
| ------------- | -------- | ----------- | ---------------------------------------------
| **component** |          | `button`    | React component to use, e.g. `a`
| **type**      | `string` | `flat`      | `raised`, `fab`, `mini-fab`, `icon`
| **to**        | `string` | `undefined` | A URL string
| **colored**   | `bool`   | `false`     | `true`, `false`
| **primary**   | `bool`   | `false`     | `true`, `false`
| **accent**    | `bool`   | `false`     | `true`, `false`
| **ripple**    | `bool`   | `false`     | `true`, `false`
