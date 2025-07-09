# To-Do List Manager

A full-featured To-Do List web application built with Node.js, Express, MongoDB, and EJS. This project allows users to sign up, log in, create, update, and delete their to-do tasks. It also includes advanced features like automatic deletion of expired tasks and email notifications for tasks expiring soon.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Views](#views)
- [Middlewares](#middlewares)
- [How It Works](#how-it-works)
- [Setup & Installation](#setup--installation)

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **View Engine:** EJS
- **Authentication:** JWT (JSON Web Token)
- **Email Service:** Nodemailer (Gmail)
- **Task Scheduling:** node-cron

---

## Features

- **User Authentication:** Secure signup and login using JWT and bcrypt password hashing.
- **Task Management:** Create, update, view, and delete to-do tasks.
- **Auto Deletion:** Expired tasks are automatically deleted for each user upon login.
- **Email Notification:** Users receive an email notification 24 hours before a task expires.
- **Responsive UI:** Clean and responsive EJS-based frontend.
- **RESTful API:** Well-structured API endpoints for all core operations.

---


## API Endpoints

### User Authentication

- **POST `/api/signup`**  
  Registers a new user.  
  **Body:** `{ UserName, Email, Password }`  
  **Returns:** Renders login page on success, or signup page with error message.

- **POST `/api/login`**  
  Authenticates a user and returns a JWT token.  
  **Body:** `{ Email, Password }`  
  **Returns:** Renders login page with token on success, or error message.

---

### To-Do List Management

- **POST `/api/inserttask/list`**  
  Creates a new to-do task for the authenticated user.  
  **Headers:** `Authorization: Bearer <token>`  
  **Body:** `{ title, description, endDate }`  
  **Returns:** JSON message.

- **GET `/login/to/display/:token`**  
  Displays all to-do tasks for the authenticated user.  
  **Params:** `token` (JWT)  
  **Returns:** Renders the home page with the user's tasks.

- **DELETE `/api/delete/:id`**  
  Deletes a specific to-do task by its ID.  
  **Headers:** `Authorization: Bearer <token>`  
  **Params:** `id` (Task ID)  
  **Returns:** JSON message.

- **PATCH `/api/todo/update`**  
  Updates an existing to-do task by its title.  
  **Headers:** `Authorization: Bearer <token>`  
  **Body:** `{ Etitle, title?, description?, endDate? }`  
  **Returns:** JSON message.

---

## Views

- **/signup** — Signup page for new users.
- **/login** — Login page for existing users.
- **/home** — Home page displaying all to-do tasks.
- **/forms** — Page for creating and updating tasks.

---

## Middlewares

- **isLogedIn**  
  Checks for a valid JWT token in the request headers or params.

- **AutoDelete**  
  Automatically deletes expired tasks for the logged-in user on each login.

- **ScheduleEmail**  
  Uses `node-cron` to check every minute for tasks expiring in 24 hours and sends notification emails.

- **SendEmail**  
  Handles sending email notifications using Nodemailer.

---

## How It Works

- **User Flow:**  
  Users sign up and log in. After login, they can create, update, and delete their to-do tasks. The UI is rendered using EJS templates.

- **Auto Deletion:**  
  When a user logs in, the `AutoDelete` middleware removes all tasks that have expired (i.e., end date is before today).

- **Email Notification:**  
  Every minute, the `ScheduleEmail` middleware checks for tasks expiring in the next 24 hours and sends an email notification to the respective users.

