import { GPAI_TIERS } from '../data/governance.js'
import styles from './GPAIExplorer.module.css'

export default function GPAIExplorer() {
  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.pageHeader}>
        <p className="section-label">EU AI Act — Chapter V</p>
        <h2 className={styles.heading}>General-Purpose AI (GPAI) Models</h2>
        <p className={styles.subhead}>
          GPAI models sit outside the four-tier risk system and have their own dedicated obligations.
          Rules applied from 2 August 2025.
        </p>
      </div>

      <div className={styles.definition}>
        <p className="section-label">Definition</p>
        <p className={styles.defText}>
          A GPAI model is any AI model trained using <strong>more than 10²³ FLOPs</strong> (floating point operations)
          that displays significant generality and is capable of competently performing a wide range of
          distinct tasks, and can be integrated into a variety of downstream systems. This does not cover
          models used only for research, development, and prototyping before market release.
        </p>
        <div className={styles.openSourceNote}>
          <strong>Open-weight / open-source exception:</strong> GPAI models whose parameters (weights, architecture, usage) are publicly available
          only need to comply with <em>copyright policy</em> and <em>training data summary</em> — unless they also present systemic risk.
        </div>
      </div>

      <div className={styles.tiers}>
        {GPAI_TIERS.map((tier, i) => (
          <div key={tier.id} className={`${styles.tierCard} ${i === 1 ? styles.systemic : ''}`}>
            <div className={styles.tierHeader}>
              <div className={styles.tierLabel}>{tier.label}</div>
              <div className={styles.tierThreshold}>{tier.threshold}</div>
            </div>
            <ul className={styles.obList}>
              {tier.obligations.map((ob, j) => (
                <li key={j} className={`${styles.obItem} ${ob.startsWith('All must') || ob.includes('PLUS') ? styles.obNote : ''}`}>
                  <span className={styles.obBullet}>{ob.includes('PLUS') ? '★' : '›'}</span>
                  {ob}
                </li>
              ))}
            </ul>
            {tier.codeOfPractice && (
              <div className={styles.codePractice}>
                <strong>GPAI Code of Practice (July 2025):</strong> {tier.codeOfPractice}
              </div>
            )}
            {tier.openSource && (
              <div className={styles.openSourceNote}><strong>Open-source:</strong> {tier.openSource}</div>
            )}
            {tier.penalty && (
              <div className={styles.penalty}>Penalty: {tier.penalty}</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.valueChain}>
        <h3 className={styles.sectionHeading}>GPAI in the AI value chain</h3>
        <div className={styles.chainGrid}>
          {[
            { role: 'GPAI model provider', eg: 'OpenAI, Anthropic, Mistral, Google DeepMind', duty: 'Technical documentation, instructions for downstream providers, copyright compliance, training data summary. Systemic risk: adversarial testing, incident reporting, cybersecurity.' },
            { role: 'Downstream provider', eg: 'Company building a product on top of a foundation model', duty: 'Receives documentation from GPAI provider. If integrating into high-risk AI: must meet high-risk obligations. If substantially modifying: may become a provider.' },
            { role: 'Deployer', eg: 'Organisation using a downstream product in a professional context', duty: 'Uses system per provider instructions. High-risk deployer obligations apply if the final system is high-risk. Must ensure human oversight.' },
          ].map((item, i) => (
            <div key={i} className={`card ${styles.chainCard}`}>
              <div className={styles.chainRole}>{item.role}</div>
              <div className={styles.chainEg}>{item.eg}</div>
              <div className="divider" />
              <p className={styles.chainDuty}>{item.duty}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.notificationBox}>
        <div className={styles.notifTitle}>Notification obligation</div>
        <p>Providers whose GPAI model meets the systemic risk threshold (≥10²⁵ FLOPs) must notify the European Commission <strong>within 2 weeks</strong> of the model meeting this criterion. Providers may argue that despite meeting the threshold, their model does not present systemic risks. The Commission may independently classify a model as systemic following a qualified alert from the scientific panel of independent experts.</p>
      </div>
    </div>
  )
}
