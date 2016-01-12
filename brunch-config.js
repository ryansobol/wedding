module.exports.config = {
  files: {
    javascripts: {
      joinTo: 'app.js'
    },

    stylesheets: {
      joinTo: {
        'index.css': /^app\/styles\/index/,
        'replies.css': /^app\/styles\/replies/
      }
    }
  },

  plugins: {
    babel: {
      pattern: /\.(js|jsx)$/
    }
  }
}
