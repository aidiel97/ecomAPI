module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "airbnb",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules":
  {
    "no-param-reassign": 0,
    "eol-last": 2,
    "eqeqeq": [
      2,
      "always"
    ],
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "jsx-quotes": 2,
    "max-len": [
      2,
      {
        "code": 100,
        "ignoreStrings": true
      }
    ],
    "max-lines": [
      2,
      {
        "max": 300,
        "skipBlankLines": true,
        "skipComments": true
      }
    ],
    "no-console": 0,
    "no-debugger": 2,
    "no-var": 2,
    "object-curly-spacing": [
      2,
      "always",
      {
        "arraysInObjects": false
      }
    ],
    "quotes": [
      2,
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "semi": [
      2,
      "always"
    ],
    "sort-keys": [
      0,
      "asc",
      {
        "caseSensitive": false,
        "natural": false
      }
    ]
  }
};