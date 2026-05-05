# 🚀 Patel Pracheta - Portfolio Website

A modern, responsive portfolio website built with React, featuring an AI-powered chat assistant and real-time visitor tracking.

## 🌐 Live Demo

**[View Live Portfolio](https://your-portfolio-url.vercel.app)** *(Update after deployment)*

## ✨ Features

- **🎨 Modern UI/UX** - Clean, professional design with smooth animations
- **🤖 AI Chat Assistant** - Integrated Groq AI for interactive conversations about my work
- **📊 Visitor Tracking** - Real-time visitor counter with MongoDB
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop
- **📧 Contact Form** - EmailJS integration for direct communication
- **📄 Downloadable Resume** - One-click resume download
- **⚡ Fast Performance** - Built with Vite for lightning-fast load times

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend & APIs
- **Groq AI** - AI chat assistant (Llama 3.3 70B)
- **MongoDB Atlas** - Visitor tracking database
- **EmailJS** - Contact form functionality
- **Vercel Serverless Functions** - API endpoints

## 📂 Project Structure

```
my-portfolio/
├── api/                    # Vercel serverless functions
│   ├── _db.js             # MongoDB connection
│   ├── visit.js           # Increment visitor count
│   └── visits.js          # Get visitor count
├── public/                # Static assets
│   ├── favicon.svg        # Site favicon
│   └── resume.pdf         # Downloadable resume
├── src/
│   ├── components/        # React components
│   │   ├── About.jsx
│   │   ├── AiChat.jsx     # AI chat assistant
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── data/
│   │   └── config.js      # Site configuration
│   ├── App.jsx
│   └── main.jsx
├── .env                   # Environment variables
├── vercel.json           # Vercel configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pracheta31/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🌍 Deployment

This project is configured for deployment on **Vercel**.

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables:
   - `MONGO_URI`
   - `VITE_GROQ_API_KEY`
4. Deploy!

## 📧 Contact

- **Email**: pracheta302@gmail.com
- **LinkedIn**: [pracheta-patel](https://www.linkedin.com/in/pracheta-patel-1b7101376)
- **GitHub**: [pracheta31](https://github.com/pracheta31)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built as part of MBIT Training & Placement Cell initiative
- AI powered by Groq (Llama 3.3 70B)
- Icons by Lucide
- Animations by Framer Motion

---

**Made with ❤️ by Patel Pracheta**
