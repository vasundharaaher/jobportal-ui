# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Environment configuration

Set the API server URL in `.env` at the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Copy `.env.example` to `.env` as a starting point and replace the URL for your environment. Restart the Vite dev server after changing environment variables. The API client and authentication requests use this base URL.

Vite embeds `VITE_*` values in the browser bundle, so only use them for public configuration such as API URLs. Never put secrets, private keys, or credentials in these variables. Configure the same variable in your production build environment.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
