# Health Information System

This project is a basic health information system developed as part of a Software Engineering Intern Task. It allows a doctor (system user) to manage clients and enroll them in various health programs. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this application provides a user-friendly interface and a RESTful API for accessing client data.

## Features

- **Create Health Programs:** Easily add new health programs (e.g., TB, Malaria, HIV) to the system.
- **Register New Clients:** Securely register new clients with their relevant information.
- **Enroll Clients in Programs:** Enroll existing clients in one or more available health programs.
- **Search for Clients:** Quickly find clients from the registered list using various search criteria.
- **View Client Profile:** Access a detailed profile for each client, including their enrolled programs.
- **Client Profile API:** Exposes client profile data through a RESTful API endpoint for integration with other systems.
- **Responsive Design:** The application is designed to be responsive and user-friendly on both desktop and mobile devices.
- **Secure Authentication:** Implemented secure authentication for system users to protect sensitive client data.
- **Data Validation:** Ensures that all client data is validated before being stored in the database.
- **Error Handling:** Comprehensive error handling to manage exceptions and provide meaningful feedback to users.

## Technologies Used

- **Frontend:**

  - React.js
  - Complemenrtary Libraries:
    - Tailwind CSS
    - Axios
    - Shadcn UI
    - React Router
    - React Hook Form
    - Zod
  
- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Others:
    - JWT for authentication
    - Joi for validation
    - bcrypt for password hashing
    - dotenv for environment variables
    - cors for Cross-Origin Resource Sharing

- **Development Tools:**
  - Postman for API testing
  - Git for version control
  - Visual Studio Code as the IDE.
  - **Additional Tools:**:
    - ESLint for code linting
    - Prettier for code formatting

**For more information on either the frontend or backend, please refer to the respective directories in the project**:

- Client: [README](https://github.com/enkiga/CEMA-HIS/tree/main/client)
- Server: [README](https://github.com/enkiga/CEMA-HIS/tree/main/server)

## Installation

1. Clone the repository:

   ```bash
   git clone `https://github.com/enkiga/CEMA-HIS.git`
   ```

2. Navigate to the project directory:

   ```bash
   cd CEMA-HIS
   ```

3. Install the dependencies for both the frontend and backend:

   ```bash
   npm install --legacy-peer-deps
   ```

4. Set up environment variables:

   - Create a `.env` file in the server directory and add the following variables:
   - Ensure to include the following variables in your `.env` file:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```

   - create a `.env` file in the client directory and add the following variables:
   - Ensure to include the following variables in your `.env` file:

   ```env
    VITE_API_URL=http://localhost:3000/api
   ```

5. Run the application:

   ```bash
   npm run dev
   ```

   - The server will run on `http://localhost:3000` or `http://localhost:8000` and the client will run on `http://localhost:5173`.
   - If your server runs on port 8000, you have to change the port in the client `.env` file. Given port 8000 is the fallback port for the server.

6. Apllication Snippet:

![Snippet](/Snippet.mp4)
