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

1. Application Snippet:

![Snippet](/snippet.gif)
