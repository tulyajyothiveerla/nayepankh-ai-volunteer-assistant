#nayepankh-ai-assistant-phi.vercel.app - DEPLOYMENT LINK 
# NayePankh AI Volunteer Assistant

A full-stack web application built to streamline volunteer onboarding and provide an intelligent, automated assistant for the NayePankh Foundation.

## 🚀 Features

- **Intelligent AI Assistant:** Integrated with the Gemini API to act as an official NGO representative, answering questions about programs, volunteering, and the foundation with concise, professional responses.
- **Volunteer Registration:** A seamless form for users to register their details, skills, and availability.
- **Admin Dashboard:** Interface to view and manage registered volunteers.
- **Full-Stack Architecture:** Clean separation of concerns between a React frontend, Node.js backend, and a PostgreSQL database.
- **Production Ready:** Configured with strict CORS policies, robust error handling, and secure environment variable management.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Axios
- Vanilla CSS

**Backend:**
- Node.js
- Express.js
- PostgreSQL (pg)
- Google Gemini API (`@google/generative-ai`)
- CORS & dotenv

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (running locally or a cloud database URL)
- A [Google Gemini API Key](https://aistudio.google.com/)

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nayepankh-ai-assistant.git
   cd nayepankh-ai-assistant
   ```

2. **Database Setup:**
   - Open PostgreSQL and create a database named `nayepankh_ai`.
   - Create the necessary tables (e.g., `volunteers` with columns for `name`, `email`, `phone`, `skills`, `interests`, and `availability`).

3. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=nayepankh_ai
   GEMINI_API_KEY=your_gemini_api_key_here
   FRONTEND_URL=http://localhost:5173
   ```
   Start the backend development server:
   ```bash
   npm run dev
   ```

4. **Frontend Setup:**
   Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd client
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

5. **View the Application:**
   Open your browser and navigate to `http://localhost:5173`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
