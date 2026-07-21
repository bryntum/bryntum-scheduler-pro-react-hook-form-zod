# Using React Hook Form and Zod with Bryntum Scheduler Pro

A [Bryntum Scheduler Pro](https://bryntum.com/products/schedulerpro/) showing form validation in the task editor. There are three demos:

1. The `main` branch shows a customized task editor using built-in validation. 
2. The `react-hook-form` branch replaces the task editor with a custom [React Hook Form](https://react-hook-form.com/) task editor and shows how to add a Bryntum date widget with React Hook Form validation.
3. The `react-hook-form-zod` branch moves the validation rules into a [Zod](https://zod.dev/) schema.

## Install dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

## Run the development server

Run the Vite development server:

```bash
npm run dev
```

The server will start on `http://localhost:5173`.