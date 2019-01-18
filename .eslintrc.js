module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "settings": {
    "import/resolver": "webpack"
  },
  "extends": "airbnb-base",
  "parserOptions": {
      "sourceType": "module"
  },
  "parser": "babel-eslint",
  "rules": {
    "no-new": "off",
    "max-len": ["error", { "code": 220 }],
    "no-console": [
      "warn",
      {
        "allow": ["warn", "error", "log"],
      }
    ],
    "import/extensions": [
      {
        "<extension>": "never",
      }
    ],
    "class-methods-use-this": ["off"],
    "no-useless-constructor": "off",
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
  }
}
