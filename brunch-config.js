module.exports.config = {
  files: {
    javascripts: {
      joinTo: 'app.js'
    },

    stylesheets: {
      joinTo: 'app.css'
    }
  },

  plugins: {
    babel: {
      pattern: /\.(js|jsx)$/
    }
  }
}
