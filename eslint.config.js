import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import security from "eslint-plugin-security";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

import { rules as customRules } from "./eslint-rules/index.js";

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["node_modules/**", "dist/**", "build/**", ".expo/**", "android/**", "ios/**", "scripts/**", "assets/svg/**", "src/config/appConfig.ts", "**/__tests__/**", "**/__mocks__/**", "**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    },
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
            globals: {
                __DEV__: "readonly",
                require: "readonly",
                // Timer functions
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                setImmediate: "readonly",
                clearImmediate: "readonly",
                // Other common globals
                console: "readonly",
                global: "readonly",
                process: "readonly",
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-native": reactNative,
            import: importPlugin,
            "unused-imports": unusedImports,
            security,
            "jsx-a11y": jsxA11y,
            custom: { rules: customRules },
        },
        rules: {
            // 🔥 Core Quality
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "error",
            "no-var": "error",
            "prefer-const": "error",
            eqeqeq: ["error", "always"],
            "no-unsafe-optional-chaining": "error",
            "no-undef": "error",

            // 🎯 TypeScript Specific
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/ban-ts-comment": "error",
            "@typescript-eslint/no-require-imports": "off", // Allow require() for React Native assets
            "@typescript-eslint/no-unused-expressions": "error",
            "@typescript-eslint/no-unsafe-function-type": "error",
            "@typescript-eslint/prefer-ts-expect-error": "error",


            // 🧹 Imports & Variables
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ],

            // ⚛️ React & Hooks
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/self-closing-comp": "error",
            "react/jsx-boolean-value": ["error", "never"],
            "react/jsx-key": "error",
            "react/jsx-no-duplicate-props": "error",
            "react/jsx-no-undef": "error",
            "react/jsx-uses-react": "off", // Not needed in React 17+
            "react/jsx-uses-vars": "error",
            "react/no-array-index-key": "warn",
            "react/no-danger": "warn",
            "react/no-deprecated": "error",
            "react/no-direct-mutation-state": "error",
            "react/no-string-refs": "error",
            "react/no-unescaped-entities": "error",
            "react/no-unknown-property": "error",
            "react/no-unused-state": "error",
            "react/require-render-return": "error",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "off", // Disabled per user request

            // 📱 React Native Specific
            "react-native/no-unused-styles": "error",
            "react-native/no-inline-styles": "off", // Allow inline styles for dynamic/conditional values
            // "react-native/no-color-literals": "error", // Changed from warn to error
            "react-native/no-single-element-style-arrays": "error",
            "react-native/no-raw-text": "off", // Sometimes needed for flexibility

            // 📦 Imports
            // "import/order": [
            //     "error",
            //     {
            //         groups: [
            //             "builtin",
            //             "external",
            //             "internal",
            //             ["parent", "sibling", "index"],
            //         ],
            //         alphabetize: { order: "asc", caseInsensitive: true },
            //         "newlines-between": "always",
            //     },
            // ],
            "import/no-duplicates": "error",
            "import/no-unresolved": "off", // Turn off as it can be problematic with React Native
            "import/named": "off", // Turn off for React Native compatibility
            "import/default": "off", // Turn off for React Native compatibility  
            "import/namespace": "off", // Turn off to prevent React Native parsing errors

            // 🏗️ Code Quality & Performance
            "complexity": ["warn", { max: 50 }],
            "max-depth": ["warn", { max: 10 }],
            "max-lines": ["warn", { max: 1500, skipBlankLines: true, skipComments: true }],
            "max-lines-per-function": ["warn", { max: 400, skipBlankLines: true, skipComments: true }],
            "max-params": ["warn", { max: 10 }],

            // 🔒 Security
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-new-func": "error",
            "no-script-url": "error",
            "no-alert": "warn",
            "no-caller": "error",

            // 🚫 Error Prevention
            "no-fallthrough": "error",
            "no-duplicate-case": "error",
            "no-unreachable": "error",
            "no-constant-condition": "error",
            "no-empty": "error",
            "no-extra-boolean-cast": "error",
            "no-regex-spaces": "error",
            "valid-typeof": "error",
            "no-unused-labels": "error",
            "no-self-assign": "error",
            "no-self-compare": "error",
            "no-dupe-keys": "error",
            "no-dupe-args": "error",
            "no-sparse-arrays": "error",
            "no-extra-semi": "error",

            // 🔧 Custom Rules
            // "custom/no-inline-param-types": "error",
            // "custom/conditional-inline-styles": "warn",

            // 🛡️ Security Rules
            "security/detect-object-injection": "off",
            "security/detect-non-literal-regexp": "error",
            "security/detect-unsafe-regex": "error",
            "security/detect-buffer-noassert": "error",
            "security/detect-child-process": "error",
            "security/detect-disable-mustache-escape": "error",
            "security/detect-eval-with-expression": "error",
            "security/detect-no-csrf-before-method-override": "error",
            "security/detect-non-literal-fs-filename": "error",
            "security/detect-non-literal-require": "error",
            "security/detect-possible-timing-attacks": "error",
            "security/detect-pseudoRandomBytes": "error",

            // ♿ Accessibility Rules
            "jsx-a11y/alt-text": "error",
            "jsx-a11y/anchor-has-content": "error",
            "jsx-a11y/anchor-is-valid": "error",
            "jsx-a11y/aria-props": "error",
            "jsx-a11y/aria-proptypes": "error",
            "jsx-a11y/aria-role": "error",
            "jsx-a11y/aria-unsupported-elements": "error",
            "jsx-a11y/click-events-have-key-events": "warn",
            "jsx-a11y/heading-has-content": "error",
            "jsx-a11y/iframe-has-title": "error",
            "jsx-a11y/img-redundant-alt": "error",
            "jsx-a11y/interactive-supports-focus": "error",
            "jsx-a11y/label-has-associated-control": "error",
            "jsx-a11y/media-has-caption": "warn",
            "jsx-a11y/mouse-events-have-key-events": "warn",
            "jsx-a11y/no-access-key": "error",
            "jsx-a11y/no-autofocus": "off",
            "jsx-a11y/no-distracting-elements": "error",
            "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
            "jsx-a11y/no-noninteractive-element-interactions": "warn",
            "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
            "jsx-a11y/no-redundant-roles": "error",
            "jsx-a11y/no-static-element-interactions": "warn",
            "jsx-a11y/role-has-required-aria-props": "error",
            "jsx-a11y/role-supports-aria-props": "error",
            "jsx-a11y/scope": "error",
            "jsx-a11y/tabindex-no-positive": "error",
        },
        settings: {
            react: { version: "detect" },
        },
    }
);
