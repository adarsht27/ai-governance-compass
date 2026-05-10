// ─── EU AI ACT DATA ──────────────────────────────────────────────────────────
// Source: Regulation (EU) 2024/1689, artificialintelligenceact.eu

export const EU_TIMELINE = [
  { date: "1 Aug 2024", label: "Act enters into force", status: "done", detail: "Regulation (EU) 2024/1689 officially entered into force." },
  { date: "2 Feb 2025", label: "Prohibited AI & AI literacy", status: "done", detail: "Article 5 prohibitions enforceable. Article 4 AI literacy obligations apply to providers and deployers." },
  { date: "2 Aug 2025", label: "GPAI model obligations", status: "done", detail: "Chapter V obligations for all general-purpose AI model providers. Governance infrastructure (Notified Bodies, national authorities) must be operational." },
  { date: "2 Aug 2026", label: "High-risk AI (Annex III)", status: "upcoming", detail: "Full compliance for high-risk systems listed in Annex III (employment, credit, education, law enforcement, etc.). Note: Digital Omnibus proposal in trilogue may delay to Dec 2027." },
  { date: "2 Aug 2027", label: "High-risk AI (Annex I products)", status: "future", detail: "High-risk AI embedded in regulated products (medical devices, machinery, vehicles) under Annex I. Legacy GPAI also fully covered by this date." },
  { date: "31 Dec 2030", label: "Large-scale IT systems", status: "future", detail: "AI components in large-scale EU IT systems (Annex X, e.g. Schengen, Eurodac) must comply." },
]

