import { useState, useEffect } from 'react'
import styles from './Updates.module.css'

const FEEDS = [
  {
    id: 'ec_ai',
    label: 'European Commission — AI policy',
    flag: '🇪🇺',
    color: 'var(--eu-blue)',
    bg: 'var(--eu-blue-light)',
    url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://digital-strategy.ec.europa.eu/en/news-redirect/32476/feed'),
    fallbackUrl: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'),
    sourceUrl: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
  },
  {
    id: 'uk_gov',
    label: 'UK GOV.UK — AI & digital policy',
    flag: '🇬🇧',
    color: 'var(--uk-teal)',
    bg: 'var(--uk-teal-light)',
    url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.gov.uk/search/news-and-communications.atom?keywords=artificial+intelligence&organisations%5B%5D=department-for-science-innovation-and-technology'),
    sourceUrl: 'https://www.gov.uk/search/news-and-communications?keywords=artificial+intelligence&organisations[]=department-for-science-innovation-and-technology',
  },
  {
    id: 'ico',
    label: 'ICO — AI & data protection',
    flag: '🇬🇧',
    color: 'var(--uk-teal)',
    bg: 'var(--uk-teal-light)',
    url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/feed/'),
    sourceUrl: 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/',
  },
]

const MANUAL_UPDATES = [
  {
    source: '🇪🇺 European Commission',
    date: '19 May 2026',
    title: 'Commission seeks feedback on draft guidelines on prohibited AI practices',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    tag: 'EU AI Act'
  },
  {
    source: '🇪🇺 EU AI Office',
    date: 'May 2026',
    title: 'Digital Omnibus: political agreement reached on AI Act amendments — Annex III deadline may move to Dec 2027',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    tag: 'Digital Omnibus'
  },
  {
    source: '🇬🇧 UK Parliament',
    date: '6 Feb 2026',
    title: 'Creating non-consensual deepfakes becomes a criminal offence under amended Sexual Offences Act 2003',
    url: 'https://cms.law/en/int/expert-guides/ai-regulation-scanner/united-kingdom',
    tag: 'Online Safety Act'
  },
  {
    source: '🇬🇧 UK Government',
    date: 'Jun 2025',
    title: 'Data (Use and Access) Act 2025 receives Royal Assent — phased commencement begins',
    url: 'https://www.legislation.gov.uk/ukpga/2025/9/contents',
    tag: 'DUAA 2025'
  },
  {
    source: '🇪🇺 EU AI Office',
    date: 'Jul 2025',
    title: 'GPAI Code of Practice published — voluntary adherence creates presumption of conformity',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers',
    tag: 'GPAI'
  },
  {
    source: '🇪🇺 European Commission',
    date: 'Jan 2026',
    title: 'Official guide on prohibited AI practices published by AI Act Service Desk',
    url: 'https://ai-act-service-desk.ec.europa.eu/sites/default/files/2026-01/guide-prohibited_en.pdf',
    tag: 'EU AI Act'
  },
  {
    source: '🇪🇺 European Commission',
    date: 'Jan 2026',
    title: 'Official guide on AI system definition published — clarifies scope of AI Act',
    url: 'https://ai-act-service-desk.ec.europa.eu/sites/default/files/2026-01/guide-definition_en.pdf',
    tag: 'EU AI Act'
  },
  {
    source: '🇬🇧 UK DSIT',
    date: 'Oct 2024',
    title: 'Regulatory Innovation Office established to support innovation-friendly regulation including AI',
    url: 'https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach',
    tag: 'UK Framework'
  },
]

const TAG_COLORS = {
  'EU AI Act': { bg: 'var(--eu-blue-light)', color: 'var(--eu-blue)', border: 'var(--eu-blue-mid)' },
  'Digital Omnibus': { bg: 'var(--amber-light)', color: 'var(--amber)', border: 'var(--amber-mid)' },
  'Online Safety Act': { bg: '#f3eefa', color: '#7d3c98', border: '#d7b9f5' },
  'DUAA 2025': { bg: 'var(--uk-teal-light)', color: 'var(--uk-teal)', border: 'var(--uk-teal-mid)' },
  'GPAI': { bg: 'var(--eu-red-light)', color: 'var(--eu-red)', border: 'var(--eu-red-mid)' },
  'UK Framework': { bg: 'var(--uk-teal-light)', color: 'var(--uk-teal)', border: 'var(--uk-teal-mid)' },
}

function TagBadge({ tag }) {
  const c = TAG_COLORS[tag] || { bg: 'var(--paper2)', color: 'var(--ink3)', border: 'var(--border)' }
  return (
    <span style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: '100px', fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '2px 8px', fontWeight: 500, whiteSpace: 'nowrap' }}>
      {tag}
    </span>
  )
}

