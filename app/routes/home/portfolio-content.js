/**
 * Edit this file to fill in your portfolio copy. Shapes are consumed by home section components.
 */
export const portfolioContent = {
  hero: {
    name: 'Your Name',
    role: 'AI / ML Engineer',
    tagline: 'One-line value proposition — replace with how you help teams ship reliable ML systems.',
    focusAreas: ['GenAI', 'RAG', 'AI Agents', 'MCP'],
    scrollTargetId: 'about',
    /** When not 'displacementSphere', home page skips Draco WASM prefetch. */
    background: 'displacementSphere',
  },

  about: {
    title: 'About me',
    paragraphs: [
      'Short intro: your background (e.g. AI/ML graduate, current role). Replace this paragraph.',
      'Areas of expertise: GenAI, multimodal AI, agents — and the kinds of problems you solve. Replace this paragraph.',
    ],
    imageAlt: 'Portrait — replace with your photo description.',
  },

  skills: {
    title: 'Skills',
    groups: [
      { title: 'AI / ML', items: ['RAG', 'LLMs', 'Agents', 'MCP'] },
      { title: 'Cloud', items: ['Azure', 'AWS'] },
      { title: 'Data', items: ['Databricks', 'ADF', 'PostgreSQL'] },
      { title: 'Tools', items: ['FastAPI', 'LangGraph'] },
    ],
  },

  projects: {
    title: 'Projects',
    items: [
      {
        title: 'Project title (placeholder)',
        problem: 'What problem you solved — replace.',
        solution: 'How you built it — replace.',
        impact: 'Impact metrics (e.g. 60% faster, 100K+ users) — replace.',
        stack: ['Python', 'Azure OpenAI', 'FastAPI'],
        demoUrl: '',
        repoUrl: '',
      },
      {
        title: 'Second project (placeholder)',
        problem: 'Problem statement.',
        solution: 'Solution summary.',
        impact: 'Impact line.',
        stack: ['LangGraph', 'RAG', 'PostgreSQL'],
        demoUrl: '',
        repoUrl: 'https://github.com',
      },
    ],
  },

  experience: {
    title: 'Experience',
    roles: [
      {
        title: 'Role title',
        company: 'Company',
        period: '20XX — Present',
        contributions: [
          'Key contribution — replace.',
          'Another bullet with measurable outcome — replace.',
        ],
        impact: 'Optional one-line impact metric.',
      },
      {
        title: 'Previous role',
        company: 'Previous company',
        period: '20XX — 20XX',
        contributions: ['Contribution one.', 'Contribution two.'],
        impact: '',
      },
    ],
  },

  certifications: {
    title: 'Certifications',
    items: [
      { name: 'Azure AI Engineer Associate', issuer: 'Microsoft', year: '20XX' },
      { name: 'Example certification', issuer: 'Issuer', year: '' },
    ],
  },

  contact: {
    title: 'Contact',
    intro: 'Reach out via email or social — or use the contact form.',
    email: 'you@example.com',
    linkedinUrl: 'https://www.linkedin.com/in/your-profile',
    githubUrl: 'https://github.com/your-username',
  },
};
