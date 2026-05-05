# 🎨 Pracheta's Portfolio - AI-Powered

A modern, responsive portfolio website with an AI chat assistant built using React, Vite, Tailwind CSS, Framer Motion, and Google's Gemini AI.

![Portfolio Preview](https://img.shields.io/badge/React-19.2.4-blue) ![Vite](https://img.shields.io/badge/Vite-8.0.4-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4.2.2-cyan) ![AI](https://img.shields.io/badge/AI-Gemini-orange)

---

## ✨ Features

- 🎯 **AI Chat Assistant** - Powered by Google Gemini 1.5 Pro
- 🎨 **Beautiful Animations** - Smooth transitions with Framer Motion
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🌙 **Dark Theme** - Modern indigo/purple color scheme
- 📧 **Contact Form** - Integrated with EmailJS
- 📄 **Downloadable Resume** - One-click download
- 🚀 **Fast Performance** - Built with Vite for lightning-fast dev and build
- ♿ **Accessible** - WCAG compliant design

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Gemini API Key
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in and create an API key
3. Copy the key

### 3. Configure Environment
Create/edit `.env` file:
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Test AI Chat
- Open http://localhost:5173
- Click chat button (bottom right)
- Ask: "What projects has she built?"

**📖 For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)**

---

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── AiChat.jsx       # AI chat assistant
│   │   ├── Navbar.jsx       # Navigation
│   │   ├── Hero.jsx         # Hero section with split-flap animation
│   │   ├── About.jsx        # About section
│   │   ├── Skills.jsx       # Skills showcase
│   │   ├── Education.jsx    # Education timeline
│   │   ├── Projects.jsx     # Project cards
│   │   ├── Contact.jsx      # Contact form
│   │   └── Footer.jsx       # Footer
│   ├── data/
│   │   └── config.js        # Site configuration
│   ├── App.jsx              # Main app
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env                     # Environment variables (not in Git)
├── .env.example             # Example env file
└── package.json             # Dependencies
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **Vite 8.0.4** - Build tool
- **Tailwind CSS 4.2.2** - Styling
- **Framer Motion 12.38.0** - Animations

### AI & APIs
- **Google Generative AI 0.24.1** - Gemini AI integration
- **EmailJS** - Contact form handling

### UI Components
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Typed.js** - Typing animations

---

## 🎨 Customization

### Update Portfolio Content
Edit `src/data/config.js`:
```javascript
export const siteConfig = {
  owner: {
    name: "Your Name",
    bio: "Your bio...",
    email: "your@email.com",
    resumeUrl: "/resume.pdf",
  },
  // ... more configuration
};
```

### Update AI Context
Edit `SYSTEM_CONTEXT` in `src/components/AiChat.jsx` to change what the AI knows about you.

### Styling
- Tailwind classes in components
- Global styles in `src/index.css`
- Theme colors in Tailwind config

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add `VITE_GEMINI_API_KEY` environment variable
4. Deploy!

### Netlify
1. Push to GitHub
2. Import in Netlify
3. Build: `npm run build`
4. Publish: `dist`
5. Add `VITE_GEMINI_API_KEY` environment variable
6. Deploy!

**📖 For detailed deployment guide, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 🐛 Troubleshooting

### AI Chat Not Working?

**"API key not configured"**
- Check `.env` file exists
- Verify variable name: `VITE_GEMINI_API_KEY`
- Restart dev server

**"Invalid API key"**
- Copy entire key from Google AI Studio
- No extra spaces
- Generate new key if needed

**"Model not found"**
- API key might not have access
- Try generating new key
- Check you're using personal Google account

**📖 For more troubleshooting, see [QUICK_START.md](./QUICK_START.md)**

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get running in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Comprehensive setup guide
- **[AI_CHAT_SETUP.md](./AI_CHAT_SETUP.md)** - AI chat configuration
- **[FIXES_APPLIED.md](./FIXES_APPLIED.md)** - Recent fixes and changes

---

## 🔒 Security

- ✅ API keys in environment variables
- ✅ `.env` file in `.gitignore`
- ✅ No sensitive data in code
- ✅ Rate limiting on API calls
- ✅ Input validation

---

## 📊 Performance

- ⚡ Vite for fast builds
- ⚡ Code splitting
- ⚡ Lazy loading
- ⚡ Optimized animations
- ⚡ Minimal bundle size

---

## 🎯 Features Breakdown

### AI Chat Assistant
- Powered by Gemini 1.5 Pro
- Context-aware responses
- Quick question chips
- Loading states
- Error handling
- Mobile-friendly

### Hero Section
- Split-flap departure board animation
- Animated name reveal
- Role cycling
- Mouse spotlight effect
- Smooth scroll indicator

### Projects Section
- Featured projects
- GitHub links
- Tech stack tags
- Hover effects
- Responsive cards

### Contact Form
- EmailJS integration
- Form validation
- Success/error toasts
- Accessible inputs

---

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs
- Suggest features
- Fork and customize for your own use

---

## 📝 License

This project is open source and available for personal use.

---

## 👤 Author

**Patel Pracheta**
- Email: pracheta302@gmail.com
- GitHub: [@pracheta31](https://github.com/pracheta31)
- LinkedIn: [Pracheta Patel](https://www.linkedin.com/in/pracheta-patel-1b7101376)

---

## 🙏 Acknowledgments

- Google Gemini AI for the chat assistant
- Framer Motion for smooth animations
- Tailwind CSS for styling
- Lucide for beautiful icons
- EmailJS for contact form handling

---

## 📞 Support

Need help? Check these resources:
1. [QUICK_START.md](./QUICK_START.md) - Quick setup guide
2. [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Detailed documentation
3. Browser console (F12) for error messages
4. [Google AI Studio](https://aistudio.google.com) for API key issues

---

**Made with ❤️ and AI**

⭐ Star this repo if you found it helpful!
