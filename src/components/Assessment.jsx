import { useState } from 'react'
import { ASSESSMENT_QUESTIONS } from '../data/governance.js'
import styles from './Assessment.module.css'

function deriveResults(answers) {
  const results = { unacceptable: false, high: false, limited: false, gpai: false, gpai_systemic: false, eu: false, uk: false }
  Object.entries(answers).forEach(([qid, val]) => {
    const q = ASSESSMENT_QUESTIONS.find(q => q.id === qid)
    if (!q) return
    if (q.id === 'q_jurisdiction') {
      if (val.includes('eu') || val.includes('both_j')) results.eu = true
      if (val.includes('uk') || val.includes('both_j')) results.uk = true
    }
    if (q.risk === 'unacceptable' && val === 'yes') results.unacceptable = true
    if (q.risk === 'high' && val === 'yes') results.high = true
    if (q.risk === 'limited' && val === 'yes') results.limited = true
    if (q.risk === 'gpai' && val === 'yes') results.gpai = true
    if (q.risk === 'gpai_systemic' && val === 'yes') results.gpai_systemic = true
  })
  return results
}

function Results({ answers, onReset }) {
  const r = deriveResults(answers)

  const euObligations = []
  const ukSteps = []

  if (r.unacceptable) {
    euObligations.push({ level: 'danger', label: '⊗ PROHIBITED', detail: 'Your system appears to engage in practices banned under Article 5. You must cease this use immediately. Penalties: up to €35M or 7% of global annual turnover.' })
  }
  if (r.gpai_systemic) {
    euObligations.push({ level: 'danger', label: 'GPAI — Systemic risk obligations', detail: 'All standard GPAI obligations apply PLUS: model evaluations, adversarial testing, systemic risk assessment, serious incident reporting to AI Office (within 2 weeks), cybersecurity protection. Notify Commission within 2 weeks of exceeding 10²⁵ FLOPs threshold.' })
  } else if (r.gpai) {
    euObligations.push({ level: 'warn', label: 'GPAI — Standard obligations (from Aug 2025)', detail: 'Technical documentation, information for downstream providers, Copyright Directive compliance policy, and training data summary (using AI Office template). Open-weight providers: only copyright + training data summary unless systemic.' })
  }
  if (r.high) {
    euObligations.push({ level: 'warn', label: 'High-risk AI obligations (from Aug 2026)', detail: 'Risk management system, data governance, technical documentation, automatic logging, instructions for use, human oversight design, accuracy/robustness/cybersecurity, quality management system, conformity assessment, EU declaration of conformity, CE marking, EU database registration, post-market monitoring, incident reporting. As deployer: assign oversight, monitor, maintain logs 6 months.' })
  }
  if (r.limited && !r.high) {
    euObligations.push({ level: 'info', label: 'Limited risk — Transparency obligations', detail: 'Disclose AI nature to users (chatbots), label AI-generated/synthetic media (deepfakes), label AI-generated public-interest content.' })
  }
  if (!r.unacceptable && !r.high && !r.limited && !r.gpai && r.eu) {
    euObligations.push({ level: 'ok', label: 'Minimal / no risk', detail: 'No specific AI Act obligations apply. Voluntary codes of conduct are encouraged. General product safety and sector laws still apply.' })
  }

  if (r.uk) {
    ukSteps.push('Identify which sectoral regulators apply (FCA, ICO, CQC, HSE, Ofcom, MHRA, etc.)')
    ukSteps.push('Read and apply the five DSIT principles: safety, transparency, fairness, accountability, contestability')
    ukSteps.push('Assess compliance with UK GDPR Article 22 if automated decisions affect individuals')
    ukSteps.push('Establish an AI risk register and assign board-level accountability')
    ukSteps.push('Document your AI system: purpose, training data, testing, human oversight, monitoring')
    ukSteps.push('Ensure affected individuals have access to meaningful explanations and redress mechanisms')
    if (r.high || r.eu) ukSteps.push('Consider building to EU AI Act standards as your baseline — this will satisfy UK principles too (Brussels Effect)')
  }

  return (
    <div className={`${styles.results} fade-in`}>
      <div className={styles.resultsHeader}>
        <h3 className={styles.resultsTitle}>Your compliance profile</h3>
        <button className={styles.resetBtn} onClick={onReset}>← Start over</button>
      </div>

      <div className={styles.jurisdictions}>
        {r.eu && <span className="badge badge-eu">EU AI Act applies</span>}
        {r.uk && <span className="badge badge-uk">UK Framework applies</span>}
        {!r.eu && !r.uk && <span className="badge badge-warn">No jurisdiction selected — answer jurisdiction question to see full results</span>}
      </div>

      {r.eu && (
        <div className={styles.section}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>EU AI Act — your obligations</p>
          {euObligations.length === 0 && (
            <div className={`${styles.oblCard} ${styles.ok}`}>
              <div className={styles.oblLabel}>✓ Minimal / no risk</div>
              <div className={styles.oblDetail}>No specific EU AI Act obligations. Monitor for updates as your system evolves.</div>
            </div>
          )}
          {euObligations.map((ob, i) => (
            <div key={i} className={`${styles.oblCard} ${styles[ob.level]}`}>
              <div className={styles.oblLabel}>{ob.label}</div>
              <div className={styles.oblDetail}>{ob.detail}</div>
            </div>
          ))}
        </div>
      )}

      {r.uk && (
        <div className={styles.section}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>UK Framework — your compliance steps</p>
          <ul className={styles.ukList}>
            {ukSteps.map((s, i) => (
              <li key={i} className={styles.ukStep}>
                <span className={styles.stepNum}>{i+1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.disclaimer}>
        This self-assessment is for educational purposes only and does not constitute legal advice.
        Classification under the EU AI Act requires detailed legal and technical analysis. Consult
        qualified legal counsel before making compliance decisions.
      </div>
    </div>
  )
}

export default function Assessment() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const sections = [...new Set(ASSESSMENT_QUESTIONS.map(q => q.section))]

  const setAnswer = (qid, val) => {
    setAnswers(prev => ({ ...prev, [qid]: val }))
  }

  const toggleMulti = (qid, val) => {
    setAnswers(prev => {
      const current = prev[qid] || []
      return { ...prev, [qid]: current.includes(val) ? current.filter(v => v !== val) : [...current, val] }
    })
  }

  const allRequired = ASSESSMENT_QUESTIONS.every(q => {
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
          Answer these questions about your AI system to generate a tailored compliance checklist
          under the EU AI Act and UK framework.
        </p>
      </div>

      <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} noValidate>
        {sections.map(section => {
          const qs = ASSESSMENT_QUESTIONS.filter(q => q.section === section)
          return (
            <div key={section} className={styles.sectionBlock}>
              <div className={styles.sectionTitle}>{section}</div>
              {qs.map(q => (
                <div key={q.id} className={styles.questionBlock}>
                  <p className={styles.qText}>{q.text}</p>
                  {q.type === 'single' && (
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
                  {q.type === 'multi' && (
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
                  {q.type === 'yesno' && (
                    <div className={styles.yesnoRow}>
                      {['yes','no','unsure'].map(val => (
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
              ))}
            </div>
          )
        })}

        <button type="submit" className={`${styles.submitBtn} ${!allRequired ? styles.submitDisabled : ''}`}
          disabled={!allRequired}>
          Generate my compliance checklist →
        </button>
        {!allRequired && <p className={styles.requiredNote}>Please answer all questions to continue.</p>}
      </form>
    </div>
  )
}
