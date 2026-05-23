import { useState } from 'react'
import { UK_PRINCIPLES, UK_REGULATORS, UK_COMPLIANCE_STEPS, UK_KEY_LAWS } from '../data/governance.js'
import styles from './UKFramework.module.css'

export default function UKFramework() {
  const [activeP, setActiveP] = useState('safety')
  const [activeView, setActiveView] = useState('principles')
  const principle = UK_PRINCIPLES.find(p => p.id === activeP)

  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.pageHeader}>
        <p className="section-label">UK DSIT Framework 2024</p>
        <h2 className={styles.heading}>UK AI Regulatory Framework</h2>
        <p className={styles.subhead}>
          A principles-based, non-statutory approach. Existing sectoral regulators apply five cross-sector
          principles to AI within their domains. No single UK AI Act exists.
        </p>
        <div className={styles.keyFact}>
          <strong>Key distinction from EU:</strong> The UK deliberately avoids horizontal AI legislation.
          Instead, DSIT issued five principles that regulators apply through existing sector rules (Equality Act,
          UK GDPR, product safety law, etc.). A statutory duty on regulators to "have due regard" to these
          principles may follow after an initial review period.
        </div>
      </div>

      <div className={styles.viewSwitcher}>
        {[['principles','Five Principles'],['steps','Compliance Steps'],['regulators','Key Regulators'],['laws','Key Legislation']].map(([v,l]) => (
          <button key={v} className={`${styles.switchBtn} ${activeView===v?styles.switchActive:''}`}
            onClick={() => setActiveView(v)}>{l}</button>
        ))}
      </div>

      {activeView === 'principles' && (
        <div>
          <div className={styles.principleNav}>
            {UK_PRINCIPLES.map(p => (
              <button key={p.id}
                className={`${styles.princBtn} ${activeP===p.id?styles.princActive:''}`}
                onClick={() => setActiveP(p.id)}
                style={activeP===p.id ? { borderColor: p.color, background: p.color+'10' } : {}}>
                <span className={styles.princIcon}>{p.icon}</span>
                <span className={styles.princLabel}>{p.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.principleDetail} style={{ borderColor: principle.color+'44' }}>
            <div className={styles.pdHeader}>
              <span className={styles.pdIcon}>{principle.icon}</span>
              <div>
                <h3 className={styles.pdTitle} style={{ color: principle.color }}>{principle.label}</h3>
                <p className={styles.pdDesc}>{principle.description}</p>
              </div>
            </div>

            <div className={styles.pdGrid}>
              <div>
                <p className="section-label">Key compliance questions</p>
                <ul className={styles.questionList}>
                  {principle.keyQuestions.map((q, i) => (
                    <li key={i} className={styles.question}>
                      <span className={styles.qNum} style={{ color: principle.color }}>{i+1}</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="section-label">Relevant regulators</p>
                <div className={styles.regList}>
                  {principle.regulators.map((r, i) => (
                    <span key={i} className={`badge badge-uk`}>{r}</span>
                  ))}
                </div>
                <p className="section-label" style={{ marginTop: '1rem' }}>Existing law that applies</p>
                <p className={styles.existingLaw}>{principle.existingLaw}</p>
                <p className="section-label" style={{ marginTop: '1rem' }}>DSIT guidance</p>
                <p className={styles.dsitGuidance}>{principle.dsitGuidance}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'steps' && (
        <div className={styles.stepsWrap}>
          <p className={styles.stepsIntro}>
            Unlike the EU AI Act, there is no single compliance checklist. Compliance is achieved through
            applying existing law and the five principles, guided by your sector regulators.
          </p>
          <div className={styles.stepsGrid}>
            {UK_COMPLIANCE_STEPS.map(step => (
              <div key={step.step} className={`card ${styles.stepCard}`}>
                <div className={styles.stepNum}>{String(step.step).padStart(2,'0')}</div>
                <div className={styles.stepLabel}>{step.label}</div>
                <p className={styles.stepDetail}>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'regulators' && (
        <div className={styles.regsWrap}>
          <p className={styles.stepsIntro}>
            These are the primary sector regulators responsible for AI governance in their domains.
            Most have published or are actively developing AI-specific guidance.
          </p>
          <div className={styles.regsGrid}>
            {UK_REGULATORS.map(reg => (
              <div key={reg.name} className={`card ${styles.regCard}`}>
                <div className={styles.regName}>{reg.name}</div>
                <div className={styles.regFull}>{reg.full}</div>
                <div className="divider" />
                <p className="section-label">Focus areas</p>
                <p className={styles.regFocus}>{reg.focus}</p>
                <p className="section-label" style={{ marginTop: '0.75rem' }}>AI guidance</p>
                <p className={styles.regGuidance}>{reg.ai_guidance}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeView === 'laws' && (
        <div className={styles.lawsWrap}>
          <p className={styles.stepsIntro}>
            The UK has no single AI Act. Instead, a patchwork of existing and new laws applies to AI systems
            depending on context. These are the most significant statutes in force or imminent.
          </p>
          <div className={styles.lawsGrid}>
            {UK_KEY_LAWS.map(law => (
              <div key={law.id} className={`card ${styles.lawCard}`}
                style={{ borderTop: `3px solid ${law.color}` }}>
                <div className={styles.lawStatus}>{law.status}</div>
                <div className={styles.lawTitle}>{law.label}</div>
                <p className={styles.lawDesc}>{law.description}</p>
                <div className="divider" />
                <p className="section-label">Key provisions for AI</p>
                <ul className={styles.lawList}>
                  {law.keyProvisions.map((p, i) => (
                    <li key={i} className={styles.lawItem}>{p}</li>
                  ))}
                </ul>
                <div className={styles.lawRelevant}>
                  <strong>Relevant to:</strong> {law.relevantTo}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
