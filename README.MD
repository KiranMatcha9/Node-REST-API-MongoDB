# Project Setup

In order to spin up the project, in the root create .env with DATABASE_URL variable, with your own MongoDB connection url.

After that run this command

```bash
npm install && npm start
```

# Routes

POST - localhost:3000/subscribers/
GET  - localhost:3000/subscribers/
GET  - localhost:3000/subscribers/:id/
PATCH - localhost:3000/subscribers/:id/
DELETE - localhost:3000/subscribers/:id/
