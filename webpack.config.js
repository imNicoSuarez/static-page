var pkg = require('./package.json');

module.exports = {
  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  entry:  './app/app.jsx',

  output: {
    path: './public/dist/',
    filename: pkg.name + '.js'
  },

  module: {
    loaders: [
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /(\.js|\.jsx)$/,
        loader: "babel",
        query: { presets: ['es2015', 'stage-0', 'react'] }
      }
    ]
  },


};
