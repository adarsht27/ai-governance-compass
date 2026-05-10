import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.name}>AI Governance Compass</span>
          <span className={styles.sep}>·</span>
          <span className={styles.credit}>
            Built by{' '}
            <a href="https://www.linkedin.com/in/adarsht/" target="_blank" rel="noopener" className={styles.creditLink}>
              Adarsh Tripathi
            </a>
            {' '}— Public Policy / Data Science Candidate,{' '}
            <a href="https://www.hertie-school.org/en/" target="_blank" rel="noopener" className={styles.creditLink}>
              Hertie School
            </a>
            , Berlin
          </span>
        </div>
        <div className={styles.links}>
          <a href="https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence" target="_blank" rel="noopener">EU AI policy (European Commission)</a>
          <a href="https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach" target="_blank" rel="noopener">UK DSIT White Paper</a>
          <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener">EU AI Act (official text)</a>
        </div>
      </div>
      <div className={styles.inspiration}>
        Inspired by the EU AI Act resource published by the{' '}
        <a href="https://artificialintelligenceact.eu" target="_blank" rel="noopener">Future of Life Institute</a>.
        Last updated May 2026.
      </div>
    </footer>
  )
}
