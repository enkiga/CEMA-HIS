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
- **GET /doctor**: Retrieve the authenticated doctor's information.
- **GET /all-doctors**: Retrieve all doctors

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
- Postman or cURL for API testing

1. **Testing the API's**:

   - Use tools like Postman or cURL to interact with the API.
   - For API routes with authentication, include the JWT token in the headers as `Authorization: Bearer <token>` and `client: not-browser`, when using Postman.
   - To get the token, first sign up a doctor and then sign in to get the token.
   - Use the token for all routes that require authentication.
   - For routes that require an ID, replace `:id` in the URL with the actual ID.

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
