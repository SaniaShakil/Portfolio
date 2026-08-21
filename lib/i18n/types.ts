export interface Translation {
  nav: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
    letsTalk: string;
    education: string;
  };
  hero: {
    greeting: string;
    name: string;
    role: string;
    specializations: string[];
    description: string;
    downloadCv: string;
    viewProjects: string;
    scrollDown: string;
    highlightsTitle: string;
    highlights: Array<{
      value: string;
      label: string;
    }>;
  };
  about: {
    label: string;
    heading: string;
    bio: string[];
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  skills: {
    label: string;
    heading: string;
    categories: Array<{
      name: string;
      items: Array<{
        name: string;
        context: string;
      }>;
    }>;
  };
  experience: {
    label: string;
    heading: string;
    entries: Array<{
      title: string;
      company: string;
      location: string;
      period: string;
      current: boolean;
      highlights: string[];
      tech: string[];
      certificate?: string;
    }>;
  };
  education: {
    label: string;
    heading: string;
    entries: Array<{
      degree: string;
      institution: string;
      location: string;
      period: string;
      description: string;
      courses: string[];
    }>;
    languages: {
      label: string;
      items: Array<{
        language: string;
        level: string;
      }>;
    };
  };
  projects: {
    label: string;
    heading: string;
    filterAll: string;
    filters: string[];
    items: Array<{
      name: string;
      description: string;
      category: string;
      role: string;
      scale: string;
      tech: string[];
      featured: boolean;
      badge: string;
      researchPaper?: string;
    }>;
  };
  contact: {
    label: string;
    heading: string;
    subheading: string;
    email: string;
    form: {
      name: string;
      emailField: string;
      message: string;
      send: string;
    };
    location: string;
  };
  footer: {
    name: string;
    location: string;
    rights: string;
  };
}
