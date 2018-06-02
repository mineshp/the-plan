module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jasmine": true,
        "browser": true
    },
    "extends": [
        "airbnb"
    ],
    "globals": {
        "jest": true,
        "document": true,
        "browser": true,
        "driver": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "max-len": [
            "warn",
            {
                "code": 120,
                "ignoreStrings": true,
                "ignoreRegExpLiterals": true
            }
        ],
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "jsx-a11y/href-no-hash": "off",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off",
        "strict": "warn",
        "curly": "error",
        "arrow-parens": ["error", "always"],
        "camelcase": "error",
        "no-var": "error",
        "react/jsx-filename-extension": "off",
        "comma-dangle": "off",
        "import/no-extraneous-dependencies": ["error",
            {
                "devDependencies": [
                    "**/acceptance_tests/**/*",
                    "**/*.test.js"
                ]
            }],
        "class-methods-use-this": ["off", {}]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": [
                    "node_modules",
                    "app"
                ]
            }
        }
    }
}