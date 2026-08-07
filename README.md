# 🏕️ Wander-Lust: A Full-Stack Airbnb Clone

A feature-rich, full-stack web application inspired by Airbnb. This project allows users to discover, list, and review unique places to stay. It is built from the ground up using Node.js, Express.js, EJS, and MongoDB, following the MVC (Model-View-Controller) architecture.

**Live Demo:** [https://delta-project-u59h.onrender.com/listings]

---

| Homepage | Listing Details | Map View |
| :---: | :---: | :---: |
|  |  |  |

---

## 🚀 Key Features

* **User Authentication:** Secure user sign-up, login, and logout functionality.
* **Full CRUD Functionality:** Users can **C**reate, **R**ead, **U**pdate, and **D**elete their own listings.
* **Interactive Maps:** Utilizes the Mapbox API to display listing locations on an interactive map.
* **Reviews & Ratings:** Logged-in users can leave reviews and star ratings for listings.
* **Server-Side Validation:** Implements robust server-side schema validation (using Joi) to ensure data integrity before it reaches the database.
* **Responsive Design:** A clean and modern UI that is responsive across different devices.

---

## 🛠️ Tech Stack

### Backend
* **Node.js:** JavaScript runtime environment
* **Express.js:** Web application framework for Node.js
* **MongoDB:** NoSQL database
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB
* **Passport.js:** Authentication middleware for Node.js (for local-strategy)
* **Joi:** Schema validation for server-side data

### Frontend
* **EJS (Embedded JavaScript):** Templating engine to generate HTML
* **Bootstrap:** CSS framework for styling and responsive design
* **Mapbox GL JS:** API for displaying interactive maps

### Other
* **MVC (Model-View-Controller):** Architectural pattern
* **RESTful APIs:** Used for handling all backend logic and data.
* **Cloudinary:** (Add this if you used it) For cloud-based image storage.

---

## 🔧 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or higher)
* MongoDB (local instance or a cloud-based cluster from MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [Link to your GitHub Repo]
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd wander-lust-project
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the following variables. *These are essential for the app to run.*

    ```env
    MONGO_URL=[Your MongoDB Connection String]
    MAPBOX_API_KEY=[Your Mapbox API Key]
    SESSION_SECRET=[A random, long string for session security]
    ```

5.  **Run the application:**
    ```sh
    npm start
    ```
    The server will start (usually on `http://localhost:8080`).

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 👨‍💻 Author

Connect with me on LinkedIn!

* **[Aditya Yadav]** - [https://www.linkedin.com/in/aditya-yadav-786821346?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BRu32QBJERa6M4KipCCapew%3D%3D]
