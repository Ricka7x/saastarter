# NextJS Monorepo

This project is a monorepo containing two Next.js applications: `app` and `docs`. It uses npm workspaces to manage the monorepo structure.

## Project Structure

The project is organized as follows:

```
nextjs-monorepo/
├── app/             # Main application
├── docs/            # Documentation application
├── package.json     # Root package.json for managing workspaces
└── vercel.json      # Vercel configuration for deployment
```

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (version 7 or higher for workspaces support)

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/nextjs-monorepo.git
   cd nextjs-monorepo
   ```

2. Install dependencies for both workspaces:
   ```
   npm install
   ```

## Environment Variables

Next.js doesn't natively support sharing environment variables across multiple apps in a monorepo from the root level. However, there are workarounds to manage environment variables from the root:

1. Create a `.env` file in the root directory of the monorepo.

2. Create a script in the root `package.json` to copy the root `.env` file to each project. Add this to your `scripts` section:

   ```json
   "scripts": {
     ...
     "copy-env": "node -e \"const fs = require('fs'); ['app', 'docs'].forEach(dir => fs.copyFileSync('.env', `${dir}/.env`));\""
   }
   ```

3. Update your development and build scripts to run this command first:

   ```json
   "scripts": {
     "dev": "npm run copy-env && concurrently \"npm run dev:app\" \"npm run dev:docs\"",
     "build": "npm run copy-env && npm run build:app && npm run build:docs",
     ...
   }
   ```

4. For local development, you can still use project-specific `.env.local` files in each project directory to override or add to the shared variables.

Remember to add `.env` to your `.gitignore` file to avoid committing sensitive information.

To access these variables in your Next.js application, use `process.env.VARIABLE_NAME`.

Note: This method copies the same environment variables to all projects. If you need different variables for each project, you'll need to use project-specific `.env` files or modify the copy script to handle different configurations.

## Development

To run both applications in development mode concurrently:

```
npm run dev
```

This will start the `app` on `http://localhost:3000` and `docs` on `http://localhost:3001`.

To run applications individually:

- For `app`: `npm run dev:app`
- For `docs`: `npm run dev:docs`

## Building

To build both applications:

```
npm run build
```

To build applications individually:

- For `app`: `npm run build:app`
- For `docs`: `npm run build:docs`

## Production

To start both applications in production mode:

```
npm start
```

To start applications individually:

- For `app`: `npm run start:app`
- For `docs`: `npm run start:docs`

## Adding Dependencies

To add dependencies to specific workspaces:

- For `app`: `npm run add:app [package-name]`
- For `docs`: `npm run add:docs [package-name]`

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file in the root directory sets up the following:

- Rewrites rules to direct traffic to the appropriate application
- Build and install commands for the entire monorepo

When deploying to Vercel, it will automatically use these configurations. For handling environment variables in deployment:

1. Set up your environment variables in the Vercel dashboard for each project.
2. If using the root `.env` file approach, make sure to run the `copy-env` script as part of your build process on Vercel.

## License

[MIT](https://choosealicense.com/licenses/mit/)