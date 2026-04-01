# NodeJS Product API

A robust RESTful API built with Node.js, Express, and PostgreSQL (via Sequelize) for managing products and users. This project serves as a comprehensive backend for an e-commerce or product catalog system, complete with authentication, file uploads, bulk CSV processing, and automated background tasks.

## 🚀 Features

*   **User Authentication & Authorization**: Secure signup and login using JWT (JSON Web Tokens) and bcrypt for password hashing. Role-based access control.
*   **Product Management**: Full CRUD (Create, Read, Update, Delete) operations for products. Features include pagination, filtering, and sorting.
*   **File Uploads**: Handles single and multiple image uploads for products using `multer`.
*   **Bulk CSV Operations**:
    *   **Upload**: Import multiple products at once via a CSV file.
    *   **Export**: Download the entire product catalog as a CSV file.
*   **Background Jobs**: Automated task scheduling using `node-cron`.
*   **Activity Logging**: Integrated logging system using `winston` for easier debugging and monitoring.
*   **Database ORM**: Uses Sequelize to manage database schemas and relationships in PostgreSQL.

## 🛠️ Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: PostgreSQL
*   **ORM**: Sequelize
*   **Authentication**: `jsonwebtoken`, `bcryptjs`
*   **File Handling**: `multer`, `csv-parser`, `json2csv`
*   **Logging**: `winston`
*   **Scheduling**: `node-cron`
*   **Development**: `nodemon`, `dotenv`

## ⚙️ Getting Started

### Prerequisites

*   Node.js installed on your machine.
*   PostgreSQL installed and running.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repo-url>
    cd nodejs_productAPI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables setup:**
    Create a `.env` file in the root directory and add your configuration details. You will likely need:
    ```env
    PORT=3000
    # Database connection strings/variables
    DB_HOST=localhost
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_NAME=productapi_db
    DB_DIALECT=postgres
    # JWT Secret
    JWT_SECRET=your_super_secret_key
    ```
    *(Note: Adjust the database variables based on how your `config/config.json` or `config/database.js` is set up)*

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server should now be running on `http://localhost:3000` (or the port defined in your `.env`). Sequelize will automatically sync the database models.

## 📁 Project Structure

*   **/config**: Database and environment configurations.
*   **/controllers**: Business logic and request handlers for the routes.
*   **/middleware**: Custom middleware functions (e.g., authentication checks, file upload configurations).
*   **/models**: Sequelize models defining the database schema (User, Product).
*   **/routes**: API endpoint definitions.
*   **/utils**: Utility functions like the system logger and cron job scheduler.
*   **/uploads**: Directory where uploaded product images are stored.
*   **app.js**: The main entry point of the application.

## 📄 License

This project is licensed under the ISC License.
