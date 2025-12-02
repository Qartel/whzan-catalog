# Whzan Catalog Explorer

A modern React + TypeScript catalog UI built for the Whzan Senior Frontend assignment.

This project showcases:

- A responsive, accessible catalog UI with **search, filters, sorting, pagination** and **favorites**
- A **mock REST API** (Node + Express) backed by `products.json`
- **React Query** for data fetching & caching
- **Zustand** for client-side view + filter + favorites state
- A consistent **MUI design system** with **light / dark mode** and a clean black/white/grey palette with green accents

---

## Tech Stack

**Frontend**

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Material UI (MUI)](https://mui.com/) for UI components & theming
- [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching/caching
- [Zustand](https://github.com/pmndrs/zustand) for global state (filters, view mode, favorites)
- React Router v6 for routing

**Backend (mock)**

- Node.js + Express
- In-memory JSON data (`server-mock/data/products.json`)

---

# INSTALL INSTRUCTIONS:

>>>>> Clone the repo
>>>>> npm i
>>>>> npm run dev:server
>>>>> npm run dev

>>>>> Create a `.env` file if you want to override the API URL:  VITE_API_BASE_URL=http://localhost:4000

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
