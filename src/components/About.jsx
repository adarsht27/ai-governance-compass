import styles from './About.module.css'

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Structured regulatory data',
    desc: 'All content is drawn directly from primary sources — Regulation (EU) 2024/1689 and UK DSIT guidance — and structured into a single data file (governance.js). No external API calls, no dynamic fetching.'
  },
  {
    step: '02',
    title: 'Component-based architecture',
    desc: 'Built in React with Vite. Each tab (EU Risk Tiers, GPAI, UK Framework, etc.) is an independent component reading from the shared data file. CSS Modules keep styles scoped and conflict-free.'
  },
  {
    step: '03',
    title: 'Analytical framing from research',
    desc: 'The EU vs UK comparison is structured around institutional isomorphism theory — the same theoretical anchor used in the underlying thesis research. The divergence labels (coercive, mimetic, normative) reflect that academic framing.'
  },
  {
    step: '04',
    title: 'Static deployment',
    desc: 'Built to a static dist/ folder and deployed to GitHub Pages via gh-pages. Zero server costs, zero maintenance overhead. The entire tool runs in the browser.'
  },
]

const THESIS_DIMENSIONS = [
  { label: 'D1 — Formalisation', desc: 'How AI governance is documented: binding procedures vs. communication-style position papers' },
  { label: 'D2 — Risk-responsiveness', desc: 'How organisations identify and respond to AI-specific risks across their lifecycle' },
  { label: 'D3 — Role differentiation', desc: 'How accountability for AI is distributed across teams and seniority levels' },
  { label: 'D4 — Contextual factors', desc: 'Organisational size, sector, and prior regulatory experience as moderating variables' },
]