export const EU_RISK_TIERS = [
  {
    id: "unacceptable",
    label: "Unacceptable risk",
    shortLabel: "Prohibited",
    color: "#c0392b",
    bg: "#fdf2f1",
    border: "#f5c6c2",
    icon: "⊗",
    article: "Article 5",
    status: "Banned outright — Feb 2025",
    description: "AI practices incompatible with EU fundamental rights. Banned from the EU market.",
    examples: [
      "Subliminal or deceptive manipulation causing significant harm",
      "Exploiting vulnerabilities of age, disability, or socioeconomic status",
      "Biometric categorisation inferring race, politics, religion, sexual orientation",
      "Social scoring by public authorities causing detrimental treatment",
      "Predictive policing based solely on profiling / personality traits",
      "Compiling facial recognition databases via untargeted scraping",
      "Emotion recognition in workplaces or educational institutions (except medical/safety)",
      "Real-time remote biometric ID in public spaces for law enforcement (narrow exceptions only)"
    ],
    obligations: [],
    penalties: "€35M or 7% of global annual turnover (whichever is higher)",
    providerObligations: [],
    deployerObligations: []
  },
  {
    id: "high",
    label: "High risk",
    shortLabel: "High risk",
    color: "#b7770d",
    bg: "#fef9ee",
    border: "#f9e4b0",
    icon: "▲",
    article: "Articles 6–17, Annex III",
    status: "Compliance required — Aug 2026",
    description: "AI systems that significantly impact health, safety, or fundamental rights. Subject to strict pre-market conformity assessment and ongoing obligations.",
    annexIII: [
      { sector: "Biometrics", uses: ["Remote biometric ID systems", "Biometric categorisation inferring sensitive attributes", "Emotion recognition systems"] },
      { sector: "Critical infrastructure", uses: ["Safety components in energy, water, transport, digital infrastructure management"] },
      { sector: "Education & training", uses: ["Access/admission/assignment to educational institutions", "Evaluating learning outcomes", "Assessing appropriate education level", "Monitoring prohibited behaviour during tests"] },
      { sector: "Employment", uses: ["Targeted job advertising", "CV screening and filtering", "Evaluating candidates in interviews", "Promotion, termination, task allocation", "Performance monitoring and evaluation"] },
      { sector: "Essential services", uses: ["Benefits eligibility and allocation by public authorities", "Creditworthiness evaluation (except fraud detection)", "Emergency call prioritisation (police, fire, medical)", "Health/life insurance risk assessment and pricing"] },
      { sector: "Law enforcement", uses: ["Individual risk assessment for victimhood", "Polygraphs", "Evidence reliability evaluation", "Offending/re-offending risk assessment", "Profiling during criminal investigations"] },
      { sector: "Migration & asylum", uses: ["Polygraphs in migration contexts", "Irregular migration / health risk assessments", "Asylum/visa/residence permit examination", "Individual detection and recognition at borders"] },
      { sector: "Justice & democracy", uses: ["AI in legal research / applying law to facts", "Alternative dispute resolution AI", "Influencing election/referendum outcomes or voting behaviour"] }
    ],
    examples: [],
    providerObligations: [
      { id: "rms", label: "Risk management system", detail: "Documented, iterative process throughout the entire lifecycle. Must identify, analyse, evaluate and mitigate risks." },
      { id: "data", label: "Data governance", detail: "Training, validation and testing data must be relevant, representative, free of errors and complete for the intended purpose. Data governance practices required." },
      { id: "docs", label: "Technical documentation", detail: "Before market placement: detailed technical documentation demonstrating compliance, available to national authorities on request." },
      { id: "logs", label: "Automatic record-keeping", detail: "System must automatically log events relevant to identifying risks and substantial modifications throughout its lifecycle." },
      { id: "transparency", label: "Instructions for use", detail: "Clear, understandable instructions for downstream deployers, including system capabilities, limitations, and human oversight measures." },
      { id: "oversight", label: "Human oversight design", detail: "Design must allow deployers to implement effective human oversight — including ability to understand, monitor, intervene, override, and stop the system." },
      { id: "accuracy", label: "Accuracy, robustness & cybersecurity", detail: "Appropriate and declared accuracy metrics. Resilience to errors, faults, inconsistencies. Protection against adversarial manipulation." },
      { id: "qms", label: "Quality management system", detail: "Documented QMS covering strategy, design, development, testing, deployment, monitoring, corrective actions, and supplier management." },
      { id: "conformity", label: "Conformity assessment", detail: "Pre-market conformity assessment — either internal (Annex VI) or third-party via Notified Body (Annex VII for certain biometric and critical infrastructure systems)." },
      { id: "declaration", label: "EU declaration of conformity", detail: "Written declaration that the system meets all applicable requirements. Must be kept for 10 years." },
      { id: "ce", label: "CE marking", detail: "Affix CE marking before placing the system on the EU market." },
      { id: "register", label: "EU database registration", detail: "Register high-risk AI system in the EU AI Act public database before deployment." },
      { id: "post_market", label: "Post-market monitoring", detail: "Systematic collection and review of performance data throughout the lifecycle. Report serious incidents to national authorities without undue delay." },
      { id: "literacy", label: "AI literacy (from Feb 2025)", detail: "Ensure sufficient AI literacy for all staff and persons handling the AI system on the provider's behalf." }
    ],
    deployerObligations: [
      "Assign human oversight to competent, trained individuals",
      "Use the system only for its intended purpose as per instructions",
      "Monitor system operation and suspend if risks detected",
      "Inform provider if serious incidents occur",
      "Keep logs generated by the system (where technically feasible) for at least 6 months",
      "For public authorities: conduct a fundamental rights impact assessment before deployment",
      "Inform individuals that they are subject to high-risk AI decision-making"
    ],
    penalties: "€15M or 3% of global annual turnover"
  },
  {
    id: "limited",
    label: "Limited risk",
    shortLabel: "Limited risk",
    color: "#1a3a6e",
    bg: "#eef3fa",
    border: "#b8cce4",
    icon: "◎",
    article: "Article 50",
    status: "Obligations apply — Aug 2026",
    description: "Transparency obligations only. Users must know they are interacting with AI or consuming AI-generated content.",
    examples: [
      "Chatbots and conversational AI systems",
      "AI-generated text, images, audio or video (deepfakes)",
      "Emotion recognition systems (if not Annex III)",
      "AI systems generating synthetic media for public information"
    ],
    providerObligations: [
      { id: "disclose_ai", label: "Disclose AI nature", detail: "Chatbots must clearly inform users they are interacting with an AI system, unless obvious from context." },
      { id: "label_synthetic", label: "Label synthetic media", detail: "Deepfakes and AI-generated images/video/audio must be clearly labelled as artificially generated or manipulated." },
      { id: "label_public", label: "Label AI-generated public content", detail: "AI-generated text published with the purpose of informing the public on matters of public interest must be clearly labelled." }
    ],
    deployerObligations: [
      "Ensure transparency disclosures are implemented as required",
      "Do not deploy in ways that override provider-level transparency"
    ],
    penalties: "€15M or 3% of global annual turnover for non-compliance with transparency rules"
  },
  {
    id: "minimal",
    label: "Minimal / no risk",
    shortLabel: "Minimal risk",
    color: "#1e6b45",
    bg: "#edf7f1",
    border: "#a9dfc4",
    icon: "○",
    article: "Recital 47",
    status: "Unregulated — voluntary codes encouraged",
    description: "The vast majority of AI systems. No specific AI Act obligations apply, but general product safety law and other sector rules still govern.",
    examples: [
      "AI-enabled video games",
      "Spam and content filters",
      "AI-powered recommendation engines",
      "Inventory management and logistics optimisation",
      "Industrial quality control AI",
      "Predictive maintenance (non-safety-critical)"
    ],
    providerObligations: [
      { id: "voluntary", label: "Voluntary codes of conduct", detail: "Providers are encouraged — but not required — to adhere to voluntary codes of conduct covering requirements similar to high-risk systems." }
    ],
    deployerObligations: [
      "General product safety and consumer protection law still applies",
      "UK GDPR / EU GDPR applies where personal data is processed",
      "Sector-specific regulations remain in force"
    ],
    penalties: "No AI Act-specific penalties, but other applicable law enforced"
  }
]

