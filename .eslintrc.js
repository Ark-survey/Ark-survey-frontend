module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
  ],
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    }
  },
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};