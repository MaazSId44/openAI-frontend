# 🧠 MERN AI Prompt & Item Manager – Frontend

This is the **frontend** portion of a full-stack MERN (MongoDB, Express, React, Node.js) application. It integrates OpenAI for generating responses to user prompts and provides an interface to manage a collection of items.

---

## 🚀 Features

### 📋 Item Management
- Add new items with `name` and `description`
- Display all items in a list or card layout
- Delete items from the list

### 🤖 OpenAI Integration
- Send text prompts to the backend `/generate` endpoint
- Display AI-generated responses
- Save prompt history locally with ability to clear it
- Copy response to clipboard feature

### 🔀 Routing (React Router)
- `/items` – Item Management page
- `/prompt` – AI Prompt page

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|--------|
| React | UI Library |
| Redux + Redux Toolkit | State Management |
| React Router | Routing |
| Axios | HTTP Requests |
| Tailwind CSS | Styling |
| React Markdown | Render Markdown AI responses |
| Lucide-react | Icon library |
| React Spinners | Loading indicators |

---

## 📂 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── features/
│   │   └── openai/
│   │       ├── openaiSlice.js
│   │       └── ...
│   ├── pages/
│   │   ├── ItemManager.jsx
│   │   └── OpenAIPrompt.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── store.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🧪 How to Run Frontend Locally

### 1. Clone the Repository

```bash
git clone https://github.com/MaazSId44/openAI-frontend.git
cd mern-openai-app/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Environment Variables

Create a `.env` file if needed:

## 🧑‍💻 Author

**Submitted By:** Muhammad Maaz
**Duration:** Completed within 24 hours

---

## 📄 License

This project is licensed under the MIT License.
