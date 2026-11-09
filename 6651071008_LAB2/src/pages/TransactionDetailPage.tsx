import { Link, useParams } from 'react-router-dom'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils'
import { Icon } from '../components/Icon'
import type { Language } from '../i18n'
import { translate, translateCategory, translatePaymentMethod } from '../i18n'

interface TransactionDetailPageProps {
  transactions: Transaction[]
  language: Language
}

export function TransactionDetailPage({ transactions, language }: TransactionDetailPageProps) {
  const { id } = useParams()
  const transaction = transactions.find((item) => item.id === id)

  if (!transaction) {
    return (
      <section className="not-found">
        <div className="empty-icon"><Icon name="receipt" /></div>
        <h1>{translate(language, 'detailNotFound')}</h1>
        <p>{translate(language, 'detailNotFoundDescription')}</p>
        <Link to="/" className="primary-button"><Icon name="arrowLeft" /> {translate(language, 'backToList')}</Link>
      </section>
    )
  }

  const income = transaction.kind === 'income'
  const date = new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${transaction.date}T00:00:00`))

  return (
    <section className="detail-page">
      <Link to="/" className="back-link"><Icon name="arrowLeft" /> {translate(language, 'allTransactions')}</Link>
      <div className="detail-header">
        <div>
          <div className="eyebrow"><span className="eyebrow-rule" /> {translate(language, 'transactionDetails').toLocaleUpperCase(language)}</div>
          <h1>{transaction.merchant}</h1>
          <p>{translate(language, income ? 'detailIntroIncome' : 'detailIntroExpense')}</p>
        </div>
        <span className={`detail-kind ${income ? 'detail-kind-income' : ''}`}><i /> {translate(language, income ? 'income' : 'expense')}</span>
      </div>

      <article className="detail-card">
        <div className={`detail-amount-icon ${income ? 'detail-income-icon' : ''}`}>
          <Icon name={income ? 'arrowDown' : 'arrowUp'} size={23} />
        </div>
        <span className="detail-amount-label">{translate(language, 'transactionAmount')}</span>
        <strong className={`detail-amount${income ? ' detail-positive' : ''}`}>{income ? '+' : '−'}{formatCurrency(transaction.amount)}</strong>
        <span className="detail-status"><Icon name="check" size={15} /> {translate(language, 'recorded')}</span>
        <div className="detail-divider" />
        <dl className="detail-list">
          <div><dt><Icon name="calendar" /> {translate(language, 'transactionTime')}</dt><dd>{date}</dd></div>
          <div><dt><Icon name="grid" /> {translate(language, 'category')}</dt><dd><span className={`category-tag${income ? ' income-tag' : ''}`}>{translateCategory(transaction.category, language)}</span></dd></div>
          <div><dt><Icon name="creditCard" /> {translate(language, 'payment')}</dt><dd>{translatePaymentMethod(transaction.paymentMethod, language)}</dd></div>
          <div><dt><Icon name="note" /> {translate(language, 'note')}</dt><dd>{transaction.note || translate(language, 'noNote')}</dd></div>
          <div><dt><Icon name="receipt" /> {translate(language, 'transactionId')}</dt><dd className="detail-reference">{transaction.id}</dd></div>
        </dl>
        <Link to="/" className="secondary-button detail-back-button"><Icon name="arrowLeft" /> {translate(language, 'backToList')}</Link>
      </article>
      <p className="detail-footnote"><Icon name="lock" size={15} /> {translate(language, 'privateInfo')}</p>
    </section>
  )
}
