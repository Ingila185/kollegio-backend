# Kollegio Assessment Backend

A simple Node.js backend using Express and MongoDB to fetch user data from an external API, log each request to a database, and provide endpoints to retrieve both user data and request logs.

## Features

- Fetches users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users)
- Logs each `/users` request (success or failure) to MongoDB
- Provides an endpoint to retrieve all request logs
- Simple middleware-based architecture

## Requirements

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally on default port)

## Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/Ingila185/kollegio-backend.git

   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start MongoDB**

   Make sure MongoDB is running locally on `mongodb://localhost:27017`.

4. **Run the server**

   ```sh
   node server.js
   ```

   The server will start at [http://127.0.0.1:3000](http://127.0.0.1:3000).

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

## Project Structure

```
.
├── server.js
├── package.json
└── README.md
```

## Notes

- The MongoDB database will be created automatically after the first log is inserted.
- Make sure to refresh MongoDB Compass after making a request to see the new database and collections.

## License

MIT
