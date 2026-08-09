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
    background: 'displacementSphere',
  },

  about: {
    title: 'About Me',
    paragraphs: [
      "I'm an AI/ML Engineer with experience in building scalable, reliable, and production-ready software systems for real-world applications. My work spans AI/ML, backend development, intelligent automation, and modern data-driven systems, with a focus on creating practical solutions that are efficient, impactful, and built for deployment.",
      'I enjoy solving problems across AI products, backend services, information retrieval, workflows, and system design using modern cloud, data, and application technologies. Outside of work, I also enjoy playing football, which reflects my interest in teamwork, discipline, and consistency.',
    ],
    imageAlt: 'Shivam Yadav — AI/ML Engineer.',
    resumeUrl: '/Shivam-Yadav-Resume.pdf',
    resumeFileName: 'Shivam-Yadav-Resume.pdf',
  },

  skills: {
    title: 'Skills',
    subtitle: 'Tools I reach for every day',
    groups: [
      {
        title: 'Languages & backend',
        items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'MongoDB', 'C++'],
      },
      {
        title: 'AI / ML',
        items: [
          'LLMs',
          'AI Agents',
          'RAG',
          'Semantic RAG',
          'MCP',
          'Guardrails',
          'Vector Search',
          'FAISS',
          'NLP',
          'Multimodal AI',
          'OCR',
          'AWS Bedrock',
          'AWS AgentCore',
          'Azure AI Foundry',
          'ServiceNow MCP',
        ],
      },
      {
        title: 'Cloud',
        items: [
          'Azure',
          'AWS',
          'AWS Rekognition',
          'AWS Lambda',
          'Amazon S3',
          'DynamoDB',
        ],
      },
      {
        title: 'Data',
        items: [
          'Databricks',
          'ETL Pipelines',
          'Azure Synapse',
          'ADF',
          'Azure Purview',
          'Workflow Automation',
          'Azure Logic Apps',
        ],
      },
      {
        title: 'Tools / search',
        items: [
          'Azure OpenAI',
          'Groq',
          'LLaMA',
          'Mistral',
          'Ollama',
          'Azure Cognitive Search',
          'Elasticsearch',
          'OpenSearch',
          'Kibana',
        ],
      },
    ],
  },

  projects: {
    title: 'Projects',
    subtitle: "Systems I've designed & shipped",
    items: [
      {
        slug: 'multi-cloud-agent-orchestration',
        title: 'Multi-Cloud AI Agent Orchestration Platform',
        category: 'Agentic AI / Platform Engineering',
        cloud: 'AWS + Azure',
        status: 'Production',
        featured: true,
        summary:
          'Enterprise control plane for AI agents running on AWS Bedrock AgentCore and Azure AI Foundry. Teams discover, register, govern, and chat with agents, chain them into multi-agent workflows, and monitor them live through CloudWatch and X-Ray — with Bedrock Guardrails enforced on every interaction and role-based isolation so multiple client organizations and teams operate from one deployment.',
        stackShort: [
          'Python',
          'FastAPI',
          'AWS Bedrock AgentCore',
          'CloudWatch',
          'X-Ray',
          'Azure AI Foundry',
          'React',
          'TypeScript',
          'PostgreSQL',
          'AKS',
        ],
        overview: [
          'An enterprise control plane that gives an organization a single place to manage AI agents deployed across multiple cloud accounts. Teams can discover agent runtimes scattered across AWS Bedrock AgentCore and Azure AI Foundry, register and approve them into a governed catalog, attach guardrails and tool integrations, converse with them through streaming chat, chain them into multi-agent workflows, and observe their health and cost in production.',
          'Multi-tenant by design: clients, projects, and teams are isolated through a role-based access control model, so different business units run their own agents and workflows from a single deployment.',
        ],
        capabilities: [
          {
            term: 'Agent discovery',
            detail: 'across cloud accounts through a pluggable framework with one normalized schema',
          },
          {
            term: 'Approval-gated catalog',
            detail: 'with a contributor to maintainer registration workflow',
          },
          {
            term: 'Streaming chat',
            detail: 'with agents, including tool-use interrupt and resume handling',
          },
          {
            term: 'Multi-agent workflows',
            detail:
              'spanning fixed pipelines, LLM-planned dynamic DAGs, and supervised step-by-step review',
          },
          {
            term: 'Human-in-the-loop control',
            detail: 'through tool-approval gates and clarification pauses',
          },
          {
            term: 'Responsible AI guardrails',
            detail: 'provisioned and enforced on every interaction',
          },
          {
            term: 'Production observability',
            detail: 'covering health, latency percentiles, error rates, and cost per agent',
          },
        ],
        highlights: [
          {
            title: 'AgentCore invocation layer',
            detail:
              'Server-sent events response streaming with tuned read and connect timeouts, and bounded retries configured so a mid-stream timeout never double-invokes an agent.',
          },
          {
            title: 'Tool-use interrupt and resume loop',
            detail:
              'Detects a tool_use finish reason, executes the requested tool, and resumes the agent with interrupt responses. Supports both Bedrock Converse and Strands payload formats across up to 25 rounds per conversation turn.',
          },
          {
            title: 'Multi-tier ARN resolution with self-healing cache',
            detail:
              'Environment override, then registry file, then live runtime lookup. Pre-warmed at startup and auto-refreshed on staleness, so agent redeployments never break active chat sessions.',
          },
          {
            title: 'Multi-cloud discovery',
            detail:
              'Azure AI Foundry discovery via AIProjectClient with service-principal auth, and Azure Logic Apps discovery through WebSiteManagementClient with per-site caching to stay inside Azure API throttle limits.',
          },
          {
            title: 'MCP integration',
            detail:
              'Model Context Protocol servers integrated across HTTP/JSON-RPC, SSE, and stdio transports, with a tool-to-server routing registry so agent tool calls resolve to the correct backend automatically.',
          },
          {
            title: 'Responsible AI',
            detail:
              'Guardrail provisioning covering content filters, denied-topic policies, word filters, PII entity detection, and custom regex redaction. Runtime input and output enforcement wraps every chat invocation, designed to fail open so a guardrail outage degrades protection without taking down chat.',
          },
          {
            title: 'Observability',
            detail:
              'Metric catalog authored across seven metric groups covering invocations, throttles, system and user errors, p50/p90/p99 latency, session counts, streaming byte volume, and compute-hour consumption. Log queries run over OpenTelemetry spans with async job submission, exponential-backoff polling, and TTL caching. Distributed trace retrieval is hardened against injection by restricting user input to a safe identifier charset.',
          },
          {
            title: 'Credential management',
            detail:
              'Seven-provider credential registry with declarative per-provider field schemas marking secrets, resolved at runtime from a secrets vault rather than stored in the database.',
          },
        ],
        scale: [
          'Backend service of roughly 27,000 lines',
          '48-table relational schema',
          '12-role RBAC model across platform, client, team, and project scopes',
          'Seven multi-agent workflow engines, including a nine-agent DevSecOps pipeline',
        ],
        stack: [
          'Python 3.12',
          'FastAPI',
          'AWS Bedrock AgentCore',
          'Bedrock Guardrails',
          'CloudWatch',
          'AWS X-Ray',
          'Azure AI Foundry',
          'Azure Logic Apps',
          'MCP',
          'PostgreSQL',
          'asyncpg',
          'WebSockets',
          'React 19',
          'TypeScript',
          'Azure Kubernetes Service',
          'Azure Key Vault',
        ],
        demoUrl: '',
        repoUrl: '',
      },
      {
        slug: 'voice-first-itsm-agent',
        title: 'Voice-First AI Agent for IT Service Management',
        category: 'Agentic AI / Voice AI',
        cloud: 'Azure',
        status: 'Production',
        featured: true,
        summary:
          'Conversational AI assistant that replaces form-based IT ticketing with natural speech. An employee describes a problem out loud; the agent asks targeted clarifying questions, searches a RAG-indexed knowledge base to resolve it without a ticket first, then drafts and files one — with visual cards rendering on screen in step with the spoken dialogue, and query scoping in typed code so each person sees only their own records.',
        stackShort: [
          'LiveKit',
          'OpenAI Realtime',
          'Azure AI Foundry',
          'Azure Logic Apps',
          'MCP',
          'RAG',
          'pgvector',
          'Next.js',
          'TypeScript',
          'WebRTC',
        ],
        overview: [
          'A conversational AI assistant that replaces form-based IT ticketing with natural speech. An employee describes a problem out loud; the agent asks targeted clarifying questions, searches a RAG-indexed knowledge base to attempt self-service resolution first, and only then drafts and files a ticket. Visual cards render on screen in step with the spoken dialogue.',
          'There are no menus, forms, or fixed commands. The model decides which tool to invoke from the conversation itself.',
        ],
        capabilities: [
          {
            term: 'Conversational ticket creation',
            detail: 'with clarifying questions and a reviewable draft before anything is filed',
          },
          {
            term: 'Self-service deflection',
            detail: 'through knowledge base search with cited articles surfaced on screen',
          },
          {
            term: 'Ticket lookup and listing',
            detail: 'scoped so each user sees only their own records',
          },
          {
            term: 'Ticket updates',
            detail: 'covering priority, category, work notes, resolve and close',
          },
          {
            term: 'Synchronized visual interface',
            detail:
              'with card types rendered live alongside speech and clickable follow-up actions',
          },
        ],
        highlights: [
          {
            title: 'Dual-brain design',
            detail:
              'A speech model drives dialogue and tool calls while a parallel UI model renders a custom card DSL. Both share one conversation state, so the screen and the voice never desynchronize.',
          },
          {
            title: 'Tool integration over MCP',
            detail:
              'Enterprise systems are exposed to the agent as callable tools using the Model Context Protocol. MCP server workflows are authored in Azure Logic Apps and registered in Azure AI Foundry, giving the model access to ticketing operations and vector knowledge base search.',
          },
          {
            title: 'Reliability layer over a non-deterministic model',
            detail:
              'Layered invariant enforcement combining prompt-level hard rules with client-side watchdog modules, eliminating a class of failures where the model fabricated ticket data, claimed no results without querying, or dropped a UI render.',
          },
          {
            title: 'Per-user data isolation',
            detail:
              'Query scoping is constructed in typed application code rather than in the prompt, so the model copies pre-scoped literals it cannot paraphrase. Each employee sees only their own records.',
          },
          {
            title: 'Latency tuning',
            detail:
              "Removed a full model round trip from the most-used request path by resolving query parameters client-side at session start and pinning them into the agent's identity context. The remaining latency budget was diagnosed from platform run telemetry rather than assumption.",
          },
        ],
        scale: [
          '3,000-article RAG knowledge base',
          'System prompts of roughly 6,500 tokens governing tool selection, multi-step flows, and reply-length tiers',
        ],
        stack: [
          'LiveKit',
          'OpenAI Realtime (voice-to-voice)',
          'Azure AI Foundry',
          'Azure Logic Apps',
          'MCP',
          'RAG',
          'pgvector',
          'PostgreSQL',
          'Next.js 15',
          'React 19',
          'TypeScript',
          'Zustand',
          'Tailwind CSS',
          'WebRTC',
          'OAuth / OIDC',
        ],
        demoUrl: '',
        repoUrl: '',
      },
      {
        slug: 'multimodal-investigative-ai',
        title: 'Multimodal Investigative AI Platform',
        category: 'Multimodal RAG',
        cloud: 'AWS',
        status: 'Production',
        featured: true,
        summary:
          'Investigative intelligence chatbot where a single natural-language query retrieves corroborating evidence across image, video, audio, and text at once. Modality-aware chunking and parallel per-modality retrieval feed a cross-modal reranker, returning ranked results with source citations so every finding traces back to the underlying asset — no manual tagging required.',
        stackShort: [
          'Amazon Nova',
          'Amazon Bedrock',
          'Amazon OpenSearch',
          'Amazon Transcribe',
          'Amazon Translate',
          'FastAPI',
          'Python',
          'Amazon S3',
        ],
        overview: [
          'An investigative intelligence chatbot that lets analysts run descriptive natural-language queries and retrieve corroborating evidence simultaneously across every media type in the corpus. A single query returns ranked results with source citations, so findings stay traceable back to the underlying asset.',
        ],
        capabilities: [
          {
            term: 'Cross-modal search',
            detail: 'returning matches from image, video, audio, and text in one pass',
          },
          {
            term: 'Descriptive querying',
            detail:
              'over subject attributes, objects, actions, and context, with no manual tagging required',
          },
          {
            term: 'Speech intelligence',
            detail: 'covering transcription and translation in both batch and real-time modes',
          },
          {
            term: 'Flexible ingestion',
            detail: 'supporting on-demand, scheduled, and live processing',
          },
        ],
        highlights: [
          {
            title: 'Image RAG subsystem',
            detail:
              'Visual embedding pipeline built on multimodal foundation models, generating a shared embedding space that lets a text query retrieve semantically matching visual content without any manual labelling.',
          },
          {
            title: 'Modality-aware chunking',
            detail:
              'Separate strategies per media type, including frame and shot segmentation for video, temporal windowing for audio, and semantic chunking for text, to preserve context integrity across heterogeneous inputs.',
          },
          {
            title: 'Fusion retrieval',
            detail:
              'Parallel top-10 candidate retrieval per modality, followed by cross-modal reranking that surfaces the top 5 highest-relevance results. Substantially improves precision over single-modality retrieval.',
          },
          {
            title: 'Speech pipelines',
            detail:
              'Managed transcription and translation services wired into both batch jobs and real-time streaming paths.',
          },
        ],
        scale: [],
        stack: [
          'Amazon Nova (multimodal)',
          'Amazon Bedrock',
          'Amazon OpenSearch',
          'Amazon Transcribe',
          'Amazon Translate',
          'FastAPI',
          'Python',
          'Multimodal Embeddings',
          'Amazon S3',
        ],
        demoUrl: '',
        repoUrl: '',
      },
      {
        slug: 'legal-document-intelligence',
        title: 'Legal Document Intelligence Platform',
        category: 'Document AI / RAG',
        cloud: 'Azure',
        status: 'Production',
        featured: false,
        summary:
          'Platform that lets legal professionals query complex statutory and regulatory text in natural language and get answers carrying clause-level citations. A hierarchy-preserving extraction engine parses deeply nested documents into structured JSON — a rule under 1.1.1 means something different from the same words under 1.2 — and a three-stage human-in-the-loop workflow puts domain experts in the path before anything publishes.',
        stackShort: [
          'Azure Synapse Analytics',
          'Azure AI Search',
          'Python',
          'MongoDB',
          'PostgreSQL',
          'React',
          'SSO',
        ],
        overview: [
          'A legal document intelligence platform that lets legal professionals query complex statutory and regulatory text in natural language, for example around eligibility and dependant-based provisions. Every answer carries clause-level citations tracing back to the exact source section.',
          'The core problem is structural: legal meaning depends on where a clause sits in the hierarchy. A rule under 1.1.1 means something different from the same words under 1.2. The extraction engine is built around preserving that structure.',
        ],
        capabilities: [
          {
            term: 'Hierarchy-preserving extraction',
            detail: 'of deeply nested legal documents into structured JSON',
          },
          {
            term: 'Three-stage human-in-the-loop workflow',
            detail: 'ensuring domain-expert validation before publication',
          },
          { term: 'Natural-language Q&A', detail: 'over the curated rule base' },
          { term: 'Clause-level citations', detail: 'on every answer' },
          { term: 'Automated publish pipeline', detail: 'with email notification on completion' },
        ],
        highlights: [
          {
            title: 'Hierarchy-preserving extraction engine',
            detail:
              'Parses multi-level clause structures up to four levels deep into structured JSON, retaining indentation, numbering, and parent-child relationships. Critical for legal accuracy, where clause context changes meaning.',
          },
          {
            title: 'Rule Extractor',
            detail:
              'Side-by-side review of source document against extracted output, with inline correction. Reviewers confirm the parser placed each provision under the right parent before anything proceeds.',
          },
          {
            title: 'Rule Editor',
            detail:
              'Consolidated rule review with hover-linked bidirectional highlighting between source and extracted rule, plus inline editing.',
          },
          {
            title: 'Publish pipeline',
            detail:
              'Triggered on publish, running chunking, embedding generation, and vector indexing, with an automated email notification on completion. Roughly 7 to 8 minutes per document from publish to searchable.',
          },
          {
            title: 'Legacy modernization',
            detail:
              'Migrated the extraction codebase from TypeScript to Python, consolidating the stack and enabling integration with the Python-based ML and embedding pipeline.',
          },
          {
            title: 'Context engineering',
            detail:
              'Rolling conversation history stored in a document database for multi-turn follow-up handling and query caching.',
          },
        ],
        scale: [],
        stack: [
          'Azure Synapse Analytics',
          'Azure AI Search',
          'Python',
          'MongoDB',
          'PostgreSQL',
          'React',
          'SSO',
          'Azure Blob Storage',
        ],
        demoUrl: '',
        repoUrl: '',
      },
      {
        slug: 'multimodal-academic-assistant',
        title: 'Multimodal Academic Assistant',
        category: 'Multimodal RAG / EdTech',
        cloud: 'Azure + AWS',
        status: 'Production',
        featured: false,
        summary:
          'Multimodal RAG platform serving student question-answering across five academic disciplines, grounded on a corpus of 650 ingested textbooks with citations back to book and section. Discipline-aware routing scopes each query to the relevant subject index, and students can photograph a handwritten equation and have it solved step by step through OCR-to-LaTeX and a maths reasoning model.',
        stackShort: [
          'Azure AI Foundry',
          'Azure AI Search',
          'Azure Synapse',
          'PostgreSQL',
          'MongoDB',
          'Python',
          'OCR',
          'LaTeX',
          'AWS',
        ],
        overview: [
          'A multimodal RAG platform serving student question-answering across five academic disciplines, grounded on a corpus of 650 ingested textbooks. Answers are returned with citations showing which book and section they came from.',
          'Beyond text retrieval, students can photograph a handwritten or printed equation and have it solved step by step.',
        ],
        capabilities: [
          {
            term: 'Discipline-aware retrieval',
            detail: 'scoping search to the relevant subject index',
          },
          { term: 'Citation-backed answers', detail: 'identifying the source book and section' },
          { term: 'Handwritten maths solving', detail: 'through image upload' },
          { term: 'Admin ingestion flow', detail: 'for adding new source material' },
          {
            term: 'Role-based access',
            detail: 'separating admin corpus management from student query access',
          },
        ],
        highlights: [
          {
            title: 'Event-triggered ingestion pipeline',
            detail:
              'Fires on book upload and runs text extraction, chunking, embedding generation, and indexing into the vector store. Originally built on Azure Data Factory, later migrated to Azure Synapse Analytics.',
          },
          {
            title: 'Discipline-aware query filtering',
            detail:
              'Incoming queries are embedded and routed to the relevant subject index before similarity search, improving precision and reducing cross-domain hallucination.',
          },
          {
            title: 'Multimodal maths reasoning',
            detail:
              'Uploaded equations are processed through OCR to LaTeX conversion, then solved by a maths-specialized reasoning model using chain-of-thought prompting, returning step-by-step LaTeX-rendered solutions.',
          },
          {
            title: 'Caching layer',
            detail:
              'Recent high-frequency queries are cached in a document store, cutting redundant model and vector-search calls and improving response latency.',
          },
          {
            title: 'Cross-cloud portability',
            detail:
              'The full stack was re-architected and deployed on AWS in addition to Azure, delivering a cloud-portable RAG system.',
          },
        ],
        scale: ['650 ingested textbooks', 'Five academic disciplines'],
        stack: [
          'Azure AI Foundry',
          'Azure AI Search',
          'Azure Synapse Analytics',
          'Azure Data Factory',
          'PostgreSQL',
          'MongoDB',
          'Python',
          'OCR',
          'LaTeX',
          'AWS',
        ],
        demoUrl: '',
        repoUrl: '',
      },
      {
        slug: 'autoscrum',
        title: 'AutoScrum — AI-Powered Workflow Automation System',
        category: 'Agentic AI / Workflow Automation',
        status: 'Open source',
        featured: false,
        summary:
          'Multi-agent system that automates the Scrum busywork — requirement analysis, structured user stories with acceptance criteria, and capacity-aware task allocation — coordinated over MCP. Cut manual sprint-planning effort by more than half while making story output consistent across a team.',
        stackShort: [
          'Python',
          'FastAPI',
          'LangGraph',
          'MCP',
          'Azure OpenAI',
          'PostgreSQL',
          'Redis',
          'React',
        ],
        overview: [
          'Manual Scrum workflows — requirement analysis, story creation, task allocation — are time-intensive and prone to inefficiencies.',
          'A multi-agent AI system built on MCP that automates requirement analysis, generates structured user stories with acceptance criteria, and performs intelligent task allocation based on team capacity.',
        ],
        capabilities: [
          {
            term: 'Requirement analysis',
            detail: 'parsing raw requirements into scoped, actionable work items',
          },
          {
            term: 'Structured story generation',
            detail: 'producing user stories with acceptance criteria in a consistent format',
          },
          {
            term: 'Capacity-aware task allocation',
            detail: 'distributing work against real team availability',
          },
          {
            term: 'Agent coordination over MCP',
            detail: 'so each specialist agent reaches the tools it needs through one protocol',
          },
        ],
        highlights: [],
        scaleLabel: 'Impact',
        scale: [
          'Reduced manual effort by 50%+',
          'Accelerated sprint planning and backlog grooming',
          'Improved consistency in user story generation',
        ],
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
    subtitle: 'Building production AI systems at scale',
    roles: [
      {
        title: 'Associate Software Engineer (AI/ML)',
        company: 'Unisys',
        period: 'Jul 2024 — Present',
        location: 'Bengaluru',
        contributions: [
          'Built AI-powered solutions using Semantic RAG, Azure Cognitive Search, NLP, and Multilingual AI for legal and education-focused use cases, improving retrieval efficiency by ~60% and learning outcomes by ~40%.',
          'Developed production-grade AI/ML and ETL pipelines with Python, FastAPI, PostgreSQL, ADF, Synapse, Databricks, and Purview for scalable and governed deployment.',
          'Designed monitoring dashboards using Elasticsearch and OpenSearch to track performance and operational metrics for 460K+ users.',
          'Built a multimodal RAG system for law enforcement applications, supporting audio, video, image, and document intelligence with real-time identification across 100K+ records.',
        ],
        stack: [
          'Python',
          'FastAPI',
          'Generative AI',
          'AI Agents',
          'RAG',
          'Multimodal AI',
          'Vector Search',
          'OCR',
          'Azure',
          'AWS',
          'Databricks',
          'Elasticsearch',
          'OpenSearch',
          'Kibana',
        ],
      },
      {
        title: 'Student Technical Intern (AI/ML)',
        company: 'Unisys',
        period: 'Jan 2024 — Jul 2024',
        location: 'Bengaluru',
        contributions: [
          'Enhanced ingestion and retrieval workflows using Azure Form Recognizer, OCR, semantic chunking, and open-source LLMs.',
          'Optimized inference pipelines with LLaMA, Mistral, and Ollama, reducing model inference cost by ~40%.',
        ],
        stack: [
          'Azure Form Recognizer',
          'OCR',
          'Semantic Chunking',
          'LLaMA',
          'Mistral',
          'Ollama',
          'Python',
        ],
      },
    ],
  },

  certifications: {
    title: 'Certifications',
    subtitle: 'Verified credentials in AI & engineering',
    items: [
      {
        name: 'Certificate of completion: Claude 101',
        issuer: 'Anthropic',
        year: 'Jun 2026',
        credentialId: 'dndckhb6ghqd',
        credentialUrl: 'https://verify.skilljar.com/c/dndckhb6ghqd',
      },
      {
        name: 'Claude Certified Architect — Foundations',
        issuer: 'Anthropic',
        year: 'Apr 2026',
        credentialId: 'orhjxr4ysquq',
        credentialUrl: 'https://verify.skilljar.com/c/orhjxr4ysquq',
      },
      {
        name: 'Microsoft Certified: Azure AI Engineer Associate',
        issuer: 'Microsoft',
        year: 'Nov 2025',
        credentialId: 'CB58EA3E52BB2254',
        credentialUrl: 'https://learn.microsoft.com/en-gb/users/shivamyadav-3237/credentials/cb58ea3e52bb2254',
      },
      {
        name: 'Aisera AI Workflows (Intermediate Level)',
        issuer: 'Aisera Academy',
        year: 'Mar 2025',
        credentialId: 'OLuTEVwpsA',
        credentialUrl: 'https://drive.google.com/file/d/1tUqu4aRIXkCh4wKbkVB6kuphrY5HW1aQ/view',
      },
      {
        name: 'Aisera GPT (Basic Level)',
        issuer: 'Aisera Academy',
        year: 'Mar 2025',
        credentialId: 'hb48vokUFA',
        credentialUrl: 'https://drive.google.com/file/d/1U-yD-uBR_vgteSRu4WOIm6OSrBnNmWSD/view',
      },
      {
        name: 'Entrepreneurial Management',
        issuer: 'Great Learning',
        year: 'Jan 2023',
        credentialId: 'JDCLHIVN',
        credentialUrl: 'https://www.mygreatlearning.com/certificate/JDCLHIVN',
      },
      {
        name: 'Introduction to Artificial Intelligence',
        issuer: 'Infosys Springboard',
        year: 'Jan 2023',
        credentialUrl: 'https://drive.google.com/file/d/1dlZYkVaisK9S2rP_AEVj5BIgmT1bhT65/view',
      },
      {
        name: 'Cyber Security Hygiene Practices',
        issuer: 'Ministry of Electronics and Information Technology',
        year: 'Sep 2022',
        credentialId: 'MeitY/ISEA/WCHP/017066',
        credentialUrl: 'https://drive.google.com/file/d/1V8fu2ER6d3q3BWi_RI7J64p_0DzFXg0q/view',
      },
      {
        name: 'Problem Solving',
        issuer: 'HackerRank',
        year: '2023',
        credentialId: '5dd4194be878',
        credentialUrl: 'https://www.hackerrank.com/certificates/iframe/5dd4194be878',
      },
    ],
  },

  articles: {
    title: 'Articles',
    subtitle: 'Long-form pieces on AI systems, agents & infrastructure',
    items: [
      {
        title: 'Your AI Has Amnesia. Redis Iris Just Fixed the Most Annoying Problem in AI',
        summary:
          "LLMs have no built-in memory — every message looks like a first interaction. This piece breaks down how Redis Iris's unified context layer (Agent Memory, LangCache, Context Retriever) plus semantic caching gives AI agents real memory while cutting redundant token costs.",
        source: 'MEDIUM',
        readTime: '9 min read',
        url: 'https://medium.com/@shivamyadav22aug/your-ai-has-amnesia-redis-iris-just-fixed-the-most-annoying-problem-in-ai-309fb3168829',
      },
      {
        title: "Claude Code Is Powerful. Without These 7 Skills, It's Also Unreliable",
        summary:
          'Seven practical skills — Skill Creator, Superpowers, GSD, review commands, Context Mode, Claude Mem, and Frontend Design — that turn Claude Code from a capable-but-inconsistent assistant into a reliable, production-grade coding partner.',
        source: 'MEDIUM',
        readTime: '9 min read',
        url: 'https://medium.com/@shivamyadav22aug/claude-code-is-powerful-without-these-7-skills-its-also-unreliable-04d56b5ed7a9',
      },
    ],
  },

  contact: {
    title: 'Get in touch',
    subtitle: 'Email, social, or the contact form',
    email: 'shivamyadav22feb@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/shivam-yadavv/',
    linkedinLabel: 'Shivam Yadav',
    githubUrl: 'https://github.com/glichy-gem',
    githubLabel: 'View my code',
  },
};
