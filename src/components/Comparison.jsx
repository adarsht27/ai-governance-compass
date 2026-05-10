import { useState } from 'react'
import { COMPARISON } from '../data/governance.js'
import styles from './Comparison.module.css'

export default function Comparison() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? COMPARISON : COMPARISON.filter(c => c.divergence === filter)

  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.pageHeader}>
        <p className="section-label">Comparative Analysis</p>
        <h2 className={styles.heading}>EU AI Act vs UK Framework</h2>
        <p className={styles.subhead}>
          Fifteen governance dimensions compared. The EU takes a rules-based, coercive approach
          while the UK relies on principles-based, mimetic and normative isomorphism pressures.
        </p>
      </div>

      <div className={styles.legend}>
        <button className={`${styles.filterBtn} ${filter==='all'?styles.filterActive:''}`} onClick={() => setFilter('all')}>All ({COMPARISON.length})</button>
        <button className={`${styles.filterBtn} ${filter==='high'?styles.filterActive:''}`} onClick={() => setFilter('high')}>
          <span className={`${styles.dot} ${styles.high}`}></span> High divergence
        </button>
        <button className={`${styles.filterBtn} ${filter==='medium'?styles.filterActive:''}`} onClick={() => setFilter('medium')}>
          <span className={`${styles.dot} ${styles.medium}`}></span> Medium divergence
        </button>
        <button className={`${styles.filterBtn} ${filter==='low'?styles.filterActive:''}`} onClick={() => setFilter('low')}>
          <span className={`${styles.dot} ${styles.low}`}></span> Low divergence
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thDim}>Dimension</th>
              <th className={styles.thEU}>
                <span className="badge badge-eu">EU AI Act</span>
              </th>
              <th className={styles.thUK}>
                <span className="badge badge-uk">UK Framework</span>
              </th>
              <th className={styles.thDiv}>Divergence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className={styles.row}>
                <td className={styles.dimCell}>{row.dimension}</td>
                <td className={styles.euCell}>{row.eu}</td>
                <td className={styles.ukCell}>{row.uk}</td>
                <td className={styles.divCell}>
                  <span className={`${styles.divBadge} ${styles[row.divergence]}`}>
                    {row.divergence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.synthBox}>
        <h3 className={styles.synthTitle}>Analytical synthesis</h3>
        <div className={styles.synthGrid}>
          <div>
            <p className="section-label">Regulatory theory lens</p>
            <p className={styles.synthText}>
              The EU AI Act operates primarily through <strong>coercive isomorphism</strong> — legally binding obligations,
              penalties, and mandatory conformity assessments that force organisations to adopt specific governance structures.
              The UK framework works through <strong>mimetic and normative isomorphism</strong>: organisations look to peers and
              professional norms, guided by sector regulators whose authority derives from existing law rather than AI-specific mandates.
            </p>
          </div>
          <div>
            <p className="section-label">Practical dual-compliance implication</p>
            <p className={styles.synthText}>
              Organisations operating in both markets face a "regulatory arbitrage" decision. Since EU obligations are stricter,
              building to the EU standard generally satisfies UK expectations too — but not vice versa. Enterprises with significant
              EU exposure are advised to use the EU AI Act as the compliance baseline and treat UK principles as supplementary.
            </p>
          </div>
          <div>
            <p className="section-label">Structural differences</p>
            <p className={styles.synthText}>
              The EU creates new legal categories (provider, deployer, importer), new mandatory processes (conformity assessment,
              CE marking, EU database), and a new enforcement body (AI Office). The UK adds no new legal categories, no mandatory
              processes specific to AI, and no new AI regulator — relying instead on the existing regulatory ecosystem.
            </p>
          </div>
          <div>
            <p className="section-label">Convergence pressures</p>
            <p className={styles.synthText}>
              The "Brussels Effect" means UK-based businesses selling into the EU must comply with the EU AI Act regardless.
              This creates de facto upward harmonisation. The UK signed the Council of Europe AI Convention (Sep 2024),
              aligning with high-level safety commitments internationally, and may legislate more prescriptively in future.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
