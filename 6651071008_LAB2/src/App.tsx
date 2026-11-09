import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { TransactionDetailPage } from './pages/TransactionDetailPage'
import { initialTransactions } from './data/transactions'
import type { Transaction } from './types'
import { Icon } from './components/Icon'
import type { Language } from './i18n'
import { translate } from './i18n'

const storageKey = '6651071008-expense-transactions'
const languageStorageKey = '6651071008-language'

function readLanguage(): Language {
  const saved = window.localStorage.getItem(languageStorageKey)
  return saved === 'en' ? 'en' : 'vi'
}

function isTransaction(value: unknown): value is Transaction {
  return typeof value === 'object'
    && value !== null
    && 'id' in value
    && typeof value.id === 'string'
    && 'kind' in value
    && (value.kind === 'expense' || value.kind === 'income')
    && 'amount' in value
    && typeof value.amount === 'number'
    && Number.isFinite(value.amount)
    && 'category' in value
    && typeof value.category === 'string'
    && 'merchant' in value
    && typeof value.merchant === 'string'
    && 'date' in value
    && typeof value.date === 'string'
    && 'note' in value
    && typeof value.note === 'string'
    && 'paymentMethod' in value
    && typeof value.paymentMethod === 'string'
}

function readTransactions(): Transaction[] {
  const saved = window.localStorage.getItem(storageKey)
  if (!saved) return initialTransactions

  const parsed: unknown = JSON.parse(saved)
  if (!Array.isArray(parsed)) {
    throw new TypeError('Dữ liệu giao dịch đã lưu không đúng định dạng.')
  }
  const validTransactions = parsed.filter(isTransaction)
  if (validTransactions.length !== parsed.length) {
    throw new TypeError('Một hoặc nhiều giao dịch đã lưu thiếu thông tin bắt buộc.')
  }
  return validTransactions
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(readTransactions)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState<Language>(readLanguage)
  const location = useLocation()

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(languageStorageKey, language)
  }, [language])

  const addTransaction = (transaction: Transaction) => {
    setTransactions((current) => [transaction, ...current])
  }

  const toggleLanguage = () => {
    setLanguage((current) => current === 'vi' ? 'en' : 'vi')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="Ví Mộc - về trang tổng quan">
          <span className="brand-mark"><Icon name="leaf" /></span>
          <span>ví mộc<span className="brand-dot">.</span></span>
        </Link>

        <div className="nav-caption">{translate(language, 'personalSpace').toLocaleUpperCase(language)}</div>
        <nav className="side-nav" aria-label="Điều hướng chính">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <Icon name="grid" /><span>{translate(language, 'dashboard')}</span>
          </NavLink>
          <a className="nav-link" href="#transactions">
            <Icon name="receipt" /><span>{translate(language, 'transactions')}</span><span className="nav-count">{transactions.length}</span>
          </a>
          <a className="nav-link" href="#comparison-title">
            <Icon name="grid" /><span>{translate(language, 'compare')}</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-icon"><Icon name="sparkle" /></span>
            <p>Mỗi khoản nhỏ hôm nay tạo nên những kế hoạch lớn ngày mai.</p>
            <span className="tip-signature">— Ví Mộc</span>
          </div>
          <div className="profile">
            <div className="avatar" aria-hidden="true">M</div>
            <div className="profile-copy"><strong>Đức Duy</strong><span>{translate(language, 'member')}</span></div>
            <button type="button" className="icon-button profile-menu" aria-label={translate(language, 'accountOptions')}>
              <Icon name="more" />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="breadcrumb">
            <span>{translate(language, 'personalSpace')}</span><span className="breadcrumb-divider">/</span>
            <strong>{location.pathname.startsWith('/transactions/') ? translate(language, 'transactionDetails') : translate(language, 'dashboard')}</strong>
          </div>
          <div className="topbar-actions">
            <span className="date-chip"><Icon name="calendar" /> {new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())}</span>
            <button
              type="button"
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label={translate(language, 'switchLanguage')}
              title={translate(language, 'switchLanguage')}
            >
              {language === 'vi' ? 'EN' : 'VI'}
            </button>
            <button
              type="button"
              className="icon-button theme-toggle"
              onClick={() => setDarkMode((value) => !value)}
              aria-label={translate(language, darkMode ? 'switchThemeLight' : 'switchThemeDark')}
              title={translate(language, darkMode ? 'lightTheme' : 'darkTheme')}
            >
              <Icon name={darkMode ? 'sun' : 'moon'} />
            </button>
            <button type="button" className="notification-button" aria-label={translate(language, 'notifications')}>
              <Icon name="bell" /><span className="notification-dot" />
            </button>
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<DashboardPage transactions={transactions} onAddTransaction={addTransaction} language={language} />}
            />
            <Route path="/transactions/:id" element={<TransactionDetailPage transactions={transactions} language={language} />} />
            <Route path="*" element={<NotFoundPage language={language} />} />
          </Routes>
        </div>
        <footer className="site-footer">
          <span>{translate(language, 'footerTagline')}</span>
          <span className="footer-status"><i /> {translate(language, 'localData')}</span>
        </footer>
      </main>
    </div>
  )
}

function NotFoundPage({ language }: { language: Language }) {
  return (
    <section className="not-found">
      <div className="empty-icon"><Icon name="search" /></div>
      <h1>{translate(language, 'notFound')}</h1>
      <p>{translate(language, 'notFoundDescription')}</p>
      <Link to="/" className="primary-button">{translate(language, 'backToDashboard')}</Link>
    </section>
  )
}

export default App