export const GPAI_TIERS = [
  {
    id: "all_gpai",
    label: "All GPAI model providers",
    threshold: "Any model trained on >10²³ FLOPs capable of general tasks",
    obligations: [
      "Technical documentation (training process, evaluation results)",
      "Information for downstream providers (capabilities, limitations)",
      "Copyright Directive compliance policy",
      "Publish training data summary (using AI Office template)"
    ],
    openSource: "Open-weight GPAI models only need copyright compliance + training data summary (unless systemic risk)"
  },
  {
    id: "systemic",
    label: "Systemic risk GPAI providers",
    threshold: "Training compute ≥10²⁵ FLOPs, or designated by AI Office",
    obligations: [
      "All standard GPAI obligations above, PLUS:",
      "Model evaluations including adversarial testing",
      "Systemic risk assessment and mitigation",
      "Track, document and report serious incidents to AI Office within 2 weeks",
      "Adequate cybersecurity protection",
      "Notify Commission within 2 weeks if compute threshold is met"
    ],
    codeOfPractice: "GPAI Code of Practice (July 2025): voluntary adherence creates a presumption of conformity. Covers transparency, copyright, and safety/security.",
    penalty: "€15M or 3% of global annual turnover"
  }
]

export const EU_ROLES = [
  {
    role: "Provider",
    description: "Develops the AI system and places it on the EU market or puts it into service. Heaviest obligations.",
    whoQualifies: "Software companies, AI startups, in-house teams building AI for others, fine-tuners who substantially modify a base model",
    keyDuties: ["Technical documentation", "Conformity assessment", "CE marking", "Database registration", "Post-market monitoring", "QMS"]
  },
  {
    role: "Deployer",
    description: "Uses an AI system in a professional context. Must comply even if they did not build the system.",
    whoQualifies: "HR departments using AI screening tools, banks using AI credit scoring, hospitals using AI diagnostics",
    keyDuties: ["Assign human oversight", "Monitor system operation", "Report incidents to provider", "Fundamental rights impact assessment (public authorities)", "Maintain logs 6 months"]
  },
  {
    role: "Importer",
    description: "Places a third-country provider's AI system on the EU market.",
    whoQualifies: "EU-based distributors, resellers of non-EU AI products",
    keyDuties: ["Verify conformity assessment was done", "Verify CE marking", "Ensure provider has technical documentation", "10-year record-keeping"]
  },
  {
    role: "Distributor",
    description: "Makes an AI system available on the EU market without modifying it.",
    whoQualifies: "App stores, marketplaces distributing AI products",
    keyDuties: ["Verify CE marking and labelling", "Verify provider documentation in place", "Report non-compliant systems to market surveillance authorities"]
  }
]

