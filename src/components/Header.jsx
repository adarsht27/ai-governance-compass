import styles from './Header.module.css'

export default function Header({ activeTab, onTabChange, tabs }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoEU}>EU</span>
            <span className={styles.logoDivider}>/</span>
            <span className={styles.logoUK}>UK</span>
          </div>
          <div>
            <div className={styles.title}>AI Governance Compass</div>
            <div className={styles.subtitle}>EU AI Act & UK Framework Explorer</div>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Main navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => onTabChange(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
