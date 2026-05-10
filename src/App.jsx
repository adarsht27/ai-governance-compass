import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import EURiskExplorer from './components/EURiskExplorer.jsx'
import GPAIExplorer from './components/GPAIExplorer.jsx'
import UKFramework from './components/UKFramework.jsx'
import Comparison from './components/Comparison.jsx'
import Assessment from './components/Assessment.jsx'
import Timeline from './components/Timeline.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import styles from './App.module.css'

const TABS = [
  { id: 'home', label: 'Overview' },
  { id: 'eu_risk', label: 'EU Risk Tiers' },
  { id: 'gpai', label: 'GPAI Models' },
  { id: 'uk', label: 'UK Framework' },
  { id: 'compare', label: 'EU vs UK' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'assess', label: '⚡ Self-Assessment' },
  { id: 'about', label: 'About' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Hero onNavigate={setActiveTab} />
      case 'eu_risk': return <EURiskExplorer />
      case 'gpai': return <GPAIExplorer />
      case 'uk': return <UKFramework />
      case 'compare': return <Comparison />
      case 'timeline': return <Timeline />
      case 'assess': return <Assessment />
      case 'about': return <About onNavigate={setActiveTab} />
      default: return <Hero onNavigate={setActiveTab} />
    }
  }

  return (
    <div className={styles.app}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS} />
      <main className={styles.main}>
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}
