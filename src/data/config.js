export const siteConfig = {
  owner: {
    name: "Patel Pracheta",
    bio: "I'm a Computer Engineering student focused on building full-stack web applications using the MERN stack. I've developed real-world projects like a freelancing platform with role-based authentication and a Power BI dashboard during my internship. I enjoy turning ideas into working products and continuously improving my skills in web development and AI.",
    email: "pracheta302@gmail.com",
    resumeUrl: "/resume.pdf",
  },

  hero: {
    titles: ["Full-Stack Developer", "MERN Stack Developer", "Problem Solver", "Product Builder"],
    tagline: "Full-stack developer specializing in MERN stack. Exploring machine learning and cybersecurity. Passionate about creating solutions that matter.",
  },

  about: {
    highlights: [
      { label: "Projects", value: "2" },
      { label: "Internships", value: "3" },
      { label: "Certifications", value: "2" },
    ],
  },

  skills: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", group: "Core Skills" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", group: "Core Skills" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", group: "Core Skills" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", group: "Core Skills" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", group: "Core Skills" },
    { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", group: "Core Skills" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", group: "Working Knowledge" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", group: "Working Knowledge" },
    { name: "Power BI", icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", group: "Working Knowledge" },
    { name: "C/C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", group: "Familiar With" },
    { name: "Tableau", icon: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg", group: "Familiar With" },
    { name: "ML Basics", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", group: "Familiar With" },
  ],

  projects: [
    {
      title: "FreelanceHub",
      description:
        "A production-ready freelancing platform connecting clients with freelancers. Features role-based authentication, real-time contract management, milestone tracking, and secure payment workflows. Built with scalability and user experience in mind.",
      contribution: "Architected and developed the entire platform solo — from database design to deployment. Implemented JWT authentication, RESTful APIs, and responsive UI.",
      tags: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      github: "https://github.com/pracheta31/Freelance",
      live: null,
      featured: true,
      metrics: {
        users: "50+",
        performance: "Fast load times",
        features: "15+ core features"
      }
    },
    {
      title: "SatConnect Intelligence Platform",
      description:
        "An enterprise-grade Power BI dashboard analyzing global satellite internet coverage. Processed and visualized data from multiple sources including World Bank, TRAI, and ITU. Delivered actionable insights on market trends and coverage gaps.",
      contribution: "Designed and built 5 interactive dashboards using 24+ Power BI features including ArcGIS maps, forecasting models, and What-If parameters. Presented findings to stakeholders.",
      tags: ["Power BI", "Data Analytics", "ArcGIS", "Excel", "DAX"],
      github: "https://github.com/pracheta31/SatConnect-Intelligence-Platform",
      live: null,
      featured: true,
      metrics: {
        dataPoints: "10K+",
        insights: "Key market trends",
        coverage: "Global analysis"
      }
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
