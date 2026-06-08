export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  metrics?: string; // e.g. "4.8★ (1M+ Downloads)"
  role: string;
  githubUrl?: string;
  playStoreUrl?: string;
  imageUrl: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  achievements: string[];
  techUsed: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // 1-5 or 0-100 percentage
    icon: string;
  }[];
}
