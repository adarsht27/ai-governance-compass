import styles from './Hero.module.css'

const CARDS = [
  { id: 'eu_risk', icon: '▲', color: 'eu', label: 'EU Risk Tiers', desc: 'Unacceptable, high, limited, and minimal risk — obligations, Annex III uses, and penalties' },
  { id: 'gpai', icon: '◈', color: 'eu', label: 'GPAI Models', desc: 'General-purpose AI obligations, systemic risk thresholds, and the Code of Practice' },
  { id: 'uk', icon: '⚖', color: 'uk', label: 'UK Framework', desc: 'Five cross-sectoral principles, sector regulators, and compliance steps' },
  { id: 'compare', icon: '⟷', color: 'both', label: 'EU vs UK', desc: 'Side-by-side comparison of 15 governance dimensions with divergence analysis' },
  { id: 'timeline', icon: '◷', color: 'eu', label: 'Timeline', desc: 'Key enforcement dates from Feb 2025 through to Dec 2030' },
  { id: 'assess', icon: '⚡', color: 'assess', label: 'Self-Assessment', desc: 'Answer questions about your AI system to get a tailored compliance checklist' },
]

export default function Hero({ onNavigate }) {
  return (
    <div className={`${styles.hero} fade-in`}>
      <div className={styles.eyebrow}>
        <span className="badge badge-eu">Regulation (EU) 2024/1689</span>
        <span className="badge badge-uk">UK DSIT Framework 2024</span>
        <span className="badge badge-warn">Updated May 2026</span>
      </div>

      <h1 className={styles.heading}>
        Navigate AI governance<br />
        <em>across the EU and UK</em>
      </h1>

      <p className={styles.lead}>
        An interactive reference tool for understanding the EU AI Act's compliance obligations and
        the UK's principles-based framework. Built for researchers, policy professionals, and
        organisations assessing their AI governance posture.
      </p>

      <div className={styles.grid}>
        {CARDS.map(card => (
          <button
            key={card.id}
            className={`${styles.card} ${styles[card.color]}`}
            onClick={() => onNavigate(card.id)}
          >
            <span className={styles.cardIcon}>{card.icon}</span>
            <div className={styles.cardLabel}>{card.label}</div>
            <div className={styles.cardDesc}>{card.desc}</div>
          </button>
        ))}
      </div>

      <div className={styles.disclaimer}>
        <strong>For educational and research purposes only.</strong> This tool synthesises publicly available
        regulatory guidance and does not constitute legal advice. Always consult the source regulation
        and qualified legal counsel for compliance decisions.
        <br />
        Sources:{' '}
        <a href="https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence" target="_blank" rel="noopener">European Commission — AI policy</a>{' · '}
        <a href="https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach" target="_blank" rel="noopener">UK DSIT White Paper</a>{' · '}
        <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener">EU AI Act (official text)</a>
      </div>
    </div>
  )
}
