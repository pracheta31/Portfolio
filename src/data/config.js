export const siteConfig = {
  owner: {
    name: "Patel Pracheta",
    bio: "3rd year CE student at MBIT, Ahmedabad. I'm learning the MERN stack and exploring ML with Python on the side. I've built a freelancing platform and a Power BI dashboard during an AICTE internship. Done a couple of internships too. Still figuring things out, but I like building stuff that actually works.",
    email: "pracheta302@gmail.com",
    resumeUrl: "/resume.pdf",
  },

  hero: {
    titles: ["MERN Developer", "ML Learner", "Data Analyst", "CE Student"],
    tagline: "I'm a student who builds web apps and experiments with ML. Not an expert yet — just someone who likes making things.",
  },

  about: {
    highlights: [
      { label: "Projects", value: "2" },
      { label: "Internships", value: "3" },
      { label: "Certifications", value: "2" },
    ],
  },

  skills: [
    { name: "HTML/CSS", icon: "🌐", group: "Frontend" },
    { name: "JavaScript", icon: "🟨", group: "Frontend" },
    { name: "React", icon: "⚛️", group: "Frontend" },
    { name: "Node.js", icon: "🟢", group: "Backend" },
    { name: "Express", icon: "🚂", group: "Backend" },
    { name: "MongoDB", icon: "🍃", group: "Backend" },
    { name: "Python", icon: "🐍", group: "ML & Data" },
    { name: "ML Basics", icon: "🤖", group: "ML & Data" },
    { name: "Tableau", icon: "📊", group: "ML & Data" },
    { name: "Power BI", icon: "📈", group: "ML & Data" },
    { name: "Git", icon: "🌿", group: "Tools" },
    { name: "C/C++", icon: "⚙️", group: "Tools" },
  ],

  projects: [
    {
      title: "FreelanceHub",
      description:
        "A freelancing platform where clients can post jobs and freelancers can apply with proposals. Has role-based login, a contract system with milestones, and dashboards for both sides. Built it solo as a learning project.",
      contribution: "Did everything myself — frontend, backend, database, and auth. Took a while but learned a lot.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/pracheta31/Freelance",
      live: null,
      featured: true,
    },
    {
      title: "SatConnect Intelligence Platform",
      description:
        "A 5-page Power BI dashboard I made for the Microsoft Elevate AICTE Internship 2026. It looks at global satellite internet coverage — comparing Starlink, OneWeb, and ISRO. Found that global coverage went from 8.88% in 2000 to 38.68% in 2023.",
      contribution: "Used 24+ Power BI features — ArcGIS maps, forecasting, drill-through, What-If parameters. Data came from World Bank, TRAI, and ITU.",
      tags: ["Power BI", "Data Analytics", "ArcGIS", "Excel"],
      github: "https://github.com/pracheta31/SatConnect-Intelligence-Platform",
      live: null,
      featured: true,
    },
  ],

  contact: {
    emailjsConfig: {
      serviceId: "service_gzs0vgw",
      templateId: "template_dthgy2i",
      publicKey: "ADBkATpdx2a5FD7iN",
    },
  },

  social: [
    { platform: "github", url: "https://github.com/pracheta31" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/pracheta-patel-1b7101376" },
    { platform: "email", url: "mailto:pracheta302@gmail.com" },
  ],
};
