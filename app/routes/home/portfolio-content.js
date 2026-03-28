/**
 * Edit this file to fill in your portfolio copy. Shapes are consumed by home section components.
 */
export const portfolioContent = {
  hero: {
    name: 'Shivam Yadav',
    role: 'AI/ML Engineer',
    tagline: 'Building intelligent, scalable, and reliable AI systems for real-world applications.',
    focusAreas: ['GenAI', 'RAG', 'AI Agents', 'MCP'],
    scrollTargetId: 'about',
    /** When not 'displacementSphere', home page skips Draco WASM prefetch. */
    background: 'displacementSphere',
  },

  about: {
    title: 'About Me',
    paragraphs: [
      "I'm an AI/ML Engineer with experience in building scalable, reliable, and production-ready software systems for real-world applications. My work spans AI/ML, backend development, intelligent automation, and modern data-driven systems, with a focus on creating practical solutions that are efficient, impactful, and built for deployment.",
      'I enjoy solving problems across AI products, backend services, information retrieval, workflows, and system design using modern cloud, data, and application technologies. Outside of work, I also enjoy playing football, which reflects my interest in teamwork, discipline, and consistency.',
    ],
    imageAlt: 'Shivam Yadav — AI/ML Engineer.',
  },

  skills: {
    title: 'Skills',
    groups: [
      {
        title: 'Languages & backend',
        items: ['Python', 'FastAPI', 'PostgreSQL', 'MongoDB'],
      },
      {
        title: 'AI / ML',
        items: [
          'RAG',
          'Semantic RAG',
          'LLMs',
          'AI Agents',
          'MCP',
          'NLP',
          'Multimodal AI',
          'OCR',
          'Vector Search',
          'FAISS',
        ],
      },
      {
        title: 'Cloud',
        items: [
          'Azure',
          'AWS',
          'AWS Lambda',
          'Amazon S3',
          'DynamoDB',
          'AWS Rekognition',
        ],
      },
      {
        title: 'Data',
        items: [
          'Databricks',
          'ADF',
          'Azure Synapse',
          'Azure Purview',
          'ETL Pipelines',
          'Workflow Automation',
        ],
      },
      {
        title: 'Tools / search',
        items: [
          'Azure Cognitive Search',
          'Elasticsearch',
          'OpenSearch',
          'Kibana',
          'LLaMA',
          'Mistral',
          'Ollama',
          'Azure OpenAI',
        ],
      },
    ],
  },

  projects: {
    title: 'Projects',
    items: [
      {
        title: 'AutoScrum – AI-Powered Workflow Automation System',
        problem:
          'Manual Scrum workflows (requirement analysis, story creation, task allocation) are time-intensive and prone to inefficiencies.',
        solution:
          'Developed a multi-agent AI system using MCP that automates requirement analysis, generates structured user stories with acceptance criteria, and performs intelligent task allocation based on team capacity.',
        impact:
          '• Reduced manual effort by 50%+\n• Accelerated sprint planning and backlog grooming\n• Improved consistency in user story generation',
        stack: [
          'Python',
          'FastAPI',
          'LangGraph',
          'MCP',
          'Azure OpenAI',
          'PostgreSQL',
          'Redis',
          'React',
        ],
        demoUrl: '',
        repoUrl: 'https://github.com/Anajrajeev/AutoScrum',
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
