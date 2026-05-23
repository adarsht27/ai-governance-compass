import { useState } from 'react'
import { EU_RISK_TIERS, EU_ROLES } from '../data/governance.js'
import styles from './EURiskExplorer.module.css'

export default function EURiskExplorer() {
  const [activeTier, setActiveTier] = useState('high')
  const [view, setView] = useState('overview') // overview | provider | deployer | annex
  const tier = EU_RISK_TIERS.find(t => t.id === activeTier)

  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.pageHeader}>
        <p className="section-label">EU AI Act</p>
        <h2 className={styles.heading}>Risk Classification System</h2>
        <p className={styles.subhead}>
          The EU AI Act classifies all AI systems into four tiers. Your tier determines your obligations.
          Select a tier to explore in detail.
        </p>
      </div>

      {/* Tier selector */}
      <div className={styles.tierRow}>
        {EU_RISK_TIERS.map(t => (
          <button
            key={t.id}
            className={`${styles.tierBtn} ${activeTier === t.id ? styles.tierActive : ''}`}
            onClick={() => { setActiveTier(t.id); setView('overview') }}
            style={activeTier === t.id ? { borderColor: t.color, background: t.bg } : {}}
          >
            <span className={styles.tierIcon} style={{ color: t.color }}>{t.icon}</span>
            <span className={styles.tierLabel}>{t.shortLabel}</span>
            <span className={styles.tierArticle} style={{ color: t.color }}>{t.article}</span>
          </button>
        ))}
      </div>

      {/* Tier detail */}
      <div className={styles.detail} style={{ borderColor: tier.border, background: tier.bg }}>
        <div className={styles.detailHeader}>
          <div>
            <div className={styles.detailTitle} style={{ color: tier.color }}>
              {tier.icon} {tier.label}
            </div>
            <div className={styles.detailStatus}>{tier.status}</div>
          </div>
          <div className={styles.penaltyBadge} style={{ background: tier.color, color: '#fff' }}>
            {tier.penalties}
          </div>
        </div>
        <p className={styles.detailDesc}>{tier.description}</p>

        {/* View tabs for high-risk */}
        {tier.id === 'high' && (
          <div className={styles.viewTabs}>
            {[['overview','Examples'], ['annex', 'Annex III Uses'], ['annexI', 'Annex I Products'], ['provider','Provider obligations'], ['deployer','Deployer obligations']].map(([v,l]) => (
              <button key={v} className={`${styles.viewTab} ${view===v?styles.viewTabActive:''}`}
                onClick={() => setView(v)}>{l}</button>
            ))}
          </div>
        )}

        {/* Content */}
        {(tier.id !== 'high' || view === 'overview') && (
          <div>
            <p className="section-label" style={{ marginTop: '1.25rem' }}>
              {tier.id === 'unacceptable' ? 'Prohibited practices' : 'Examples'}
            </p>
            <ul className={styles.list}>
              {(tier.id === 'high' ? [
                'Employment: CV screening, interview evaluation, promotion and termination decisions',
                'Education: access to institutions, learning outcome assessment, exam monitoring',
                'Credit scoring, insurance risk assessment, essential public benefit allocation',
                'Critical infrastructure safety components: energy, water, transport, digital networks',
                'Law enforcement: risk profiling, evidence evaluation, re-offending prediction',
                'Migration, asylum processing, and border management decisions',
                'Administration of justice and AI influencing elections or voting behaviour',
                'Remote biometric identification and emotion recognition in regulated contexts',
              ] : (tier.examples || [])).map((ex, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.bullet} style={{ color: tier.color }}>›</span>
                  {ex}
                </li>
              ))}
            </ul>
            {(tier.providerObligations || []).length > 0 && tier.id !== 'high' && (
              <>
                <p className="section-label" style={{ marginTop: '1.25rem' }}>Obligations</p>
                <ul className={styles.list}>
                  {tier.providerObligations.map((ob, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.bullet} style={{ color: tier.color }}>›</span>
                      <div>
                        <strong>{typeof ob === 'object' ? ob.label : ob}</strong>
                        {typeof ob === 'object' && <div className={styles.obDetail}>{ob.detail}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {tier.id === 'high' && view === 'annex' && (
          <div className={styles.annexGrid}>
            {tier.annexIII.map((sec, i) => (
              <div key={i} className={styles.annexCard}>
                <div className={styles.annexSector}>{sec.sector}</div>
                <ul className={styles.annexList}>
                  {sec.uses.map((u, j) => <li key={j}>{u}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tier.id === 'high' && view === 'annexI' && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--ink3)', marginBottom: '1rem', marginTop: '0.5rem' }}>
              AI embedded as a safety component in products covered by EU harmonisation legislation is
              automatically high-risk under <strong>Annex I</strong> — provided that product also requires
              third-party conformity assessment. Compliance deadline: <strong>August 2027</strong>.
            </p>
            <div className={styles.annexGrid}>
              {(tier.annexI || []).map((sec, i) => (
                <div key={i} className={styles.annexCard}>
                  <div className={styles.annexSector}>{sec.sector}</div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--ink3)', marginBottom: '6px' }}>{sec.law}</div>
                  <ul className={styles.annexList}>
                    {sec.examples.map((u, j) => <li key={j}>{u}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', padding: '10px 14px', background: 'var(--amber-light)', borderRadius: 'var(--radius)', border: '1px solid var(--amber-mid)', fontSize: '13px', color: 'var(--ink2)' }}>
              <strong>Dual compliance note:</strong> Annex I products must comply with both their sector legislation
              (MDR, Machinery Regulation, etc.) AND the EU AI Act high-risk obligations. The AI Act allows
              manufacturers to integrate AI Act testing into their existing conformity assessment processes
              to avoid duplication. The Cyber Resilience Act (CRA, Dec 2027) adds further cybersecurity requirements.
            </div>
          </div>
        )}

        {tier.id === 'high' && view === 'provider' && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--ink3)', marginBottom: '1rem', marginTop: '0.5rem' }}>
              All must be completed before placing a high-risk AI system on the EU market or putting it into service.
            </p>
            <div className={styles.obligationGrid}>
              {tier.providerObligations.map((ob, i) => (
                <div key={i} className={styles.obligationCard}>
                  <div className={styles.obNum}>{String(i+1).padStart(2,'0')}</div>
                  <div>
                    <div className={styles.obLabel}>{ob.label}</div>
                    <div className={styles.obDetail}>{ob.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tier.id === 'high' && view === 'deployer' && (
          <div>
            <p style={{ fontSize: '13px', color: 'var(--ink3)', marginBottom: '1rem', marginTop: '0.5rem' }}>
              Obligations for organisations <em>using</em> a high-risk AI system — not the developer.
            </p>
            <ul className={styles.list}>
              {tier.deployerObligations.map((ob, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.bullet} style={{ color: tier.color }}>›</span>
                  {ob}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Roles section */}
      <div className={styles.rolesSection}>
        <h3 className={styles.sectionHeading}>Who does the AI Act apply to?</h3>
        <div className={styles.rolesGrid}>
          {EU_ROLES.map(role => (
            <div key={role.role} className={`card ${styles.roleCard}`}>
              <div className={styles.roleTitle}>{role.role}</div>
              <p className={styles.roleDesc}>{role.description}</p>
              <div className={styles.roleWho}><strong>Who qualifies:</strong> {role.whoQualifies}</div>
              <div className="divider" />
              <p className="section-label">Key duties</p>
              <ul className={styles.roleDuties}>
                {role.keyDuties.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
