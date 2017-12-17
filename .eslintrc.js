module.exports = {
  "extends": "airbnb",
  rules: {
    'class-methods-use-this': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
  env: {
    jest: true,
    browser: true,
  }
};