function parseFeedItems(xml, maxItems = 5) {
  try {
    const parser = new window.DOMParser()
    const doc = parser.parseFromString(xml, 'text/xml')
    const items = doc.querySelectorAll('item, entry')
    return Array.from(items).slice(0, maxItems).map(item => ({
      title: item.querySelector('title')?.textContent?.trim() || 'No title',
      link: item.querySelector('link')?.textContent?.trim() || item.querySelector('link')?.getAttribute('href') || '#',
      date: item.querySelector('pubDate, published, updated')?.textContent?.trim() || '',
      desc: item.querySelector('description, summary')?.textContent?.replace(/<[^>]*>/g, '').trim().slice(0, 120) || '',
    }))
  } catch {
    return []
  }
}

function FeedCard({ feed }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(feed.url)
      .then(r => r.json())
      .then(data => {
        const parsed = parseFeedItems(data.contents || '')
        if (parsed.length > 0) { setItems(parsed); setStatus('ok') }
        else setStatus('empty')
      })
      .catch(() => setStatus('error'))
  }, [feed.url])

  return (
    <div className={styles.feedCard} style={{ borderTop: `3px solid ${feed.color}` }}>
      <div className={styles.feedHeader}>
        <span className={styles.feedFlag}>{feed.flag}</span>
        <span className={styles.feedLabel}>{feed.label}</span>
        <a href={feed.sourceUrl} target="_blank" rel="noopener" className={styles.feedSource}>View source ↗</a>
      </div>
      {status === 'loading' && <div className={styles.feedLoading}>Loading feed…</div>}
      {status === 'error' && (
        <div className={styles.feedError}>
          Live feed unavailable — <a href={feed.sourceUrl} target="_blank" rel="noopener">visit source directly ↗</a>
        </div>
      )}
      {status === 'empty' && (
        <div className={styles.feedError}>
          No items parsed — <a href={feed.sourceUrl} target="_blank" rel="noopener">visit source directly ↗</a>
        </div>
      )}
      {status === 'ok' && (
        <ul className={styles.feedList}>
          {items.map((item, i) => (
            <li key={i} className={styles.feedItem}>
              <a href={item.link} target="_blank" rel="noopener" className={styles.feedTitle}>{item.title}</a>
              {item.date && <span className={styles.feedDate}>{item.date.slice(0, 16)}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Updates() {
  const [activeTab, setActiveTab] = useState('curated')

  return (
    <div className={`${styles.wrap} fade-in`}>
      <div className={styles.pageHeader}>
        <p className="section-label">News & updates</p>
        <h2 className={styles.heading}>AI Governance Updates</h2>
        <p className={styles.subhead}>
          Curated recent developments from EU and UK regulatory sources.
          Live feeds pull directly from official government RSS channels.
        </p>
      </div>

      <div className={styles.tabs}>
        {[['curated', 'Curated updates'], ['live', 'Live feeds']].map(([id, label]) => (
          <button key={id}
            className={`${styles.tab} ${activeTab === id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'curated' && (
        <div className={styles.curatedList}>
          {MANUAL_UPDATES.map((u, i) => (
            <div key={i} className={styles.updateCard}>
              <div className={styles.updateMeta}>
                <span className={styles.updateSource}>{u.source}</span>
                <TagBadge tag={u.tag} />
                <span className={styles.updateDate}>{u.date}</span>
              </div>
              <a href={u.url} target="_blank" rel="noopener" className={styles.updateTitle}>
                {u.title} ↗
              </a>
            </div>
          ))}
          <p className={styles.curatedNote}>
            Curated manually — last reviewed May 2026. For real-time updates use the Live feeds tab or subscribe directly to official sources.
          </p>
        </div>
      )}

      {activeTab === 'live' && (
        <div>
          <div className={styles.liveNote}>
            Live feeds are fetched directly from official government RSS channels in your browser.
            No data is sent to any third party. If a feed fails to load, visit the source directly.
          </div>
          <div className={styles.feedGrid}>
            {FEEDS.map(feed => <FeedCard key={feed.id} feed={feed} />)}
          </div>
          <div className={styles.officialLinks}>
            <p className="section-label" style={{ marginBottom: '0.5rem' }}>Subscribe directly</p>
            <div className={styles.linkRow}>
              <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" target="_blank" rel="noopener">EC AI regulation page ↗</a>
              <a href="https://www.gov.uk/search/news-and-communications?keywords=artificial+intelligence" target="_blank" rel="noopener">UK GOV.UK AI news ↗</a>
              <a href="https://ico.org.uk/about-the-ico/media-centre/" target="_blank" rel="noopener">ICO media centre ↗</a>
              <a href="https://digital-strategy.ec.europa.eu/en/policies/ai-office" target="_blank" rel="noopener">EU AI Office ↗</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
