/**
 * Edit this file to fill in your portfolio copy. Shapes are consumed by home section components.
 */
export const portfolioContent = {
  hero: {
    name: 'Shivam Yadav',
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
        repoUrl: 'https://github.com/glichy-gem',
      },
    ],
  },

  experience: {
    title: 'Experience',
    roles: [
      {
        title: 'Associate Software Engineer (AI/ML)',
        company: 'Unisys',
        period: 'Jul 2024 — Present · Bengaluru',
        contributions: [
          'Built AI-powered solutions using Semantic RAG, Azure Cognitive Search, NLP, and Multilingual AI for legal and education-focused use cases, improving retrieval efficiency by ~60% and learning outcomes by ~40%.',
          'Developed production-grade AI/ML and ETL pipelines with Python, FastAPI, PostgreSQL, ADF, Synapse, Databricks, and Purview for scalable and governed deployment.',
          'Designed monitoring dashboards using Elasticsearch and OpenSearch to track performance and operational metrics for 460K+ users.',
          'Built a multimodal RAG system for law enforcement applications, supporting audio, video, image, and document intelligence with real-time identification across 100K+ records.',
        ],
        techStack:
          'Python, FastAPI, Generative AI, AI Agents, RAG, Multimodal AI, Vector Search, OCR, Azure, AWS, Databricks, Elasticsearch, OpenSearch, Kibana.',
      },
      {
        title: 'Student Technical Intern (AI/ML)',
        company: 'Unisys',
        period: 'Jan 2024 — Jul 2024 · Bengaluru',
        contributions: [
          'Enhanced ingestion and retrieval workflows using Azure Form Recognizer, OCR, semantic chunking, and open-source LLMs.',
          'Optimized inference pipelines with LLaMA, Mistral, and Ollama, reducing model inference cost by ~40%.',
        ],
        techStack: 'Azure Form Recognizer, OCR, Semantic Chunking, LLaMA, Mistral, Ollama, Python.',
      },
    ],
  },

  certifications: {
    title: 'Certifications',
    items: [
      {
        name: 'Microsoft Certified: Azure AI Engineer Associate',
        issuer: 'Microsoft',
        year: 'Nov 2025 – Nov 2026',
        description:
          'Expertise in designing and deploying AI solutions using Azure AI Services, including NLP, computer vision, and conversational AI.',
        // Credly, Microsoft Learn transcript, or LinkedIn “Show credential” URL
        credentialUrl: 'https://learn.microsoft.com/en-gb/users/shivamyadav-3237/credentials/cb58ea3e52bb2254?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      },
      {
        name: 'Aisera AI Workflows (Intermediate Level)',
        issuer: 'Aisera Academy',
        year: 'Mar 2025',
        description:
          'Hands-on experience in building AI-driven workflows, automation, and enterprise AI applications.',
        credentialUrl: 'https://drive.google.com/file/d/1tUqu4aRIXkCh4wKbkVB6kuphrY5HW1aQ/view?usp=drive_link',
      },
    ],
  },

  contact: {
    title: 'Contact',
    intro: 'Reach out to me via email, social media, or the contact form.',
    email: 'shivamyadav22feb@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/shivam-yadavv/',
    githubUrl: 'https://github.com/glichy-gem',
  },
};