export default function About({ onNavigate }) {
  return (
    <div className={`${styles.wrap} fade-in`}>

      {/* Developer section */}
      <div className={styles.developerSection}>
        <div className={styles.photoPlaceholder}>
          <span className={styles.photoInitials}>AT</span>
          <span className={styles.photoNote}>Photo coming soon</span>
        </div>
        <div className={styles.developerInfo}>
          <p className="section-label">About the developer</p>
          <h2 className={styles.name}>Adarsh Tripathi</h2>
          <p className={styles.title}>
            Public Policy &amp; Data Science Candidate ·{' '}
            <a href="https://www.hertie-school.org/en/" target="_blank" rel="noopener">Hertie School</a>
            , Berlin
          </p>
          <div className={styles.links}>
            <a href="https://www.linkedin.com/in/adarsht/" target="_blank" rel="noopener" className={styles.linkBtn}>
              LinkedIn ↗
            </a>
          </div>
          <p className={styles.bio}>
            I am a graduate student at the Hertie School of Governance in Berlin, where I study
            the intersection of public policy and data science. My academic work focuses on how
            institutions respond to emerging technology — specifically, how regulatory frameworks
            shape organisational behaviour around AI.
          </p>
          <p className={styles.bio}>
            Before Hertie, I worked across policy and research contexts that brought me into regular
            contact with questions about how governance structures adapt — or fail to adapt — to
            technological change. That thread runs through my thesis and into this tool.
          </p>
        </div>
      </div>

      <div className="divider" />

      {/* Thesis connection */}
      <div className={styles.section}>
        <p className="section-label">The research behind this tool</p>
        <h3 className={styles.sectionHeading}>From thesis to tool</h3>
        <p className={styles.sectionText}>
          This tool grew directly out of my master's thesis, submitted in April 2026 under the
          supervision of{' '}
          <a href="https://www.hertie-school.org/en/who-we-are/profile/person/stockmann" target="_blank" rel="noopener">
            Prof. Daniela Stockmann
          </a>{' '}
          at the Hertie School.
        </p>
        <div className={styles.thesisCard}>
          <div className={styles.thesisLabel}>Thesis research question</div>
          <p className={styles.thesisQuestion}>
            "How do organisations in Germany and the United Kingdom differ in their internal AI governance
            structures, and to what extent do divergent regulatory frameworks — the EU AI Act versus the
            UK's principles-based approach — account for these differences?"
          </p>
        </div>
        <p className={styles.sectionText}>
          The thesis uses a <strong>Most Similar Systems Design (MSSD)</strong> comparing ten firms —
          five German (SAP, Deutsche Telekom, Allianz, Bosch, Mercedes-Benz) and five UK
          (GSK, HSBC, BT Group, Lloyds Banking Group, Unilever) — across four analytical dimensions.
          Analysis draws on qualitative document coding in MaxQDA and semi-structured expert interviews.
        </p>

        <div className={styles.dimensionGrid}>
          {THESIS_DIMENSIONS.map((d, i) => (
            <div key={i} className={styles.dimensionCard}>
              <div className={styles.dimensionLabel}>{d.label}</div>
              <p className={styles.dimensionDesc}>{d.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.findingBox}>
          <div className={styles.findingLabel}>Core empirical finding</div>
          <p className={styles.findingText}>
            The key difference between German and UK firms is not <em>how much</em> governance they
            have, but <em>what kind</em>. German firms exhibit <strong>governance-as-procedure</strong> —
            binding, operational, AI-specific documents. UK firms exhibit <strong>governance-as-communication</strong> —
            principles statements, position papers, and integrated disclosures. This distinction maps
            directly onto the regulatory logics each framework creates: coercive isomorphism in the EU
            versus mimetic and normative isomorphism in the UK.
          </p>
        </div>

        <p className={styles.sectionText}>
          The theoretical anchor is DiMaggio and Powell's (1983) institutional isomorphism framework.
          You will find this framing throughout the tool — most explicitly in the{' '}
          <button className={styles.inlineLink} onClick={() => onNavigate('compare')}>EU vs UK comparison tab</button>,
          where each governance dimension is labelled by the type of isomorphic pressure it reflects.
        </p>
      </div>

      <div className="divider" />

      {/* How it works */}
      <div className={styles.section}>
        <p className="section-label">Technical</p>
        <h3 className={styles.sectionHeading}>How this tool works</h3>
        <p className={styles.sectionText}>
          A deliberately simple stack — the goal was a tool that is easy to maintain, free to host,
          and fast to load. No backend, no database, no subscriptions.
        </p>
        <div className={styles.howGrid}>
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className={styles.howCard}>
              <div className={styles.howStep}>{item.step}</div>
              <div className={styles.howTitle}>{item.title}</div>
              <p className={styles.howDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.stackRow}>
          {['React 18', 'Vite 5', 'CSS Modules', 'GitHub Pages', 'gh-pages'].map(s => (
            <span key={s} className={styles.stackBadge}>{s}</span>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Scope and limits */}
      <div className={styles.section}>
        <p className="section-label">Scope &amp; limitations</p>
        <h3 className={styles.sectionHeading}>What this tool is and is not</h3>
        <div className={styles.scopeGrid}>
          <div className={styles.scopeCard}>
            <div className={styles.scopeTitle} style={{ color: 'var(--green)' }}>✓ What it is</div>
            <ul className={styles.scopeList}>
              <li>An educational reference for researchers and policy professionals</li>
              <li>A structured synthesis of publicly available regulatory guidance</li>
              <li>A demonstration of how institutional theory applies to AI governance</li>
              <li>A practical starting point for organisations mapping their compliance landscape</li>
            </ul>
          </div>
          <div className={styles.scopeCard}>
            <div className={styles.scopeTitle} style={{ color: 'var(--eu-red)' }}>✗ What it is not</div>
            <ul className={styles.scopeList}>
              <li>Legal advice — always consult qualified legal counsel</li>
              <li>A substitute for reading the primary regulation</li>
              <li>A complete compliance audit — sector-specific rules always apply on top</li>
              <li>A real-time updated source — content reflects May 2026 guidance</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
