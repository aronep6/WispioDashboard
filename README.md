# WispioFront 🌍

WispioFront is a React TypeScript project that serves as the front-end for the Wispio web application. It is built using modern web development technologies and tools, including React, TypeScript, and Firebase Hosting.

## Development Workflow

We follow a simple Git workflow for development. The `master` branch serves as the main branch of development where new features are proposed and merged. Once a feature is ready, it is merged into the `master` branch using a pull request.

## Deployment

We use GitHub Actions to automate the deployment process for WispioFront. We have a dedicated `live` branch that is only used for deployment purposes. Whenever a commit is pushed to the `live` branch, GitHub Actions automatically builds the project and deploys it to Firebase Hosting.

## Getting Started

To get started with WispioFront, follow these steps:

1. Clone this repository to local machine.
2. Install the dependencies using `npm install`.
3. Start the development server using `npm run dev` or `yarn dev`.

WispioFront is built with the following technologies:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [SWC](https://swc.rs/) (built with Rust -> More fast)