// ─── UK FRAMEWORK DATA ───────────────────────────────────────────────────────
// Source: DSIT White Paper Response (Feb 2024), Implementing UK AI Regulatory Principles guidance

export const UK_PRINCIPLES = [
  {
    id: "safety",
    label: "Safety, security & robustness",
    icon: "🛡",
    color: "#1a5276",
    description: "AI systems should function in a safe, secure and robust way across their lifecycle.",
    keyQuestions: [
      "Have you identified and mitigated foreseeable risks of harm?",
      "Is your system resilient to adversarial attacks or unexpected inputs?",
      "Have you tested for failure modes and edge cases?",
      "Do you have incident detection and response processes?"
    ],
    regulators: ["HSE (workplace/industrial AI)", "MHRA (medical devices)", "CAA (aviation)", "DESNZ (energy)"],
    existingLaw: "Health & Safety at Work Act 1974, Product Safety Regulations, sector-specific safety legislation",
    dsitGuidance: "Regulators should publish sector-specific guidance on AI safety risks. Risk-proportionate approach: higher stakes = stricter expectations."
  },
  {
    id: "transparency",
    label: "Transparency & explainability",
    icon: "🔍",
    color: "#1a3a6e",
    description: "Appropriate transparency about AI systems and their decisions, with explanations where needed.",
    keyQuestions: [
      "Do users know they are interacting with AI?",
      "Can your system provide explanations of its decisions proportionate to their impact?",
      "Is information about your AI system publicly available?",
      "Do affected individuals receive meaningful information about automated decisions?"
    ],
    regulators: ["ICO (data protection)", "FCA (financial services)", "CQC (health/social care)"],
    existingLaw: "UK GDPR Article 22 (automated decision-making), DPA 2018, FCA Consumer Duty",
    dsitGuidance: "Explainability requirement scales with impact. High-stakes decisions require greater transparency. ICO has published AI and data protection guidance."
  },
  {
    id: "fairness",
    label: "Fairness",
    icon: "⚖",
    color: "#1e6b45",
    description: "AI should not generate unlawfully discriminatory outputs or perpetuate harmful biases.",
    keyQuestions: [
      "Have you tested for bias across protected characteristics?",
      "Are your training datasets representative?",
      "Do outcomes differ inequitably across demographic groups?",
      "Do you have processes to monitor and correct discrimination post-deployment?"
    ],
    regulators: ["EHRC (equality)", "ICO (data/algorithmic fairness)", "FCA (consumer duty, fair outcomes)"],
    existingLaw: "Equality Act 2010, UK GDPR, FCA Consumer Duty, Public Sector Equality Duty",
    dsitGuidance: "Existing equality law applies to AI decisions. Fairness testing and bias auditing are expected good practice, especially in high-stakes contexts."
  },
  {
    id: "accountability",
    label: "Accountability & governance",
    icon: "📋",
    color: "#7d3c98",
    description: "Clear governance structures and accountability for AI outcomes within organisations.",
    keyQuestions: [
      "Is there a named senior individual accountable for AI governance?",
      "Do you have an AI risk register?",
      "Are there clear policies covering AI procurement, development, and deployment?",
      "Are staff trained in AI governance and responsible use?"
    ],
    regulators: ["FCA/PRA (Senior Managers Regime)", "ICO (DPO obligations)", "CQC", "Ofcom"],
    existingLaw: "Companies Act 2006, Senior Managers & Certification Regime (SMCR), UK Corporate Governance Code",
    dsitGuidance: "Senior management ownership of AI risk is expected. Boards should understand and engage with AI-related risks. Moore Barlow (Sep 2025): AI risk register and audit trails recommended as baseline."
  },
  {
    id: "contestability",
    label: "Contestability & redress",
    icon: "🔄",
    color: "#b7770d",
    description: "People should have meaningful ability to challenge AI decisions and seek redress for harms.",
    keyQuestions: [
      "Can affected individuals find out how an AI decision was made?",
      "Is there a clear complaints and appeals process?",
      "Have you mapped applicable rights (subject access, human review)?",
      "Can your system pause automated decisions pending human review?"
    ],
    regulators: ["ICO (subject access rights)", "Financial Ombudsman", "Parliamentary Ombudsman", "Sector ombudsmen"],
    existingLaw: "UK GDPR Article 22 (right to human review of automated decisions), Consumer Rights Act 2015, Human Rights Act 1998",
    dsitGuidance: "Organisations should map existing redress mechanisms and ensure they are effective for AI-impacted decisions. New AI-specific rights may follow future legislation."
  }
]

