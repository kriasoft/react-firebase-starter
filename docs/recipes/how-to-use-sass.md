## How to Use Sass

**1**. Install [`sass-loader`](https://github.com/jtangelder/sass-loader) as a development dependency:

```sh
$ npm install sass-loader --save-dev
```

**2**. Update `webpack.config.js` file to use `sass-loader` for `.scss` files:

```js
const config = {
  ...
  module: {
    loaders: [
      ...
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({ sourceMap: isDebug, minimize: !isDebug })}`,
          'postcss-loader?pack=sass',
          'sass-loader',
        ],
      },
      ...
    ]
  }
  ...
}
```

**3**: Add one more configuration (pack) for [PostCSS](https://github.com/postcss/postcss) named
`sass` to enable [Autoprefixer](https://github.com/postcss/autoprefixer) for your `.scss` files:

```js
const config = {
  ...
  postcss(bundler) {
    return {
      default: [
        ...
      ],
      sass: [
        require('autoprefixer')(),
      ],
    };
  }
  ...
}
```

For more information visit https://github.com/jtangelder/sass-loader
