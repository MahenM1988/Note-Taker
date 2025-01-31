# MERN Stack Notes Management App

This is a complete **MERN stack** project designed to manage notes with real-time updates. For testing purposes, an "Admin" user is provided with the hashed password "123." Notes are stored in a **MongoDB** database, where they can be created, edited, or deleted. Each note action includes the public IP address, retrieved via an API call to **Ipyfi**, as an added security measure. This helps maintain a clean and safe testing environment, preventing the creation of inappropriate or offensive content by unauthorized users.

## Key Technologies

- **Passport.js** with a `LocalStrategy` is used for authentication. This setup can easily be extended to support **OAuth**, the industry-standard for authentication, or even **social media logins**.
- User sessions are managed using a **session secret**, while **Bcrypt** is employed for secure password hashing.
- **CORS** is implemented to ensure secure cross-origin resource sharing.

## Project Structure

As a MERN stack project:
- **Express.js** serves as the backend framework that connects the **Node.js** server with the **React.js** frontend.
- **Mongoose** acts as the high-level interface between the server and **MongoDB**.