export const UK_REGULATORS = [
  { name: "ICO", full: "Information Commissioner's Office", focus: "Data protection, algorithmic fairness, automated decision-making", ai_guidance: "Guidance on AI and data protection (2023), Explaining AI decisions" },
  { name: "FCA", full: "Financial Conduct Authority", focus: "Financial services AI: lending, trading, insurance, robo-advice", ai_guidance: "AI discussion paper (2022), Consumer Duty (2023)" },
  { name: "CMA", full: "Competition & Markets Authority", focus: "Competition impacts of AI, AI foundation models market study", ai_guidance: "Foundation Models review (2023–24)" },
  { name: "Ofcom", full: "Office of Communications", focus: "AI in media, broadcast, telecoms; Online Safety Act", ai_guidance: "AI in media guidance, Online Safety Act AI provisions" },
  { name: "MHRA", full: "Medicines & Healthcare products Regulatory Agency", focus: "AI medical devices, Software as a Medical Device (SaMD)", ai_guidance: "Software and AI as a Medical Device guidance" },
  { name: "HSE", full: "Health & Safety Executive", focus: "AI in industrial settings, workplace safety", ai_guidance: "Research on AI safety risks in workplaces" },
  { name: "CQC", full: "Care Quality Commission", focus: "AI in health and social care settings", ai_guidance: "AI in health and social care regulatory approach" },
  { name: "CAA", full: "Civil Aviation Authority", focus: "AI in aviation, autonomous systems", ai_guidance: "CAP 2262: Regulation of AI in aviation" },
  { name: "DSIT", full: "Dept for Science, Innovation & Technology", focus: "Central coordination, principles framework, AISI", ai_guidance: "White Paper response (Feb 2024), DSIT Implementing Principles Guidance" }
]

export const UK_COMPLIANCE_STEPS = [
  { step: 1, label: "Map your AI systems", detail: "Identify every AI system in use or development. Document its purpose, data inputs, outputs, and who is affected." },
  { step: 2, label: "Identify your regulators", detail: "Determine which sectoral regulators apply. Financial services → FCA. Health → MHRA/CQC. Employment → EHRC/ICO. Multiple regulators may apply simultaneously." },
  { step: 3, label: "Read sector-specific AI guidance", detail: "Each regulator has published or is publishing sector-specific AI guidance. These are your primary compliance targets, not a single UK AI Act." },
  { step: 4, label: "Apply the five principles", detail: "For each AI system, assess compliance with safety, transparency, fairness, accountability, and contestability. Document your assessment." },
  { step: 5, label: "Establish AI governance", detail: "Create an AI risk register. Assign board-level accountability. Develop an AI policy covering procurement, development, and deployment decisions." },
  { step: 6, label: "Ensure data protection compliance", detail: "UK GDPR applies whenever personal data is processed. Conduct DPIAs for high-risk AI. Review automated decision-making controls (Article 22)." },
  { step: 7, label: "Build audit trails", detail: "Document how AI systems function, how they were trained, what testing occurred, what monitoring is in place. These records are essential for regulator review." },
  { step: 8, label: "Consider EU AI Act dual compliance", detail: "If you operate in or affect the EU market, EU AI Act obligations apply regardless of where you are based. Consider building to the higher standard." }
]

