import { Project, Experience, Certification, SkillCategory } from "./types";

export const DEV_NAME = "Sushant Chauhan";
export const DEV_TITLE = "Senior Software Engineer - Android";
export const DEV_TAGLINE = "Engineering high-performance video streaming, real-time WebRTC channels, and robust, offline-first IoT Android applications.";
export const DEV_BIO = "Distinguished Senior Software Engineer with 8+ years of dedicated Android engineering mastery. Specialist in optimizing low-latency video player engines (ExoPlayer), real-time WebRTC systems, IoT smart glasses, and highly scalable offline architectures. Proven history of improving build performance by 65%, slashing crash rates by 35%, and designing elegant, fluid mobile interfaces with modern Jetpack Compose, Kotlin, and Clean Architecture.";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Android & Jetpack Core",
    skills: [
      { name: "Kotlin & Java", level: 98, icon: "Code2" },
      { name: "Jetpack Compose / Material 3", level: 96, icon: "Palette" },
      { name: "Coroutines & Flow", level: 95, icon: "Shuffle" },
      { name: "Android SDK & NDK", level: 93, icon: "Cpu" },
      { name: "Kotlin Multiplatform (KMP)", level: 82, icon: "Laptop" }
    ]
  },
  {
    title: "Real-Time & Networking",
    skills: [
      { name: "WebRTC & Web Sockets", level: 94, icon: "Compass" },
      { name: "Room DB & SQLite & DataStore", level: 93, icon: "Database" },
      { name: "MVI & MVVM (Clean Architecture)", level: 97, icon: "Layout" },
      { name: "Dagger / Hilt", level: 94, icon: "Zap" },
      { name: "REST APIs & Sockets", level: 91, icon: "Link" }
    ]
  },
  {
    title: "Optimization & Delivery",
    skills: [
      { name: "Gradle Build Optimizations", level: 95, icon: "Sliders" },
      { name: "Memory Profiling & Leak Detection", level: 91, icon: "Activity" },
      { name: "Firebase Crashlytics & Analytics", level: 93, icon: "Shield" },
      { name: "ProGuard / R8 Obfuscation", level: 89, icon: "Lock" },
      { name: "CI/CD & Jenkins Pipelines", level: 87, icon: "GitBranch" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "vortex-pay", // Keep this ID to not break the phone emulator QR display screen check in ProjectDetailsModal
    title: "BCN OTT Platform",
    subtitle: "High-Performance Media & Entertainment Streaming App",
    description: "Architected a fully reactive streaming Android application that handles secure, smooth live and on-demand player buffering via Exo Player. Reduced build time overhead and application footprints while maintaining 60FPS content delivery structures.",
    techStack: ["Kotlin", "Jetpack Compose", "ExoPlayer", "Coroutines/Flow", "Hilt", "Clean Architecture", "R8/ProGuard"],
    metrics: "Tata Elxsi Engine Lead",
    role: "Senior Android Engineer",
    githubUrl: "https://github.com/sushantchauhan08",
    playStoreUrl: "https://play.google.com/store",
    imageUrl: "/src/assets/images/android_mockup_1780890722604.png",
    featured: true
  },
  {
    id: "genzo-healthcare",
    title: "Genzo Platform",
    subtitle: "Real-Time Encrypted Clinical Communication App",
    description: "Developed a highly secure real-time discussion suite integrating encrypted chat, HD video consultations, and custom smart glass connectivity allowing doctors hands-free workspace assistance and wireless telemetry feeds.",
    techStack: ["Kotlin", "WebRTC", "Web Sockets", "Firebase", "Smart Glass integration", "Clean Architecture"],
    metrics: "Secure HD Consultation",
    role: "Software Engineer",
    githubUrl: "https://github.com/sushantchauhan08",
    imageUrl: "placeholder1",
    featured: true
  },
  {
    id: "vts-tracker",
    title: "VTS Tracker",
    subtitle: "IoT Real-Time Vehicle Tracking Analytics Tool",
    description: "Real-time fleet tracking system utilizing GPS services, local client sockets, and foreground background workers. Created overlay systems reporting ignition indicators, velocity, and live map directions through the Google Maps API.",
    techStack: ["Java", "MVVM", "Google Maps API", "Foreground Services", "Sockets", "IoT Sensors"],
    metrics: "Dynakode GPS Integration",
    role: "Core Software Engineer",
    githubUrl: "https://github.com/sushantchauhan08",
    imageUrl: "placeholder2",
    featured: true
  },
  {
    id: "zee-news",
    title: "Zee News App",
    subtitle: "Large-Scale Media Pagination & Broadcast App",
    description: "Contributed to India's premier news network application, ZMCL. Designed high-performance pagination layers, scalable push notification pipelines, dynamic localization buffers, and comprehensive tablet & mobile support layouts.",
    techStack: ["Kotlin", "Jetpack Compose", "MVVM", "Pagination", "Firebase push notifications", "Localization"],
    metrics: "10M+ Enterprise Installs",
    role: "Software Engineer",
    githubUrl: "https://github.com/sushantchauhan08",
    imageUrl: "placeholder3",
    featured: false
  },
  {
    id: "vodafone-idea",
    title: "Vodafone Idea App",
    subtitle: "High-Traffic Subscriber & Payment Module",
    description: "Structured fast and secure checkout flows, recharge systems, and subscription metrics displays under negative latency and weak networking connections to ensure consistent user purchase transactions.",
    techStack: ["Java", "Android SDK", "Payment Gateways", "SQLite DB", "Material Design", "Network Optimization"],
    metrics: "20M+ Payments Handled",
    role: "Software Engineer",
    githubUrl: "https://github.com/sushantchauhan08",
    imageUrl: "placeholder4",
    featured: false
  },
  {
    id: "vu-screen",
    title: "Vu Screen Dashboard",
    subtitle: "Aviation In-Flight Local Entertainment Hub",
    description: "An offline media deployment system running on SpiceJet aircraft. Leveraged custom media player states, local aircraft Wi-Fi APIs, and Bluetooth systems allowing passengers peer-to-peer offline entertainment catalogs.",
    techStack: ["Java", "Media Player", "Wi-Fi APIs", "Bluetooth APIs", "Local Offline Cache", "Custom UI"],
    metrics: "SpiceJet Aircraft Suite",
    role: "Core Software Developer",
    githubUrl: "https://github.com/sushantchauhan08",
    imageUrl: "placeholder5",
    featured: false
  }
];

export const EXPERIENCE_HISTORY: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Software Engineer - Android",
    company: "Tata Elxsi",
    location: "Gurugram, Haryana, India",
    period: "Apr 2022 - Current",
    isCurrent: true,
    achievements: [
      "Owned and optimized critical EPG and video player modules, improving playback reliability and overall user experience across Android devices.",
      "Architected and developed scalable OTT platform features for live and on-demand streaming using Jetpack Compose, Exo Player, Kotlin Coroutines, Flow, and Clean Architecture.",
      "Reduced application size by 20% (~4.5 MB) through optimized R8/ProGuard configurations and dependency cleanup.",
      "Improved Gradle build performance by 65% via build optimization and efficient dependency management strategies.",
      "Reduced application crash rate by 35% using Firebase Crashlytics, memory profiling, and lifecycle-aware optimizations."
    ],
    techUsed: ["Jetpack Compose", "Coroutines/Flow", "ExoPlayer", "Clean Architecture", "R8/ProGuard", "Gradle", "Firebase"]
  },
  {
    id: "exp-2",
    role: "Software Engineer",
    company: "Appzlogic Pvt. Ltd.",
    location: "Noida, Uttar Pradesh, India",
    period: "Dec 2020 - Jan 2022",
    isCurrent: false,
    achievements: [
      "Integrated smart glass devices to enable hands-free medical workflows, remote diagnostics, and real-time assistance for doctors and clinical staff.",
      "Architected and delivered a secure real-time healthcare communication platform with end-to-end encrypted messaging, HD video consultations, and live collaboration capabilities for healthcare professionals.",
      "Engineered low-latency audio/video communication using web sockets and WebRTC, ensuring stable real-time connectivity and seamless communication.",
      "Optimized media streaming and network handling under poor connectivity conditions, significantly improving call reliability and user experience."
    ],
    techUsed: ["Kotlin", "WebRTC", "Web Sockets", "Firebase", "Smart Glass APIs", "Secure Encryption"]
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "Blue Pie Consulting",
    location: "Noida, India",
    period: "Sept 2017 - May 2020",
    isCurrent: false,
    achievements: [
      "Contributed to the development of Zee News, the flagship app of India's largest news network, ZMCL.",
      "Implemented live video streaming, push notifications, pagination, and multi-device support.",
      "Engineered stable background service layers ensuring immediate push warning messages during key live news broadcast events."
    ],
    techUsed: ["Kotlin", "Jetpack Compose", "MVVM", "Pagination", "Firebase - push notifications", "Localization"]
  },
  {
    id: "exp-4",
    role: "Software Engineer",
    company: "Quarter Pie Interactive",
    location: "Noida, India",
    period: "Oct 2016 - Jul 2017",
    isCurrent: false,
    achievements: [
      "Designed and optimized robust, lightweight custom user interface components representing interactive mobile dashboard templates.",
      "Organized SQLite schemas reporting rapid CRUD updates and transactional safety rules for state machines."
    ],
    techUsed: ["Java", "Android SDK", "SQLite Persistence", "Material UI", "JUnit"]
  },
  {
    id: "exp-5",
    role: "Software Engineer",
    company: "mVentus Solution",
    location: "Noida, India",
    period: "Jul 2015 - Sept 2016",
    isCurrent: false,
    achievements: [
      "Developed vehicle tracking app metrics representing high-fidelity live tracking widgets leveraging Google Maps.",
      "Engineered secure Vodafone recharge operations, handling encrypted network handshake tokens.",
      "Built airplane offline systems (Vu Screen) permitting on-board passenger streaming through secure Bluetooth and local Wi-Fi bridges."
    ],
    techUsed: ["Java", "Google Maps Platform", "GPS Services", "Web Sockets", "Media Player", "Wi-Fi APIs"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    name: "Master of Computer Applications (MCA)",
    issuer: "GNIOT (UPTU)",
    date: "2015",
    credentialId: "CGPA: 8.4",
    verificationUrl: "https://gniotgroup.edu.in",
    iconName: "Award"
  },
  {
    id: "cert-2",
    name: "Advanced EPG System Deployment Recognition",
    issuer: "Tata Elxsi Engineering Group",
    date: "2023",
    credentialId: "High Stability OTT System",
    verificationUrl: "https://tataelxsi.com",
    iconName: "ShieldCheck"
  },
  {
    id: "cert-3",
    name: "Aero Offline Media Innovation Award",
    issuer: "mVentus Solution / SpiceJet",
    date: "2016",
    credentialId: "Vu Screen Project Delivery",
    verificationUrl: "https://mventus.com",
    iconName: "CheckCircle"
  }
];

