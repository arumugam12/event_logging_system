# Real-Time Event Logs Dashboard

This project provides a **real-time event logging system** for distributed applications. The dashboard allows users to monitor logs from various source applications, ensuring scalability, security, and tamper-proof logging.

## Features

- **Real-Time Updates**: WebSocket-based communication for instant log updates.
- **Cryptographic Integrity**: Logs are hashed using SHA-256 to maintain immutability.
- **Efficient Querying**: Pagination, filtering, and time-range queries.
- **Scalable Backend**: Built with Express.js and MongoDB.
- **Frontend Dashboard**: Display logs dynamically with a clean UI.

## Folder Structure

```
project/
├── public/
│   ├── styles/
│   │   └── styles.css
│   └── script/
│       └── script.js
├── routes/
│   └── eventRoutes.js
├── models/
│   └── eventModel.js
├── controller/
│   └── eventController.js
├── utils/
│   └── hashUtil.js
├── config/
│   └── db.js
├── app.js
├── README.md
└── package.json
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arumugam12/event_logging_system.git
   cd event-logs-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB:

   ```bash
   mongod
   ```

4. Start the application:

   ```bash
   node app.js
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### GET `/logs`

- **Description**: Retrieve logs with optional filters.
- **Parameters**:
  - `eventType`: Filter by event type.
  - `sourceAppId`: Filter by application ID.
  - `startTimestamp`, `endTimestamp`: Filter by time range.
  - `page`: Pagination (default `1`).
  - `limit`: Results per page (default `10`).

### POST `/logs`

- **Description**: Add a new log.
- **Body Parameters**:
  ```json
  {
    "eventType": "string",
    "sourceAppId": "string",
    "dataPayload": { "key": "value" }
  }
  ```

## WebSocket Events

- **`new_log`**: Broadcasts new logs to all connected clients.