// ─── COMPARISON DATA ─────────────────────────────────────────────────────────

export const COMPARISON = [
  { dimension: "Legal instrument", eu: "Binding Regulation — directly applicable law in all EU member states", uk: "Principles framework — non-statutory; regulators apply voluntary guidance", divergence: "high" },
  { dimension: "Scope", eu: "Applies to any provider or deployer whose system affects EU residents (extraterritorial)", uk: "Applies within UK-regulated sectors; no single overarching AI statute", divergence: "high" },
  { dimension: "Risk classification", eu: "Mandatory four-tier system (unacceptable / high / limited / minimal)", uk: "No mandated classification; each regulator determines risk proportionality", divergence: "high" },
  { dimension: "Conformity assessment", eu: "Mandatory pre-market conformity assessment for high-risk AI; CE marking required", uk: "No equivalent; sector regulators may require product approval processes", divergence: "high" },
  { dimension: "Enforcement body", eu: "EU AI Office (GPAI) + national market surveillance authorities (high-risk)", uk: "Existing sectoral regulators (FCA, ICO, CQC, etc.) — no single AI regulator", divergence: "medium" },
  { dimension: "Penalties", eu: "Up to €35M or 7% global turnover (prohibited); €15M or 3% (high-risk)", uk: "Existing regulator powers (e.g. ICO: up to £17.5M or 4% turnover under UK GDPR)", divergence: "medium" },
  { dimension: "GPAI / Foundation models", eu: "Dedicated Chapter V: transparency, copyright, systemic risk obligations", uk: "No equivalent legislation; voluntary agreements via AI Safety Institute", divergence: "high" },
  { dimension: "Transparency obligations", eu: "Specific transparency requirements for chatbots, deepfakes, AI-generated content", uk: "Principle-based; sector regulators (e.g. ICO) issue specific guidance", divergence: "medium" },
  { dimension: "Human oversight", eu: "Mandatory design requirement for high-risk AI systems", uk: "Expected under accountability and safety principles; no mandated design standard", divergence: "medium" },
  { dimension: "SME provisions", eu: "Reduced fees, simplified conformity, priority access to regulatory sandboxes", uk: "Proportionality expected but no formal SME carve-outs", divergence: "medium" },
  { dimension: "Data governance", eu: "Mandatory data quality and governance for high-risk AI training data", uk: "UK GDPR applies; no AI-specific data governance mandate beyond that", divergence: "medium" },
  { dimension: "Regulatory sandboxes", eu: "National authorities must offer AI regulatory sandboxes", uk: "DRCF AI & Digital Hub, FCA innovation sandbox; ad hoc rather than mandated", divergence: "low" },
  { dimension: "Post-market monitoring", eu: "Mandatory for high-risk providers: systematic data collection, incident reporting", uk: "Expected as good practice; existing sector obligations apply (e.g. FCA)", divergence: "medium" },
  { dimension: "AI literacy", eu: "Mandatory from Feb 2025: providers and deployers must ensure staff AI literacy", uk: "Encouraged but not mandated at national level; some regulators include in guidance", divergence: "high" },
  { dimension: "Isomorphism mechanism", eu: "Primarily coercive (legal mandate, penalties)", uk: "Primarily mimetic + normative (peer pressure, voluntary codes, regulator guidance)", divergence: "high" },
]

// ─── SELF-ASSESSMENT QUESTIONS ───────────────────────────────────────────────

