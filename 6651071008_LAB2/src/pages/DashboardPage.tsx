import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils'
import { Icon } from '../components/Icon'
import { TransactionDialog } from '../components/TransactionDialog'
import type { Language } from '../i18n'
import { translate, translateCategory, translatePaymentMethod } from '../i18n'

interface DashboardPageProps {
  transactions: Transaction[]
  onAddTransaction: (transaction: Transaction) => void
  language: Language
}

function transactionDate(value: string, language: Language, options?: Intl.DateTimeFormatOptions): string {
  const locale = language === 'vi' ? 'vi-VN' : 'en-US'
  return new Intl.DateTimeFormat(locale, options ?? { day: '2-digit', month: 'short' })
    .format(new Date(`${value}T00:00:00`))
}

function categoryIcon(category: string): 'coffee' | 'car' | 'bag' | 'home' | 'heart' | 'education' | 'wallet' {
  if (category.includes('Ăn')) return 'coffee'
  if (category.includes('Di chuyển')) return 'car'
  if (category.includes('Mua sắm')) return 'bag'
  if (category.includes('Gia đình') || category.includes('Hóa đơn')) return 'home'
  if (category.includes('Sức khỏe')) return 'heart'
  if (category.includes('Giáo dục')) return 'education'
  return 'wallet'
}

function categoryColor(category: string): string {
  if (category.includes('Ăn')) return 'peach'
  if (category.includes('Di chuyển')) return 'blue'
  if (category.includes('Mua sắm')) return 'lavender'
  if (category.includes('Sức khỏe')) return 'rose'
  if (category.includes('Giáo dục')) return 'gold'
  return 'green'
}

