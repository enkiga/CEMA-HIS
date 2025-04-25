# Server - Health Information System

The server is the backend component of the Health Information System. It provides a RESTful API for managing doctors, clients, and health programs. The server is built using Node.js, Express.js, and MongoDB.

## Features

- **Authentication**: Doctors can sign up, sign in, and sign out.
- **Client Management**: Add, view, update, and delete clients.
- **Program Management**: Create, view, and delete health programs.
- **Enrollment**: Enroll and unenroll clients in health programs.
- **Middleware**: Includes validation and authentication middleware for secure and reliable API operations.

---

## API Endpoints

### Authentication (`/api/v1/auth`)

- **POST /signup**: Register a new doctor.
- **POST /signin**: Log in an existing doctor.
- **POST /signout**: Log out the authenticated doctor.

### Client Management (`/api/v1/client`)

- **POST /add-client**: Add a new client (requires authentication).
- **GET /all-clients**: Retrieve all clients.
- **GET /:id**: Retrieve a specific client by ID.
- **PATCH /:id/enroll**: Enroll a client in a program (requires authentication).
- **PATCH /:id/unenroll**: Unenroll a client from a program (requires authentication).
- **DELETE /:id**: Delete a client (requires authentication).

### Program Management (`/api/v1/program`)

- **POST /create-program**: Create a new health program (requires authentication).
- **GET /all-programs**: Retrieve all health programs.
- **DELETE /:id**: Delete a program by ID (requires authentication).

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or accessible via a connection string)

### Steps to Set Up the Server

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/enkiga/CEMA-HIS.git
   cd CEMA-HIS/server
   ```

2. **Install Dependencies:**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**:

   - Create a .env file in the server directory.
   - Use the .env_example file as a reference:

   ```env
   PORT_URL=8000
   MONGODB_URL=<your_mongodb_connection_string>
   TOKEN_SECRET=<your_secret_key>
   ```

4. **Start the Server**:

   ```bash
   npm run dev
   ```

5. **Access the API**:

   - The server will run on `http://localhost:8000 (or the port specified in PORT_URL).`
   - Use tools like Postman or cURL to interact with the API.

### Middleware

#### Identifier Middleware

- Ensures that only authenticated users can access protected routes.
- Validates JWT tokens from headers or cookies.

#### Validator Middleware

- Validates request payloads using Joi schemas for:
- Doctor registration and login.
- Client creation.
- Program creation.

### Models

1. **Doctor**
   Represents a doctor (system user) with fields for name, email, and password.

2. **Client**
   Represents a client with fields for name, email, and programEnrolled.

3. **Program**
   Represents a health program with fields for name, description, and clientsEnrolled.

### Dependencies

- bcryptjs: For password hashing.
- cookie-parser: For parsing cookies.
- cors: For handling cross-origin requests.
- dotenv: For environment variable management.
- express: For building the RESTful API.
- joi: For request validation.
- jsonwebtoken: For authentication using JWT.
- mongoose: For MongoDB object modeling.

### Development Tools

- nodemon: For automatic server restarts during development.
- eslint and prettier: For code linting and formatting.

### License

This project is licensed under the ISC License. ```
