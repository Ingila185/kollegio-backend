# Kollegio Assessment Backend

A modular Node.js backend using Express and MongoDB to fetch user data from an external API, log each request to a database, and provide endpoints to retrieve both user data and request logs.

## Features

- Fetches users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- Logs each `/users` request (success or failure) to MongoDB
- Provides an endpoint to retrieve all request logs
- Organized using Express routers and middleware for scalability

## Requirements

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or via Atlas)

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/Ingila185/kollegio-backend.git

   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```
   MONGODB_URI=mongodb://localhost:27017/kollegio
   PORT=3001
   HOSTNAME=127.0.0.1
   USERS_LIST=https://jsonplaceholder.typicode.com/users
   ```

4. **Start MongoDB**

   Make sure MongoDB is running locally or update `MONGODB_URI` for Atlas.

5. **Run the server**

   ```sh
   node server.js
   ```

   The server will start at [http://127.0.0.1:3001](http://127.0.0.1:3001).

## Project Structure

```
BE/
├── config/
│   └── db.js
├── middleware/
│   ├── auth.js
│   └── fetchUsers.js
├── models/
│   └── RequestLog.js
├── routes/
│   ├── users.js
│   └── logs.js
├── server.js
├── package.json
└── .env
```

## API Endpoints

### `GET /users`

Fetches users from the external API and logs the request to MongoDB.

**Response:**

```json
{
  "message": "User data fetched successfully via middleware!",
  "users": [ ... ]
}
```

### `GET /logs`

Returns all request logs stored in MongoDB, sorted by newest first.

**Response:**

```json
{
  "logs": [
    {
      "_id": "...",
      "timestamp": "...",
      "url": "...",
      "method": "...",
      "success": true,
      "error": null,
      "__v": 0
    },
    ...
  ]
}
```

## Notes

- The MongoDB database and collections are created automatically after the first log is inserted.
- All route and middleware logic is modularized for maintainability.
- You can add authentication or other middleware by editing files in the `middleware/` folder.

## License

MIT