export function DashboardPage({ transactions, onAddTransaction, language }: DashboardPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [minimum, setMinimum] = useState('')
  const [maximum, setMaximum] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const now = new Date()
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthTransactions = transactions.filter((item) => item.date.startsWith(monthPrefix))
  const monthlyIncome = monthTransactions.reduce((sum, item) => sum + (item.kind === 'income' ? item.amount : 0), 0)
  const monthlyExpenses = monthTransactions.reduce((sum, item) => sum + (item.kind === 'expense' ? item.amount : 0), 0)
  const monthlySurplus = monthlyIncome - monthlyExpenses
  const allTimeBalance = transactions.reduce(
    (sum, item) => sum + (item.kind === 'income' ? item.amount : -item.amount),
    0,
  )

  const filteredTransactions = useMemo(() => [...transactions]
    .filter((item) => {
      if (dateFrom && item.date < dateFrom) return false
      if (dateTo && item.date > dateTo) return false
      if (minimum !== '' && item.amount < Number(minimum)) return false
      if (maximum !== '' && item.amount > Number(maximum)) return false
      return true
    })
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)),
  [dateFrom, dateTo, maximum, minimum, transactions])

  const comparisonItems = useMemo(
    () => selectedIds
      .map((id) => transactions.find((item) => item.id === id))
      .filter((item): item is Transaction => item !== undefined),
    [selectedIds, transactions],
  )

  const toggleComparison = (id: string) => {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((selectedId) => selectedId !== id)
      : [...current, id])
  }

  const clearFilters = () => {
    setDateFrom('')
    setDateTo('')
    setMinimum('')
    setMaximum('')
  }

  const saveTransaction = (transaction: Transaction) => {
    onAddTransaction(transaction)
    setDialogOpen(false)
  }

  const incomeLabel = translate(language, 'income')
  const expenseLabel = translate(language, 'expense')

  return (
    <div className="dashboard-page">
      <section className="welcome-row">
        <div>
          <div className="eyebrow"><span className="eyebrow-rule" /> {translate(language, 'greetingEyebrow')}</div>
          <h1>{translate(language, 'greeting')} <span>Đức Duy</span> <span className="wave" aria-hidden="true">✦</span></h1>
          <p className="welcome-subtitle">{translate(language, 'welcomeSubtitle')}</p>
        </div>
        <button
          type="button"
          className="primary-button add-button"
          aria-haspopup="dialog"
          aria-expanded={dialogOpen}
          onClick={() => setDialogOpen(true)}
        >
          <Icon name="plus" /> {translate(language, 'addTransaction')}
        </button>
      </section>

      <section className="summary-grid" aria-label={translate(language, 'dashboard')}>
        <article className="summary-card balance-card">
          <div className="summary-topline">
            <span className="summary-label">{translate(language, 'currentBalance')}</span>
            <span className="summary-icon balance-icon"><Icon name="wallet" /></span>
          </div>
          <strong className="summary-value">{formatCurrency(allTimeBalance)}</strong>
          <div className="summary-foot"><span className="trend-pill"><Icon name="arrowUpRight" /> {translate(language, 'controlled')}</span><span>{translate(language, 'total')}</span></div>
          <div className="balance-orbit orbit-one" /><div className="balance-orbit orbit-two" />
        </article>
        <article className="summary-card">
          <div className="summary-topline">
            <span className="summary-label">{translate(language, 'monthlyIncome')}</span>
            <span className="summary-icon income-icon"><Icon name="arrowDown" /></span>
          </div>
          <strong className="summary-value">{formatCurrency(monthlyIncome)}</strong>
          <div className="summary-foot"><span className="trend-text income-text">{translate(language, 'incomeRecorded')}</span></div>
        </article>
        <article className="summary-card">
          <div className="summary-topline">
            <span className="summary-label">{translate(language, 'monthlyExpenses')}</span>
            <span className="summary-icon expense-icon"><Icon name="arrowUp" /></span>
          </div>
          <strong className="summary-value">{formatCurrency(monthlyExpenses)}</strong>
          <div className="summary-foot"><span className="trend-text expense-text">{translate(language, 'expenseRecorded')}</span></div>
        </article>
        <article className="summary-card">
          <div className="summary-topline">
            <span className="summary-label">{translate(language, 'monthlySurplus')}</span>
            <span className="summary-icon saving-icon"><Icon name="arrowUpRight" /></span>
          </div>
          <strong className="summary-value">{formatCurrency(monthlySurplus)}</strong>
          <div className="summary-foot"><span className="trend-text saving-text">{translate(language, 'afterExpenses')}</span></div>
        </article>
      </section>

      <section className="panel transactions-panel" id="transactions">
        <div className="transactions-heading">
          <div>
            <h2>{translate(language, 'recentTransactions')}</h2>
            <p>{translate(language, 'transactionDescription')}</p>
          </div>
          <span className="transaction-count">{filteredTransactions.length} {translate(language, 'resultCount')}</span>
        </div>

        <section className="range-filters" aria-labelledby="range-filter-title">
          <div className="filter-heading">
            <div>
              <h3 id="range-filter-title"><Icon name="calendar" /> {translate(language, 'filterTitle')}</h3>
              <p>{translate(language, 'filterHelp')}</p>
            </div>
            <button type="button" className="filter-button" onClick={clearFilters}>
              <Icon name="close" /> {translate(language, 'clearFilters')}
            </button>
          </div>
          <div className="range-controls">
            <label className="range-field">
              <span>{translate(language, 'dateFrom')}</span>
              <input type="date" value={dateFrom} max={dateTo || undefined} onChange={(event) => setDateFrom(event.target.value)} />
            </label>
            <label className="range-field">
              <span>{translate(language, 'dateTo')}</span>
              <input type="date" value={dateTo} min={dateFrom || undefined} onChange={(event) => setDateTo(event.target.value)} />
            </label>
            <label className="range-field">
              <span>{translate(language, 'amountMin')}</span>
              <input type="number" min="0" placeholder="0 ₫" value={minimum} onChange={(event) => setMinimum(event.target.value)} />
            </label>
            <label className="range-field">
              <span>{translate(language, 'amountMax')}</span>
              <input type="number" min={minimum || '0'} placeholder="∞" value={maximum} onChange={(event) => setMaximum(event.target.value)} />
            </label>
          </div>
        </section>

        <div className="comparison-callout">
          <span className="comparison-icon"><Icon name="grid" /></span>
          <span>{selectedIds.length > 0
            ? <><strong>{selectedIds.length}</strong> {translate(language, 'compareCount')}</>
            : translate(language, 'compareInstruction')}</span>
          {selectedIds.length > 0 && (
            <>
              <a className="text-button view-comparison-link" href="#comparison-title">
                {translate(language, 'viewComparison')}
              </a>
              <button type="button" className="text-button" onClick={() => setSelectedIds([])}>
                {translate(language, 'clearComparison')}
              </button>
            </>
          )}
        </div>

        <div className="transaction-table-wrap">
          {filteredTransactions.length > 0 ? (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th><span className="sr-only">{translate(language, 'compareColumn')}</span></th>
                  <th>{translate(language, 'transactionName')}</th>
                  <th>{translate(language, 'category')}</th>
                  <th>{translate(language, 'date')}</th>
                  <th>{translate(language, 'paymentMethod')}</th>
                  <th className="amount-heading">{translate(language, 'amount')}</th>
                  <th><span className="sr-only">{translate(language, 'detail')}</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => {
                  const income = transaction.kind === 'income'
                  const selected = selectedIds.includes(transaction.id)
                  return (
                    <tr key={transaction.id} className={selected ? 'comparison-selected-row' : undefined}>
                      <td>
                        <input
                          className="compare-checkbox"
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleComparison(transaction.id)}
                          aria-label={`${language === 'vi' ? 'So sánh giao dịch' : 'Compare transaction'}: ${transaction.merchant}`}
                        />
                      </td>
                      <td>
                        <Link className="transaction-name-cell" to={`/transactions/${transaction.id}`}>
                          <span className={`merchant-icon ${income ? 'merchant-income' : `merchant-${categoryColor(transaction.category)}`}`}>
                            <Icon name={income ? 'arrowDown' : categoryIcon(transaction.category)} size={19} />
                          </span>
                          <span className="merchant-copy">
                            <strong>{transaction.merchant}</strong>
                            <span>{transaction.note || translateCategory(transaction.category, language)}</span>
                          </span>
                        </Link>
                      </td>
                      <td><span className={`category-tag ${income ? 'income-tag' : ''}`}>{translateCategory(transaction.category, language)}</span></td>
                      <td className="date-cell">{transactionDate(transaction.date, language)}</td>
                      <td className="method-cell">{translatePaymentMethod(transaction.paymentMethod, language)}</td>
                      <td className={`amount-cell ${income ? 'positive-amount' : ''}`}>{income ? '+' : '−'}{formatCurrency(transaction.amount)}</td>
                      <td>
                        <Link to={`/transactions/${transaction.id}`} className="row-link" aria-label={`${translate(language, 'detail')}: ${transaction.merchant}`}>
                          <Icon name="chevronRight" size={18} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <span className="empty-icon"><Icon name="search" /></span>
              <strong>{translate(language, 'noTransactions')}</strong>
              <p>{translate(language, 'noTransactionsDescription')}</p>
            </div>
          )}
        </div>
        <div className="transaction-list-footer">
          {filteredTransactions.length} {translate(language, 'resultCount')}
        </div>
      </section>

      <section className="panel comparison-panel" aria-labelledby="comparison-title">
          <div className="comparison-panel-heading">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-rule" />
                {selectedIds.length > 0
                  ? `${selectedIds.length} ${translate(language, 'compareCount')}`.toLocaleUpperCase(language)
                  : translate(language, 'compare').toLocaleUpperCase(language)}
              </span>
              <h2 id="comparison-title">{translate(language, 'comparisonTitle')}</h2>
            </div>
            {selectedIds.length > 0 && (
              <button type="button" className="filter-button" onClick={() => setSelectedIds([])}>
                <Icon name="close" /> {translate(language, 'clearComparison')}
              </button>
            )}
          </div>
          {comparisonItems.length < 2 ? (
            <div className="comparison-empty-state" role="status" aria-live="polite">
              <span className="empty-icon"><Icon name="grid" /></span>
              <strong>{comparisonItems.length === 1
                ? translate(language, 'comparisonOneSelected')
                : translate(language, 'comparisonEmptyTitle')}</strong>
              {comparisonItems.length === 0 && <p>{translate(language, 'comparisonEmptyDescription')}</p>}
              <a className="comparison-select-link" href="#transactions">
                {translate(language, 'transactions')}
                <Icon name="chevronRight" size={15} />
              </a>
            </div>
          ) : (
            <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">{translate(language, 'compareColumn')}</th>
                  {comparisonItems.map((item) => (
                    <th scope="col" key={item.id}>
                      <span className="comparison-item-heading">
                        {item.merchant}
                        <button
                          type="button"
                          onClick={() => toggleComparison(item.id)}
                          aria-label={`${language === 'vi' ? 'Bỏ so sánh' : 'Remove from comparison'}: ${item.merchant}`}
                          title={translate(language, 'clearComparison')}
                        >
                          <Icon name="close" size={14} />
                        </button>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{translate(language, 'amount')}</th>
                  {comparisonItems.map((item) => <td key={item.id} className={item.kind === 'income' ? 'positive-amount' : ''}>{item.kind === 'income' ? '+' : '−'}{formatCurrency(item.amount)}</td>)}
                </tr>
                <tr>
                  <th scope="row">{translate(language, 'category')}</th>
                  {comparisonItems.map((item) => <td key={item.id}>{translateCategory(item.category, language)}</td>)}
                </tr>
                <tr>
                  <th scope="row">{translate(language, 'date')}</th>
                  {comparisonItems.map((item) => <td key={item.id}>{transactionDate(item.date, language, { day: 'numeric', month: 'short', year: 'numeric' })}</td>)}
                </tr>
                <tr>
                  <th scope="row">{translate(language, 'paymentMethod')}</th>
                  {comparisonItems.map((item) => <td key={item.id}>{translatePaymentMethod(item.paymentMethod, language)}</td>)}
                </tr>
                <tr>
                  <th scope="row">{translate(language, 'transactionType')}</th>
                  {comparisonItems.map((item) => <td key={item.id}>{item.kind === 'income' ? incomeLabel : expenseLabel}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          )}
        </section>

      {dialogOpen && <TransactionDialog language={language} onClose={() => setDialogOpen(false)} onSave={saveTransaction} />}
    </div>
  )
}
