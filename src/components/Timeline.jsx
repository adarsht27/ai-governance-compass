import { EU_TIMELINE } from '../data/governance.js'
import styles from './Timeline.module.css'

const STATUS_COLORS = { done: 'var(--green)', upcoming: 'var(--amber)', future: 'var(--ink3)' }
const STATUS_LABELS = { done: 'In force', upcoming: 'Next deadline', future: 'Future' }

export default function Timeline() {
  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.pageHeader}>
        <p className="section-label">EU AI Act Implementation</p>
        <h2 className={styles.heading}>Enforcement Timeline</h2>
        <p className={styles.subhead}>
          The Act uses a phased rollout — different obligations apply at different dates.
        </p>
      </div>

      <div className={styles.digitalOmnibus}>
        <strong>✓ Digital Omnibus — EP approved 16 June 2026 (423 votes in favour):</strong> The European Parliament 
        has formally adopted the Digital Omnibus amendments. Awaiting Council formal adoption and Official Journal 
        publication (expected July 2026, ahead of 2 August deadline). Once published: Annex III high-risk deadline 
        moves to 2 December 2027; Annex I products to 2 August 2028; watermarking (Art. 50(2)) to 2 December 2026; 
        nudifier apps and CSAM generation banned from 2 December 2026; AI literacy obligation softened; safety component
         definition narrowed.
      </div>

      <div className={styles.timeline}>
        {EU_TIMELINE.map((item, i) => (
          <div key={i} className={`${styles.item} ${styles[item.status]}`}>
            <div className={styles.connector}>
              <div className={styles.dot} style={{ background: STATUS_COLORS[item.status] }} />
              {i < EU_TIMELINE.length - 1 && <div className={styles.line} />}
            </div>
            <div className={styles.content}>
              <div className={styles.dateRow}>
                <span className={styles.date}>{item.date}</span>
                <span className={styles.statusBadge} style={{ color: STATUS_COLORS[item.status] }}>
                  {STATUS_LABELS[item.status]}
                </span>
              </div>
              <div className={styles.label}>{item.label}</div>
              <p className={styles.detail}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.nowBox}>
        <p className="section-label">Where we are now — June 2026</p>
        <div className={styles.nowGrid}>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--eu-red)' }}>✓ Enforceable</div>
            <div className={styles.nowLabel}>Prohibited AI practices (Art. 5)</div>
            <div className={styles.nowSince}>Since 2 Feb 2025</div>
          </div>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--eu-red)' }}>✓ Enforceable</div>
            <div className={styles.nowLabel}>AI literacy obligations (Art. 4)</div>
            <div className={styles.nowSince}>Since 2 Feb 2025</div>
          </div>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--eu-red)' }}>✓ Enforceable</div>
            <div className={styles.nowLabel}>GPAI model obligations (Ch. V)</div>
            <div className={styles.nowSince}>Since 2 Aug 2025</div>
          </div>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--amber)' }}>⏳ Upcoming</div>
            <div className={styles.nowLabel}>High-risk AI (Annex III)</div>
            <div className={styles.nowSince}>Dec 2027 (Digital Omnibus — pending OJ)</div>
          </div>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--ink3)' }}>○ Future</div>
            <div className={styles.nowLabel}>High-risk AI (Annex I products)</div>
            <div className={styles.nowSince}>2 Aug 2028 (Digital Omnibus — pending OJ)</div>
          </div>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--ink3)' }}>○ Future</div>
            <div className={styles.nowLabel}>Large-scale IT systems</div>
            <div className={styles.nowSince}>31 Dec 2030</div>
          </div>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--ink3)' }}>○ Future</div>
            <div className={styles.nowLabel}>Cyber Resilience Act (CRA)</div>
            <div className={styles.nowSince}>11 Dec 2027</div>
          </div>
          <div className={styles.nowItem}>
            <div className={styles.nowStatus} style={{ color: 'var(--amber)' }}>⚠ Pending</div>
            <div className={styles.nowLabel}>Digital Omnibus amendments</div>
            <div className={styles.nowSince}>Awaiting Official Journal — not yet law</div>
          </div>
        </div>
      </div>

      <div className={styles.ukTimeline}>
        <h3 className={styles.sectionHeading}>UK — Key milestones</h3>
        <div className={styles.ukGrid}>
          {[
            { date: 'Feb 2024', label: 'DSIT White Paper response published', note: 'Confirmed principles-based, non-statutory approach. Regulators asked to publish AI strategies by April 2024.' },
            { date: 'Apr 2024', label: 'Regulators publish AI strategic plans', note: 'FCA, ICO, CMA, Ofcom and others published their AI regulatory approaches.' },
            { date: 'Oct 2024', label: 'Regulatory Innovation Office established', note: 'New government body to support innovation-friendly regulation, including AI.' },
            { date: 'Sep 2024', label: 'UK signs Council of Europe AI Convention', note: 'Aligns UK with high-level international AI safety commitments.' },
            { date: 'Jun 2025', label: 'Data (Use and Access) Act — Royal Assent', note: 'Addresses data sharing and AI-adjacent concerns but stops short of comprehensive AI regulation.' },
            { date: 'Ongoing', label: 'Sector regulator guidance being published', note: 'ICO, MHRA, FCA and others are continuously updating AI-specific guidance for their sectors.' },
            { date: 'Jun 2025 – Jun 2026', label: 'Data (Use and Access) Act 2025 — phased commencement', note: 'Relaxes automated decision-making rules, adds children\'s data protections, new complaints procedure for AI-impacted decisions, and copyright/AI training provisions.' },
            { date: 'Feb 2026', label: 'Online Safety Act — deepfake criminal offences', note: 'Non-consensual AI-generated intimate images (deepfakes) are now criminal offences under the amended Sexual Offences Act 2003.' },
            { date: '2026', label: 'Government AI Bill expected', note: 'Ministers have signalled plans for a comprehensive statutory AI Bill. The Private Member\'s AI (Regulation) Bill proposes an AI Authority — not yet law but indicates direction of travel.' },
          ].map((item, i) => (
            <div key={i} className={`card ${styles.ukItem}`}>
              <div className={styles.ukDate}>{item.date}</div>
              <div className={styles.ukLabel}>{item.label}</div>
              <p className={styles.ukNote}>{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
