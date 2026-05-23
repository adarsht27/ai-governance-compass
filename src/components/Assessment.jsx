import { useState } from 'react'
import styles from './Assessment.module.css'

// ─── OFFICIAL LINKS ──────────────────────────────────────────────────────────
const LINKS = {
  art3:        'https://artificialintelligenceact.eu/article/3/',
  art5:        'https://artificialintelligenceact.eu/article/5/',
  art6:        'https://artificialintelligenceact.eu/article/6/',
  art50:       'https://artificialintelligenceact.eu/article/50/',
  art51:       'https://artificialintelligenceact.eu/article/51/',
  art55:       'https://artificialintelligenceact.eu/article/55/',
  annexIII:    'https://artificialintelligenceact.eu/annex/3/',
  guideProhibited:   'https://ai-act-service-desk.ec.europa.eu/sites/default/files/2026-01/guide-prohibited_en.pdf',
  guideDefinition:   'https://ai-act-service-desk.ec.europa.eu/sites/default/files/2026-01/guide-definition_en.pdf',
  guideGPAI:         'https://ai-act-service-desk.ec.europa.eu/sites/default/files/2025-07/guidelines_on_the_scope_of_the_obligations_for_generalpurpose_ai_models_established_by_regulation_1cx2atxgq79us4n3x8jfgyy1qlm_118340-3.pdf',
  guideAISystem:     'https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application',
  guideProhibitedEC: 'https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act',
  gpaiGuidelines:    'https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers',
  gpaiTemplate:      'https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their',
  incidentGuidance:  'https://digital-strategy.ec.europa.eu/en/consultations/ai-act-commission-issues-draft-guidance-and-reporting-template-serious-ai-incidents-and-seeks',
  incidentTemplate:  'https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai-models',
  complianceChecker: 'https://ai-act-service-desk.ec.europa.eu/',
  aiOffice:          'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
  euSend:            'https://ec.europa.eu/newsroom/dae/redirection/document/118672',
}

