# Express + TypeScript Backend

This is a backend project built with Express, TypeScript, and Mongoose (MongoDB).

## Features
- REST API with Express
- TypeScript for type safety
- MongoDB with Mongoose ODM
- Nodemon for development

## Project Structure
```
backend/
  src/
    controllers/
    models/
    routes/
    app.ts
    server.ts
  package.json
  tsconfig.json
```

## User Model Example
The user model is defined in `src/models/model.ts`:
```ts
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Development
Start the server with hot-reloading:
```bash
npm run dev
```

### 3. Production
Start the server:
```bash
npm start
```

## Environment Variables
Create a `.env` file in the backend directory with your MongoDB URI and other secrets:
```
MONGODB_URI=your_mongodb_uri
PORT=5000
```

## Linting & Formatting
- Run ESLint: `npx eslint src/`
- Run Prettier: `npx prettier --write src/`

---
Feel free to extend this README as your project grows!
