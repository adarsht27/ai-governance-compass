import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.name}>AI Governance Compass</span>
          <span className={styles.sep}>·</span>
          <span className={styles.credit}>Built by Adarsh — MPP/Data Science, Hertie School Berlin</span>
        </div>
        <div className={styles.links}>
          <a href="https://artificialintelligenceact.eu" target="_blank" rel="noopener">EU AI Act source</a>
          <a href="https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach" target="_blank" rel="noopener">UK DSIT White Paper</a>
          <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener">European Commission</a>
        </div>
      </div>
      <div className={styles.disclaimer}>
        For educational and research purposes only. Not legal advice. Last updated May 2026.
        Content reflects Regulation (EU) 2024/1689 and UK DSIT guidance as of this date.
      </div>
    </footer>
  )
}