// ─── QUESTIONS ───────────────────────────────────────────────────────────────
const QUESTIONS = [
  // Section 1 — Role
  {
    id: 'q_role', section: 'Your role', type: 'single',
    text: 'What is your primary role in relation to the AI system?',
    definition: 'Provider: develops or places AI on the market. Deployer: uses AI built by others in a professional context. Both roles carry distinct obligations under the AI Act.',
    defLink: LINKS.art3, defLinkLabel: 'Art. 3 — Definitions',
    depends: null,
    options: [
      { value: 'provider', label: 'Provider / developer — we build or substantially modify AI systems' },
      { value: 'deployer', label: 'Deployer — we use AI built by others in a professional context' },
      { value: 'both',     label: 'Both — we build and deploy our own AI systems' },
      { value: 'researcher', label: 'Researcher / policy professional — assessing the governance landscape' },
    ]
  },
  // Section 2 — Jurisdiction
  {
    id: 'q_jurisdiction', section: 'Jurisdiction', type: 'multi',
    text: 'Which regulatory jurisdiction applies to you?',
    definition: 'The EU AI Act applies extraterritorially — if your AI system affects EU residents, EU law applies regardless of where you are based. Similarly, the UK framework applies to UK-regulated sectors.',
    defLink: null, defLinkLabel: null,
    depends: null,
    options: [
      { value: 'eu',    label: 'EU — we operate in or affect EU residents' },
      { value: 'uk',    label: 'UK — we operate in or affect UK residents' },
      { value: 'both_j', label: 'Both EU and UK' },
    ]
  },
  // Section 3 — AI system definition
  {
    id: 'q_is_ai', section: 'AI system definition', type: 'single',
    text: 'Is your system an AI system within the meaning of the AI Act?',
    definition: 'An AI system is a machine-based system designed to operate with varying levels of autonomy, that infers from inputs how to generate outputs (predictions, recommendations, decisions) influencing physical or virtual environments. Simple rule-based software that only executes rules defined by humans does NOT qualify.',
    defLink: LINKS.guideAISystem, defLinkLabel: 'EC guidelines on AI system definition',
    depends: null,
    options: [
      { value: 'yes',     label: 'Yes — it meets the AI Act definition of an AI system' },
      { value: 'no',      label: 'No — it is rule-based software or does not meet the definition' },
      { value: 'unsure',  label: 'Unsure — I need to check further' },
    ]
  },
  // Section 4 — Prohibited practices
  {
    id: 'q_prohibited_1', section: 'Prohibited practices', type: 'yesno',
    text: 'Does your AI system use subliminal, manipulative, or deceptive techniques to influence behaviour in ways that cause or are likely to cause significant harm?',
    definition: 'This covers techniques that bypass rational agency — e.g. exploiting cognitive biases, using subliminal messaging, or creating false urgency. Harm must be significant. Ordinary advertising persuasion is not covered.',
    defLink: LINKS.guideProhibited, defLinkLabel: 'Official guide on prohibited practices (PDF)',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'unacceptable'
  },
  {
    id: 'q_prohibited_2', section: 'Prohibited practices', type: 'yesno',
    text: 'Does your AI system exploit vulnerabilities of specific groups — such as age, disability, or socioeconomic circumstances — to distort their behaviour?',
    definition: 'Targeting people whose circumstances make them unable to make fully informed decisions (e.g. children, people with cognitive disabilities, those in financial distress) in a way that causes harm is prohibited.',
    defLink: LINKS.art5, defLinkLabel: 'Art. 5 — Prohibited practices',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'unacceptable'
  },
  {
    id: 'q_prohibited_3', section: 'Prohibited practices', type: 'yesno',
    text: 'Does your AI system perform social scoring of individuals by public authorities, leading to detrimental or unfavourable treatment?',
    definition: 'Social scoring involves evaluating individuals over time based on social behaviour or personal characteristics and using that score to treat them differently in unrelated contexts. Only applies to public authorities.',
    defLink: LINKS.guideProhibited, defLinkLabel: 'Official guide on prohibited practices (PDF)',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'unacceptable'
  },
  {
    id: 'q_prohibited_4', section: 'Prohibited practices', type: 'yesno',
    text: 'Does your AI system infer sensitive attributes (race, political views, religion, sexual orientation, trade union membership) from biometric data?',
    definition: 'Biometric categorisation systems that infer protected characteristics from physical features, voice, gait, or other biometric data are prohibited. This does not cover lawful biometric verification (confirming an identity).',
    defLink: LINKS.art5, defLinkLabel: 'Art. 5 — Prohibited practices',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'unacceptable'
  },
  {
    id: 'q_prohibited_5', section: 'Prohibited practices', type: 'yesno',
    text: 'Does your AI system perform predictive policing based solely on profiling or personality traits, without objective evidence of criminal activity?',
    definition: 'AI that assesses individuals as likely to commit crimes based purely on their profile, characteristics, or past behaviour — without concrete evidence of actual activity — is prohibited.',
    defLink: LINKS.guideProhibitedEC, defLinkLabel: 'EC guidelines on prohibited practices',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'unacceptable'
  },
  {
    id: 'q_prohibited_6', section: 'Prohibited practices', type: 'yesno',
    text: 'Does your AI system compile facial recognition databases through untargeted scraping of facial images from the internet or CCTV footage?',
    definition: 'Mass, indiscriminate collection of biometric data to build recognition databases is prohibited regardless of purpose. Targeted searches with proper legal basis (e.g. finding a missing person) are treated separately.',
    defLink: LINKS.art5, defLinkLabel: 'Art. 5 — Prohibited practices',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'unacceptable'
  },
  {
    id: 'q_prohibited_7', section: 'Prohibited practices', type: 'yesno',
    text: 'Does your AI system perform emotion recognition in workplaces or educational institutions (outside medical or safety-justified uses)?',
    definition: 'Detecting and inferring emotions from facial expressions, voice, or other signals in professional or educational settings is prohibited. Exceptions exist for safety-critical use (e.g. detecting drowsy drivers) or medical diagnosis.',
    defLink: LINKS.art5, defLinkLabel: 'Art. 5 — Prohibited practices',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'unacceptable'
  },
  // Section 5 — High risk
  {
    id: 'q_high_1', section: 'High-risk screening', type: 'yesno',
    text: 'Does your system make or materially influence decisions about employment: CV screening, interview evaluation, promotion, task allocation, or termination?',
    definition: 'Annex III covers AI used in employment and worker management contexts where it materially affects people\'s working lives. Minor HR tools (e.g. scheduling) are not covered. "Materially influence" means a human would struggle to override the AI output in practice.',
    defLink: LINKS.annexIII, defLinkLabel: 'Annex III — High-risk uses',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'high'
  },
  {
    id: 'q_high_2', section: 'High-risk screening', type: 'yesno',
    text: 'Does your system determine or materially influence access to education, training institutions, or assessment of learning outcomes?',
    definition: 'Includes AI that screens applicants for schools or universities, grades student work, monitors exam behaviour, or determines what level of education a person is assigned to.',
    defLink: LINKS.annexIII, defLinkLabel: 'Annex III — High-risk uses',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'high'
  },
  {
    id: 'q_high_3', section: 'High-risk screening', type: 'yesno',
    text: 'Does your system evaluate creditworthiness, determine insurance risk, or determine access to essential public services or benefits?',
    definition: 'Credit scoring (excluding fraud detection), life/health insurance pricing, and AI determining eligibility for public benefits (housing, social support) are high-risk. Emergency call prioritisation systems are also included.',
    defLink: LINKS.annexIII, defLinkLabel: 'Annex III — High-risk uses',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'high'
  },
  {
    id: 'q_high_4', section: 'High-risk screening', type: 'yesno',
    text: 'Is your system a safety component in critical infrastructure — energy, water, transport, or digital infrastructure management?',
    definition: 'Only safety-critical components are covered — e.g. AI managing power grid stability, water treatment decisions, or railway signal control. General IT management or analytics tools for these sectors are not automatically high-risk.',
    defLink: LINKS.annexIII, defLinkLabel: 'Annex III — High-risk uses',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'high'
  },
  {
    id: 'q_high_5', section: 'High-risk screening', type: 'yesno',
    text: 'Is your system used in law enforcement, migration/asylum processing, or administration of justice?',
    definition: 'Includes AI for individual risk profiling in criminal investigations, evidence evaluation, asylum application processing, border risk assessment, or assisting judicial decisions. Narrow law enforcement exceptions may apply.',
    defLink: LINKS.annexIII, defLinkLabel: 'Annex III — High-risk uses',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'high'
  },
  {
    id: 'q_high_6', section: 'High-risk screening', type: 'yesno',
    text: 'Does your system perform biometric identification, categorisation, or emotion recognition in contexts covered by Annex III?',
    definition: 'Remote biometric identification systems (post-deployment or real-time in public spaces), and emotion recognition in covered contexts. Note: real-time remote biometric ID in public spaces by law enforcement is separately addressed under prohibited practices with narrow exceptions.',
    defLink: LINKS.annexIII, defLinkLabel: 'Annex III — High-risk uses',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'high'
  },
  {
    id: 'q_high_7', section: 'High-risk screening', type: 'yesno',
    text: 'Is your AI system embedded as a safety component in a regulated product — such as medical devices, machinery, vehicles, aircraft, railway systems, toys, or marine equipment — that requires third-party conformity assessment?',
    definition: 'Annex I covers AI embedded in products regulated by EU harmonisation legislation. Key categories: medical devices (MDR/IVDR), industrial machinery, motor vehicles and ADAS, aviation systems, railway control, toys with AI, and personal protective equipment. BOTH conditions must apply: (1) AI is a safety component of the product, AND (2) the product requires third-party conformity assessment. Compliance deadline is August 2027 — one year later than Annex III systems.',
    defLink: 'https://artificialintelligenceact.eu/annex/1/', defLinkLabel: 'Annex I — full product list',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'high_medical'
  },
  // Section 6 — Limited risk
  {
    id: 'q_limited_1', section: 'Limited risk / transparency', type: 'yesno',
    text: 'Does your system interact conversationally with users — chatbot, virtual agent, or voice assistant?',
    definition: 'Any system where a user might reasonably believe they are talking to a human must disclose its AI nature. This applies unless the context makes the AI nature obvious (e.g. a clearly labelled robot voice menu).',
    defLink: LINKS.art50, defLinkLabel: 'Art. 50 — Transparency obligations',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'limited'
  },
  {
    id: 'q_limited_2', section: 'Limited risk / transparency', type: 'yesno',
    text: 'Does your system generate or manipulate images, audio, or video that could be mistaken for real content (deepfakes)?',
    definition: 'Synthetic media must be clearly labelled as artificially generated or manipulated. Exception: legitimate creative, artistic, or satirical content where labelling would impair the work, provided fundamental rights are respected.',
    defLink: LINKS.art50, defLinkLabel: 'Art. 50 — Transparency obligations',
    depends: { id: 'q_is_ai', values: ['yes', 'unsure'] },
    risk: 'limited'
  },
  // Section 6b — UK workplace AI
  {
    id: 'q_uk_workplace', section: 'UK-specific risks', type: 'yesno',
    text: 'Does your AI system make or influence decisions about employees or job applicants — including hiring, performance evaluation, pay, or dismissal?',
    definition: 'In the UK, workplace AI must comply with the Equality Act 2010 (no discrimination across 9 protected characteristics), Employment Rights Act 1996 (unfair dismissal), and UK GDPR for employee data. The Data (Use and Access) Act 2025 also affects automated employment decisions. EHRC guidance specifically addresses algorithmic decision-making and discrimination.',
    defLink: 'https://www.equalityhumanrights.com/en/advice-and-guidance/artificial-intelligence', defLinkLabel: 'EHRC AI and equality guidance',
    depends: { id: 'q_jurisdiction', values: ['uk', 'both_j'] },
    risk: 'uk_workplace'
  },
  {
    id: 'q_uk_platform', section: 'UK-specific risks', type: 'yesno',
    text: 'Do you operate an online platform that uses AI to recommend, moderate, or generate content accessible to UK users?',
    definition: 'The Online Safety Act 2023 (Ofcom) applies to platforms using AI for content recommendation, moderation, or generation. Duties include tackling AI-generated illegal content, protecting children from harmful algorithmic recommendations, and (from Feb 2026) non-consensual deepfakes are criminal. The Data (Use and Access) Act 2025 also affects algorithmic accountability for services processing children\'s data.',
    defLink: 'https://www.ofcom.org.uk/online-safety', defLinkLabel: 'Ofcom — Online Safety Act guidance',
    depends: { id: 'q_jurisdiction', values: ['uk', 'both_j'] },
    risk: 'uk_platform'
  },
  // Section 7 — GPAI
  {
    id: 'q_gpai_1', section: 'General-purpose AI model', type: 'yesno',
    text: 'Is your system a general-purpose AI model — trained on broad data, capable of a wide range of tasks, and usable across multiple contexts?',
    definition: 'GPAI models are trained using large amounts of data and capable of general competence across diverse tasks — typical examples are large language models (LLMs) and multimodal foundation models. Models trained for a single specific task only (e.g. a spam classifier) are NOT GPAI models.',
    defLink: LINKS.guideGPAI, defLinkLabel: 'Official GPAI Guidelines (PDF)',
    depends: null,
    risk: 'gpai'
  },
  {
    id: 'q_gpai_2', section: 'General-purpose AI model', type: 'yesno',
    text: 'Was your GPAI model trained using compute at or above 10²⁵ FLOPs, or has the AI Office designated it as presenting systemic risk?',
    definition: '10²⁵ FLOPs (floating-point operations) is the threshold above which a GPAI model is presumed to present systemic risk. As of 2025, this covers only the largest frontier models (GPT-4 class and above). Providers may contest the designation. The AI Office can also independently classify models.',
    defLink: LINKS.art51, defLinkLabel: 'Art. 51 — Systemic risk classification',
    depends: { id: 'q_gpai_1', values: ['yes'] },
    risk: 'gpai_systemic'
  },
  {
    id: 'q_gpai_open', section: 'General-purpose AI model', type: 'yesno',
    text: 'Is your GPAI model open-weight — are the model weights, architecture, and usage information publicly available?',
    definition: 'Open-weight (open-source) GPAI models benefit from a partial exemption: they only need to comply with copyright policy and the training data summary requirement — unless they also present systemic risk. Fine-tuning or modifying an open-weight model may reinstate full obligations.',
    defLink: LINKS.guideGPAI, defLinkLabel: 'Official GPAI Guidelines (PDF)',
    depends: { id: 'q_gpai_1', values: ['yes'] },
    risk: 'gpai_open'
  },
]

