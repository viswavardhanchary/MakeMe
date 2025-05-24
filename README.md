# MakeMe 🧠✅

MakeMe is an **advanced AI-powered to-do list web application** that helps users organize tasks and generate personalized roadmaps using a built-in AI assistant called **MyAi**, powered by **Google Gemini 1.5 Flash**.

🌐 **Live Demo**: [https://makeme-v60n.onrender.com](https://makeme-v60n.onrender.com)

---

## ✨ Features

- 📋 **Add tasks manually** using an intuitive interface.
- 📁 **Upload `.csv` files** to bulk-import your tasks.
- 🤖 **Generate your personalized roadmap** using MyAi, built with Google Gemini 1.5 Flash.
- 🗓️ **Organize tasks** by Pending, Ongoing, and Future sections.
- 💡 Simple and efficient user interface with no sign-up required.

---

## 🚀 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap
- React
- **Frontend Libraries**
    -react-toastify (for giving alerts)
    -react-router-dom (for routers)
    -react-textarea-autosize  (for custom text area)

### Backend
- Node.js
- Express
- **Backend Libraries**
    -multer (files reading)
    -cors (for the origin control)
    -fs (for the reading and writing the files)
    -path (for file's path)

### AI Integration
- Google Gemini API (Gemini 1.5 Flash)

---

## 🛠️ Installation & Local Setup

> Make sure you have **Node.js** and **npm** installed.


# 1. Clone the repository
```bash
git clone https://github.com/viswavardhanchary/MakeMe.git
```

# 2. Navigate to the project folder
```bash
cd MakeMe
``` 
Then
#(for Frontend) 2.i 
```bash
cd Frontend
npm install
npm run dev
```
#(for Backend)2.ii
```bash
cd Backedn
npm install
node --watch server.js
```
#(Make sure that both Frontend and Backend is running)

# 3. Set up Gemini API Key
**Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and generate your API key.**
 Add it in a `.env` file as:
 API_KEY=your_api_key_here

## 👤 Author

**Enjeti Viswa Vardhan Chary**
🔗 [GitHub Profile](https://github.com/viswavardhanchary)

## 📄 License

This project is open for learning and showcasing purposes. Please do not reuse without proper credit.

For any Queries , please Mail me at viswaMakeMe@gmail.com
