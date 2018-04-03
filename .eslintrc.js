module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'class-methods-use-this': 0,
  },
  env: {
    jest: true,
    browser: true,
  }
};