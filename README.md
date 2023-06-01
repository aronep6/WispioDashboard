# WispioDashboard 🌍

WispioDashboard is a React TypeScript project that serves as the front-end for the Wispio web application. It is built using modern web development technologies and tools, including React, TypeScript, and Firebase Hosting.

## Application global architecture

There is a schema of the application global architecture, with the `Wispio Dashboard` case linked to the `Google Identity Toolkit` and the `Wispio Centurion` backend API.

![Application global architecture](https://firebasestorage.googleapis.com/v0/b/wispiostaging.appspot.com/o/Wispio%20cloud%20infrastructure%20schema%20-%20Frame%2011.jpg?alt=media&token=0a2c3964-55f8-49b4-9656-d3412373e802)

## Development Workflow

We follow a simple Git workflow for development. The `master` branch serves as the main branch of development where new features are proposed and merged. Once a feature is ready, it is merged into the `master` branch using a pull request.

## Deployment process

### Pre-production (Staging)
We use GitHub Actions to automate the deployment process for WispioDashboard. We have a dedicated `staging` branch that is only used for deployment purposes. Whenever a commit is pushed to the `staging` branch, GitHub Actions automatically builds the project and deploys it to Firebase Hosting (staging project - `wispiostaging`).

### Production
The production deployment is similar to the pre-production deployment. We have a dedicated `production` branch that is only used for deployment purposes. Whenever a commit is pushed to the `production` branch, GitHub Actions automatically builds the project and deploys it to Firebase Hosting (production project - `wispioproduction`).

## Environment Variables

Wispio Dashboard is a public app so only public environment variables are provided in this project, so you can find them in files marked by `.env` extension.

## Getting Started

To get started with WispioDashboard, follow these steps:

1. Clone this repository to local machine.
2. Install the dependencies using `npm install`.
3. Start the development server using `npm run dev` or `yarn dev`, to run the application based on the staging schema. Otherwise if you want run the app on your locale schema type `npm run dev:local` or `yarn dev:local`.

WispioDashboard is built with the following technologies:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [SWC](https://swc.rs/) (built with Rust -> More fast)