export const ASSESSMENT_QUESTIONS = [
  {
    id: "q_role",
    section: "Your role",
    text: "What is your primary role in relation to AI?",
    type: "single",
    options: [
      { value: "provider", label: "Provider / developer — we build or substantially modify AI systems" },
      { value: "deployer", label: "Deployer — we use AI built by others in a professional context" },
      { value: "both", label: "Both — we build and deploy our own AI systems" },
      { value: "researcher", label: "Researcher / policy professional — assessing governance landscape" }
    ]
  },
  {
    id: "q_jurisdiction",
    section: "Jurisdiction",
    text: "Which regulatory jurisdiction applies to you?",
    type: "multi",
    options: [
      { value: "eu", label: "EU — we operate in or affect EU residents" },
      { value: "uk", label: "UK — we operate in or affect UK residents" },
      { value: "both_j", label: "Both EU and UK" }
    ]
  },
  {
    id: "q_prohibited_1",
    section: "Prohibited practices (EU Art. 5)",
    text: "Does your AI system use subliminal or deceptive techniques to manipulate behaviour, causing significant harm?",
    type: "yesno",
    risk: "unacceptable"
  },
  {
    id: "q_prohibited_2",
    section: "Prohibited practices (EU Art. 5)",
    text: "Does your AI system exploit vulnerabilities of specific groups (age, disability, socioeconomic status)?",
    type: "yesno",
    risk: "unacceptable"
  },
  {
    id: "q_prohibited_3",
    section: "Prohibited practices (EU Art. 5)",
    text: "Does your AI system perform social scoring of individuals for public authorities, causing detrimental treatment?",
    type: "yesno",
    risk: "unacceptable"
  },
  {
    id: "q_prohibited_4",
    section: "Prohibited practices (EU Art. 5)",
    text: "Does your AI system infer sensitive attributes (race, political views, religion, sexual orientation) from biometrics?",
    type: "yesno",
    risk: "unacceptable"
  },
  {
    id: "q_prohibited_5",
    section: "Prohibited practices (EU Art. 5)",
    text: "Does your AI system perform real-time remote biometric identification in public spaces for law enforcement (without the narrow legal exceptions)?",
    type: "yesno",
    risk: "unacceptable"
  },
  {
    id: "q_prohibited_6",
    section: "Prohibited practices (EU Art. 5)",
    text: "Does your AI system perform emotion recognition in workplaces or educational institutions (outside medical/safety use)?",
    type: "yesno",
    risk: "unacceptable"
  },
  {
    id: "q_high_1",
    section: "High-risk screening (Annex III)",
    text: "Does your system make or materially influence decisions about individuals' access to employment, promotion, or termination?",
    type: "yesno",
    risk: "high"
  },
  {
    id: "q_high_2",
    section: "High-risk screening (Annex III)",
    text: "Does your system evaluate creditworthiness, insurance risk, or determine access to essential public benefits/services?",
    type: "yesno",
    risk: "high"
  },
  {
    id: "q_high_3",
    section: "High-risk screening (Annex III)",
    text: "Does your system determine access to, or assessment within, educational or vocational training institutions?",
    type: "yesno",
    risk: "high"
  },
  {
    id: "q_high_4",
    section: "High-risk screening (Annex III)",
    text: "Is your system a safety component in critical infrastructure (energy, water, transport, digital infrastructure)?",
    type: "yesno",
    risk: "high"
  },
  {
    id: "q_high_5",
    section: "High-risk screening (Annex III)",
    text: "Is your system used in law enforcement, migration, asylum processing, or administration of justice?",
    type: "yesno",
    risk: "high"
  },
  {
    id: "q_high_6",
    section: "High-risk screening (Annex III)",
    text: "Does your system profile individuals (automated processing of personal data to assess behaviour, performance, location, etc.)?",
    type: "yesno",
    risk: "high"
  },
  {
    id: "q_limited_1",
    section: "Limited risk / transparency",
    text: "Does your system interact conversationally with users (chatbot, voice assistant, virtual agent)?",
    type: "yesno",
    risk: "limited"
  },
  {
    id: "q_limited_2",
    section: "Limited risk / transparency",
    text: "Does your system generate or manipulate images, audio, or video that could be mistaken for real content (deepfakes)?",
    type: "yesno",
    risk: "limited"
  },
  {
    id: "q_gpai_1",
    section: "GPAI model",
    text: "Is your system a general-purpose AI model capable of a wide range of tasks (e.g. a foundation model or large language model)?",
    type: "yesno",
    risk: "gpai"
  },
  {
    id: "q_gpai_2",
    section: "GPAI model",
    text: "Was your GPAI model trained using compute above 10²⁵ FLOPs, or has the AI Office classified it as systemic risk?",
    type: "yesno",
    risk: "gpai_systemic"
  }
]
