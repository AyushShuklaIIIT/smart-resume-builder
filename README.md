# Smart Resume Builder

<img width="1827" height="991" alt="Screenshot 2025-07-12 183758" src="https://github.com/user-attachments/assets/bbc4863f-f06b-44c2-81fe-d2b768473204" />

A modern, intuitive web application designed to help you create a professional-looking resume in minutes. Features a clean user interface, real-time preview, and AI-powered suggestions to make your resume stand out.

**Live Demo:** [**smart-resume-builder-tau.vercel.app**](https://smart-resume-builder-tau.vercel.app/)

---

## ✨ Features

- **📄 Real-Time Preview:** See your resume take shape as you type.
- **🤖 AI-Powered Suggestions:** Get help writing professional summaries and job responsibilities with built-in AI assistance.
- **📥 PDF Export:** Download a pixel-perfect, professional PDF of your resume, optimized for both desktop and mobile viewing.
- **🎨 Modern & Clean Templates:** A sleek and professional design that is easy to read and visually appealing.
- **🗂️ Comprehensive Sections:** Includes all essential resume sections: Personal Info, Summary, Experience, Education, Skills (by category), Projects, and Achievements.
- **📱 Fully Responsive:** Works beautifully on desktops, tablets, and mobile devices.
- **🚀 No Sign-Up Required:** Start building your resume immediately without needing to create an account.

---

## 🛠️ Tech Stack

This project is built with a modern MERN-like stack, separated into a frontend and a backend service.

#### **Frontend (This Repository)**
- **Framework:** [React](https://reactjs.org/) (with Vite)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** [Vercel](https://vercel.com/)

#### **Backend**
- **Repository:** [**github.com/AyushShuklaIIIT/smart-resume-backend**](https://github.com/AyushShuklaIIIT/smart-resume-backend)
- **Framework:** [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **PDF Generation:** [Puppeteer](https://pptr.dev/)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/gemini-api/docs)
- **Deployment:** [Render](https://render.com/)

---

## 🚀 Getting Started

To run this project locally, you will need to set up both the frontend and backend services.

### 1. Frontend Setup

First, clone this repository and install the dependencies.

```bash
# Clone the repository
git clone https://github.com/AyushShuklaIIIT/smart-resume-builder.git

# Navigate to the project directory
cd smart-resume-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will be running at `http://localhost:5173`.

### 2. Backend Setup

Next, clone the backend repository and follow its setup instructions.

```bash
# Clone the backend repository
git clone https://github.com/AyushShuklaIIIT/smart-resume-backend.git

# Navigate to the project directory
cd smart-resume-backend

# Install dependencies
npm install
```

#### Environment Variables

Create a `.env` file in the root of the backend project and add the following variables.

```env
# Server port
PORT=5000

# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/your-db-name

# The URL of the frontend client for CORS
CLIENT_URL=http://localhost:5173

# Your Gemini API Key for AI suggestions
GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Finally, start the backend server:

```bash
# Start the server
npm start
```

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to open an issue or submit a pull request.

1.  **Fork** the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

---