// ─── DEPENDENCY LOGIC ────────────────────────────────────────────────────────
function isDisabled(q, answers) {
  if (!q.depends) return false
  const depAnswer = answers[q.depends.id]
  if (!depAnswer) return true
  if (Array.isArray(depAnswer)) return !depAnswer.some(v => q.depends.values.includes(v))
  return !q.depends.values.includes(depAnswer)
}

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
function InfoTip({ text, link, linkLabel }) {
  const [open, setOpen] = useState(false)
  return (
    <span className={styles.tipWrap}>
      <button
        type="button"
        className={styles.tipBtn}
        onClick={() => setOpen(o => !o)}
        aria-label="Show definition"
      >?</button>
      {open && (
        <div className={styles.tipBox}>
          <p className={styles.tipText}>{text}</p>
          {link && (
            <a href={link} target="_blank" rel="noopener" className={styles.tipLink}>
              {linkLabel} ↗
            </a>
          )}
          <button type="button" className={styles.tipClose} onClick={() => setOpen(false)}>✕</button>
        </div>
      )}
    </span>
  )
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
function Results({ answers, onReset }) {
  const flags = {
    eu: false, uk: false,
    unacceptable: false, high: false, high_medical: false, limited: false,
    gpai: false, gpai_systemic: false, gpai_open: false,
    uk_workplace: false, uk_platform: false,
    isAI: false,
  }
  answers.q_jurisdiction?.includes('eu') && (flags.eu = true)
  answers.q_jurisdiction?.includes('both_j') && (flags.eu = true) && (flags.uk = true)
  answers.q_jurisdiction?.includes('uk') && (flags.uk = true)
  ;['q_prohibited_1','q_prohibited_2','q_prohibited_3','q_prohibited_4','q_prohibited_5','q_prohibited_6','q_prohibited_7'].forEach(id => { if (answers[id] === 'yes') flags.unacceptable = true })
  ;['q_high_1','q_high_2','q_high_3','q_high_4','q_high_5','q_high_6'].forEach(id => { if (answers[id] === 'yes') flags.high = true })
  if (answers.q_high_7 === 'yes') flags.high_medical = true
  if (answers.q_uk_workplace === 'yes') flags.uk_workplace = true
  if (answers.q_uk_platform === 'yes') flags.uk_platform = true
  ;['q_limited_1','q_limited_2'].forEach(id => { if (answers[id] === 'yes') flags.limited = true })
  if (answers.q_gpai_1 === 'yes') flags.gpai = true
  if (answers.q_gpai_2 === 'yes') flags.gpai_systemic = true
  if (answers.q_gpai_open === 'yes') flags.gpai_open = true
  if (answers.q_is_ai === 'yes' || answers.q_is_ai === 'unsure') flags.isAI = true

  return (
    <div className={`${styles.results} fade-in`}>
      <div className={styles.resultsHeader}>
        <h3 className={styles.resultsTitle}>Your compliance profile</h3>
        <button className={styles.resetBtn} onClick={onReset}>← Start over</button>
      </div>

      <div className={styles.jurisdictions}>
        {flags.eu && <span className="badge badge-eu">EU AI Act applies</span>}
        {flags.uk && <span className="badge badge-uk">UK Framework applies</span>}
        {!flags.eu && !flags.uk && <span className="badge badge-warn">No jurisdiction selected</span>}
        {!flags.isAI && <span className="badge" style={{background:'var(--green-light)',color:'var(--green)',border:'1px solid var(--green-mid)'}}>System may be outside AI Act scope</span>}
      </div>

      {/* Prohibited */}
      {flags.unacceptable && (
        <div className={`${styles.oblCard} ${styles.danger}`}>
          <div className={styles.oblLabel}>⊗ PROHIBITED PRACTICE DETECTED</div>
          <div className={styles.oblDetail}>
            Your answers indicate a practice banned under <a href={LINKS.art5} target="_blank" rel="noopener">Article 5</a>. You must cease this use immediately.
            Penalties: up to <strong>€35M or 7% of global annual turnover</strong>.
          </div>
          <div className={styles.oblLinks}>
            <a href={LINKS.guideProhibited} target="_blank" rel="noopener">Official prohibited practices guide (PDF) ↗</a>
            <a href={LINKS.guideProhibitedEC} target="_blank" rel="noopener">EC guidelines on prohibited practices ↗</a>
          </div>
        </div>
      )}

      {/* EU obligations */}
      {flags.eu && (
        <div className={styles.section}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>EU AI Act — your obligations</p>

          {flags.gpai_systemic && (
            <div className={`${styles.oblCard} ${styles.danger}`}>
              <div className={styles.oblLabel}>GPAI — Systemic risk obligations <a href={LINKS.art55} target="_blank" rel="noopener" className={styles.artLink}>Art. 55 ↗</a></div>
              <div className={styles.oblDetail}>
                All standard GPAI obligations apply, PLUS: model evaluations and adversarial testing, systemic risk assessment and mitigation,
                serious incident reporting to the AI Office within 2 weeks, cybersecurity protection measures.
                Notify the Commission within 2 weeks of exceeding the 10²⁵ FLOPs threshold.
              </div>
              <div className={styles.oblLinks}>
                <a href={LINKS.guideGPAI} target="_blank" rel="noopener">GPAI Guidelines ↗</a>
                <a href={LINKS.incidentGuidance} target="_blank" rel="noopener">Serious incident guidance ↗</a>
                <a href={LINKS.incidentTemplate} target="_blank" rel="noopener">Incident reporting template ↗</a>
                <a href={LINKS.aiOffice} target="_blank" rel="noopener">AI Office ↗</a>
                <a href={LINKS.euSend} target="_blank" rel="noopener">EU SEND submission platform ↗</a>
              </div>
            </div>
          )}

          {flags.gpai && !flags.gpai_systemic && (
            <div className={`${styles.oblCard} ${styles.warn}`}>
              <div className={styles.oblLabel}>
                GPAI — Standard obligations (from Aug 2025)
                <a href={LINKS.art51} target="_blank" rel="noopener" className={styles.artLink}>Art. 51 ↗</a>
                {flags.gpai_open && <span className={styles.openBadge}>Open-weight: reduced obligations</span>}
              </div>
              <div className={styles.oblDetail}>
                {flags.gpai_open
                  ? 'As an open-weight provider, your obligations are reduced: (1) copyright compliance policy and (2) training data public summary — unless your model also presents systemic risk.'
                  : 'Technical documentation of training process and evaluation results, information for downstream providers on capabilities and limitations, Copyright Directive compliance policy, and training data public summary using the AI Office template.'
                }
              </div>
              <div className={styles.oblLinks}>
                <a href={LINKS.guideGPAI} target="_blank" rel="noopener">GPAI Guidelines (PDF) ↗</a>
                <a href={LINKS.gpaiTemplate} target="_blank" rel="noopener">Training data summary template ↗</a>
                <a href={LINKS.gpaiGuidelines} target="_blank" rel="noopener">EC GPAI obligations page ↗</a>
              </div>
            </div>
          )}

          {flags.high && (
            <div className={`${styles.oblCard} ${styles.warn}`}>
              <div className={styles.oblLabel}>
                High-risk AI obligations (from Aug 2026)
                <a href={LINKS.art6} target="_blank" rel="noopener" className={styles.artLink}>Art. 6 ↗</a>
                <a href={LINKS.annexIII} target="_blank" rel="noopener" className={styles.artLink}>Annex III ↗</a>
              </div>
              <div className={styles.oblDetail}>
                <strong>As provider:</strong> Risk management system, data governance, technical documentation, automatic logging,
                instructions for use, human oversight design, accuracy/robustness/cybersecurity, quality management system,
                conformity assessment, EU declaration of conformity, CE marking, EU database registration, post-market monitoring.
                <br /><br />
                <strong>As deployer:</strong> Assign qualified human oversight, use system only per instructions, monitor and suspend if risks detected,
                maintain system-generated logs for at least 6 months, report serious incidents to provider.
                Public authority deployers must also conduct a <strong>Fundamental Rights Impact Assessment</strong> before deployment.
              </div>
              <div className={styles.oblLinks}>
                <a href={LINKS.complianceChecker} target="_blank" rel="noopener">EU AI Act Compliance Checker (official) ↗</a>
                <a href={LINKS.annexIII} target="_blank" rel="noopener">Annex III — full list of high-risk uses ↗</a>
              </div>
            </div>
          )}

          {flags.high_medical && (
            <div className={`${styles.oblCard} ${styles.warn}`}>
              <div className={styles.oblLabel}>
                Annex I product — high-risk (from Aug 2027)
                <a href="https://artificialintelligenceact.eu/annex/1/" target="_blank" rel="noopener" className={styles.artLink}>Annex I ↗</a>
              </div>
              <div className={styles.oblDetail}>
                Your AI system is embedded as a safety component in a product covered by EU harmonisation legislation (Annex I).
                This triggers high-risk status via a different route than Annex III — through the product's existing sector regulation
                (e.g. MDR for medical devices, Machinery Regulation for industrial equipment, type-approval for vehicles).
                The same high-risk obligations apply (risk management, technical documentation, conformity assessment, CE marking)
                but the compliance deadline is <strong>August 2027</strong> — one year later than Annex III systems.
                You may be able to integrate AI Act conformity assessment into your existing product conformity process to avoid duplication.
                The <strong>Cyber Resilience Act (Dec 2027)</strong> adds further cybersecurity requirements for AI-embedded products.
                <br /><br />
                <strong>Medical devices specifically:</strong> MHRA regulates Software as a Medical Device (SaMD) in the UK.
                <strong>Machinery:</strong> New Machinery Regulation (EU) 2023/1230 applies from Jan 2027, with AI Act interplay clarified by the Digital Omnibus.
              </div>
              <div className={styles.oblLinks}>
                <a href="https://www.mhra.gov.uk/about-us/centre-of-excellence-software-and-ai-medical-devices" target="_blank" rel="noopener">MHRA — Software &amp; AI as Medical Device ↗</a>
                <a href="https://artificialintelligenceact.eu/annex/1/" target="_blank" rel="noopener">EU AI Act Annex I ↗</a>
                <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0745" target="_blank" rel="noopener">EU MDR 2017/745 ↗</a>
              </div>
            </div>
          )}

          {flags.limited && !flags.high && (
            <div className={`${styles.oblCard} ${styles.info}`}>
              <div className={styles.oblLabel}>
                Limited risk — Transparency obligations
                <a href={LINKS.art50} target="_blank" rel="noopener" className={styles.artLink}>Art. 50 ↗</a>
              </div>
              <div className={styles.oblDetail}>
                Disclose AI nature clearly to users interacting with chatbots or virtual agents.
                Label AI-generated or manipulated images, audio, and video (deepfakes).
                Label AI-generated text published to inform the public on matters of public interest.
              </div>
            </div>
          )}

          {!flags.unacceptable && !flags.high && !flags.limited && !flags.gpai && (
            <div className={`${styles.oblCard} ${styles.ok}`}>
              <div className={styles.oblLabel}>✓ Minimal / no risk</div>
              <div className={styles.oblDetail}>
                No specific EU AI Act obligations apply to your system. Voluntary codes of conduct are encouraged.
                General product safety law, sector-specific regulations, and EU GDPR remain applicable.
              </div>
            </div>
          )}
        </div>
      )}

      {/* UK obligations */}
      {flags.uk && (
        <div className={styles.section}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>UK Framework — your compliance steps</p>
          <ul className={styles.ukList}>
            {[
              'Identify which sectoral regulators apply (FCA, ICO, CQC, HSE, Ofcom, MHRA, CAA — multiple may apply simultaneously)',
              'Read your sector regulator\'s AI-specific guidance — this is your primary compliance target, not a single UK AI Act',
              'Apply the five DSIT principles to your system: safety & robustness, transparency & explainability, fairness, accountability & governance, contestability & redress',
              'Assess compliance with UK GDPR Article 22 if your system makes or substantially influences automated decisions about individuals',
              'Establish an AI risk register and assign named board-level accountability for AI outcomes',
              'Document your system: purpose, data sources, testing results, human oversight mechanisms, and monitoring processes',
              'Ensure individuals affected by AI decisions have access to meaningful explanations and a clear redress pathway',
              flags.high || flags.eu ? 'You are subject to EU AI Act obligations — building to that standard will satisfy UK principles too (Brussels Effect applies)' : null,
            ].filter(Boolean).map((s, i) => (
              <li key={i} className={styles.ukStep}>
                <span className={styles.stepNum}>{i + 1}</span>{s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Official resources */}
      {/* UK-specific risks */}
      {flags.uk && (flags.uk_workplace || flags.uk_platform) && (
        <div className={styles.section}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>UK-specific obligations</p>

          {flags.uk_workplace && (
            <div className={`${styles.oblCard} ${styles.warn}`}>
              <div className={styles.oblLabel}>Workplace AI — Equality Act &amp; Employment Rights</div>
              <div className={styles.oblDetail}>
                AI making or influencing employment decisions must comply with the <strong>Equality Act 2010</strong> —
                any discriminatory outcome across 9 protected characteristics (age, disability, race, sex, religion, etc.)
                is unlawful even without discriminatory intent. The <strong>Employment Rights Act 1996</strong> protects
                against unfair dismissal driven by AI recommendations. UK GDPR applies to employee data processing.
                The <strong>Data (Use and Access) Act 2025</strong> affects automated employment decision rules
                and introduces a new complaints procedure for individuals.
              </div>
              <div className={styles.oblLinks}>
                <a href="https://www.equalityhumanrights.com/en/advice-and-guidance/artificial-intelligence" target="_blank" rel="noopener">EHRC AI guidance ↗</a>
                <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/" target="_blank" rel="noopener">ICO AI &amp; data protection ↗</a>
              </div>
            </div>
          )}

          {flags.uk_platform && (
            <div className={`${styles.oblCard} ${styles.info}`}>
              <div className={styles.oblLabel}>Online platform — Online Safety Act 2023</div>
              <div className={styles.oblDetail}>
                As a platform using AI for content recommendation, moderation, or generation, you are subject to
                <strong> Online Safety Act 2023</strong> duties enforced by Ofcom. You must proactively tackle
                AI-generated illegal content, risk-assess algorithmic recommendation systems, and apply enhanced
                protections for children. From <strong>February 2026</strong>, creating non-consensual AI-generated
                intimate images (deepfakes) is a criminal offence. Non-compliance with Ofcom notices can result in
                fines of up to <strong>£18M or 10% of global annual turnover</strong>.
              </div>
              <div className={styles.oblLinks}>
                <a href="https://www.ofcom.org.uk/online-safety" target="_blank" rel="noopener">Ofcom Online Safety guidance ↗</a>
                <a href="https://www.legislation.gov.uk/ukpga/2023/50/contents" target="_blank" rel="noopener">Online Safety Act 2023 ↗</a>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.resourcesBox}>
        <p className="section-label" style={{ marginBottom: '0.75rem' }}>Official support resources</p>
        <div className={styles.resourcesGrid}>
          <a href={LINKS.complianceChecker} target="_blank" rel="noopener" className={styles.resourceCard}>
            <div className={styles.resourceLabel}>EU AI Act Compliance Checker</div>
            <div className={styles.resourceDesc}>Official beta tool from the AI Act Service Desk — check obligations for your specific system step by step</div>
          </a>
          <a href={LINKS.aiOffice} target="_blank" rel="noopener" className={styles.resourceCard}>
            <div className={styles.resourceLabel}>AI Office</div>
            <div className={styles.resourceDesc}>European Commission body overseeing GPAI model compliance and coordinating AI Act enforcement</div>
          </a>
          <a href={LINKS.guideDefinition} target="_blank" rel="noopener" className={styles.resourceCard}>
            <div className={styles.resourceLabel}>AI system definition guide (PDF)</div>
            <div className={styles.resourceDesc}>Official guidance on whether your system meets the AI Act's definition of an AI system</div>
          </a>
          <a href={LINKS.guideProhibited} target="_blank" rel="noopener" className={styles.resourceCard}>
            <div className={styles.resourceLabel}>Prohibited practices guide (PDF)</div>
            <div className={styles.resourceDesc}>Detailed official guidance on all seven categories of prohibited AI under Article 5</div>
          </a>
          <a href={LINKS.guideGPAI} target="_blank" rel="noopener" className={styles.resourceCard}>
            <div className={styles.resourceLabel}>GPAI model obligations (PDF)</div>
            <div className={styles.resourceDesc}>Full guidelines on scope of obligations for general-purpose AI model providers</div>
          </a>
          <a href={LINKS.incidentGuidance} target="_blank" rel="noopener" className={styles.resourceCard}>
            <div className={styles.resourceLabel}>Serious incident reporting guidance</div>
            <div className={styles.resourceDesc}>Draft Commission guidance and reporting template for serious AI incidents</div>
          </a>
        </div>
      </div>

      <div className={styles.disclaimer}>
        This self-assessment is for educational purposes only and does not constitute legal advice.
        Classification under the EU AI Act requires detailed legal and technical analysis.
        For your specific situation, use the <a href={LINKS.complianceChecker} target="_blank" rel="noopener">official EU Compliance Checker</a> and
        consult qualified legal counsel.
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Assessment() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const setAnswer = (qid, val) => setAnswers(prev => ({ ...prev, [qid]: val }))
  const toggleMulti = (qid, val) => setAnswers(prev => {
    const cur = prev[qid] || []
    return { ...prev, [qid]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] }
  })

  const sections = [...new Set(QUESTIONS.map(q => q.section))]

  const allAnswered = QUESTIONS.every(q => {
    if (isDisabled(q, answers)) return true
    if (q.type === 'multi') return (answers[q.id] || []).length > 0
    return answers[q.id] !== undefined
  })

  if (submitted) return <Results answers={answers} onReset={() => { setAnswers({}); setSubmitted(false) }} />

  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.pageHeader}>
        <p className="section-label">Interactive tool</p>
        <h2 className={styles.heading}>Self-Assessment Questionnaire</h2>
        <p className={styles.subhead}>
          Answer these questions about your AI system to generate a tailored compliance checklist.
          Questions greyed out depend on earlier answers — complete those first.
          Each question includes a <strong>?</strong> button with an official definition and source link.
        </p>
      </div>

      <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} noValidate>
        {sections.map(section => {
          const qs = QUESTIONS.filter(q => q.section === section)
          return (
            <div key={section} className={styles.sectionBlock}>
              <div className={styles.sectionTitle}>{section}</div>
              {qs.map(q => {
                const disabled = isDisabled(q, answers)
                return (
                  <div key={q.id} className={`${styles.questionBlock} ${disabled ? styles.questionDisabled : ''}`}>
                    <div className={styles.qHeader}>
                      <p className={styles.qText}>{q.text}</p>
                      {q.definition && (
                        <InfoTip text={q.definition} link={q.defLink} linkLabel={q.defLinkLabel} />
                      )}
                    </div>
                    {disabled && <p className={styles.disabledNote}>Answer the previous question to unlock this one</p>}

                    {!disabled && q.type === 'single' && (
                      <div className={styles.optionList}>
                        {q.options.map(opt => (
                          <label key={opt.value} className={`${styles.option} ${answers[q.id] === opt.value ? styles.optionSelected : ''}`}>
                            <input type="radio" name={q.id} value={opt.value}
                              checked={answers[q.id] === opt.value}
                              onChange={() => setAnswer(q.id, opt.value)} />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    )}
                    {!disabled && q.type === 'multi' && (
                      <div className={styles.optionList}>
                        {q.options.map(opt => (
                          <label key={opt.value} className={`${styles.option} ${(answers[q.id] || []).includes(opt.value) ? styles.optionSelected : ''}`}>
                            <input type="checkbox" value={opt.value}
                              checked={(answers[q.id] || []).includes(opt.value)}
                              onChange={() => toggleMulti(q.id, opt.value)} />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    )}
                    {!disabled && q.type === 'yesno' && (
                      <div className={styles.yesnoRow}>
                        {['yes', 'no', 'unsure'].map(val => (
                          <label key={val} className={`${styles.yesno} ${answers[q.id] === val ? styles[`yn_${val}`] : ''}`}>
                            <input type="radio" name={q.id} value={val}
                              checked={answers[q.id] === val}
                              onChange={() => setAnswer(q.id, val)} />
                            {val === 'yes' ? 'Yes' : val === 'no' ? 'No' : 'Unsure'}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}

        <button type="submit"
          className={`${styles.submitBtn} ${!allAnswered ? styles.submitDisabled : ''}`}
          disabled={!allAnswered}>
          Generate my compliance checklist →
        </button>
        {!allAnswered && <p className={styles.requiredNote}>Please answer all unlocked questions to continue.</p>}
      </form>
    </div>
  )
}
