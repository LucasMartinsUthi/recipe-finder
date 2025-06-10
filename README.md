### Libraries and Tooling

#### Backend

- Node.js
- Express

#### Frontend

- React
- Next.js
- Tailwind CSS

#### Database

- MongoDB

---

# Project Setup Guide

Follow these steps to set up the MongoDB database, run the Node.js server, and start the React application.

## MongoDB

To replicate the data, import the provided JSON file into your MongoDB instance.
The data for the `recipes` collection is located in the `defense-db.recipes.json` file.

You can import it using the following command:

```bash
mongoimport --db defense-db --collection recipes --file defense-db.recipes.json --jsonArray
```

### Node.js Server

To run the backend server:

```shell
cd server
npm install
npm run dev
```

This will start the Node.js server in development mode. Available at `http://localhost:5000`

### React App

To run the frontend React application:

```shell
cd app
npm install
npm run dev
```

This will start the React App in development mode. Available at `http://localhost:3000`
