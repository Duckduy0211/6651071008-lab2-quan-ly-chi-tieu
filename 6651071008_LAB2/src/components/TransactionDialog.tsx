import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { expenseCategories, incomeCategories } from '../data/transactions'
import type { Transaction, TransactionDraft, TransactionKind } from '../types'
import type { Language } from '../i18n'
import { translate, translateCategory, translatePaymentMethod } from '../i18n'
import { Icon } from './Icon'

interface TransactionDialogProps {
  language: Language
  onClose: () => void
  onSave: (transaction: Transaction) => void
}

const emptyDraft = (): TransactionDraft => ({
  kind: 'expense',
  amount: 0,
  category: expenseCategories[0],
  merchant: '',
  date: new Date().toLocaleDateString('sv-SE'),
  note: '',
  paymentMethod: 'Chuyển khoản',
})

export function TransactionDialog({ language, onClose, onSave }: TransactionDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [draft, setDraft] = useState<TransactionDraft>(emptyDraft)
  const [error, setError] = useState('')
  const categories = useMemo(
    () => (draft.kind === 'expense' ? expenseCategories : incomeCategories),
    [draft.kind],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  const updateKind = (kind: TransactionKind) => {
    setDraft((current) => ({
      ...current,
      kind,
      category: kind === 'expense' ? expenseCategories[0] : incomeCategories[0],
    }))
  }

  const saveTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.amount || draft.amount < 1 || !draft.merchant.trim()) {
      setError(translate(language, 'saveError'))
      return
    }
    setError('')
    onSave({
      ...draft,
      merchant: draft.merchant.trim(),
      note: draft.note.trim(),
      id: `tx-${Date.now()}`,
    })
  }

  return (
    <dialog
      ref={dialogRef}
      className="transaction-dialog"
      aria-labelledby="transaction-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">{translate(language, 'newRecord')}</span>
          <h2 id="transaction-dialog-title">{translate(language, 'addTransaction')}</h2>
        </div>
        <button type="button" className="icon-button dialog-close" onClick={() => dialogRef.current?.close()} aria-label={translate(language, 'close')}>
          <Icon name="close" />
        </button>
      </div>

      <form onSubmit={saveTransaction}>
        <div className="dialog-fields">
          <fieldset className="kind-switch">
            <legend>{translate(language, 'transactionType')}</legend>
            <button
              type="button"
              className={draft.kind === 'expense' ? 'selected expense-choice' : ''}
              aria-pressed={draft.kind === 'expense'}
              onClick={() => updateKind('expense')}
            >
              <Icon name="arrowUp" /> {translate(language, 'selectExpense')}
            </button>
            <button
              type="button"
              className={draft.kind === 'income' ? 'selected income-choice' : ''}
              aria-pressed={draft.kind === 'income'}
              onClick={() => updateKind('income')}
            >
              <Icon name="arrowDown" /> {translate(language, 'selectIncome')}
            </button>
          </fieldset>

          <label className="field-label" htmlFor="transaction-amount">
            {translate(language, 'amount')} <span>*</span>
            <div className="amount-input-wrap">
              <input
                autoFocus
                id="transaction-amount"
                type="number"
                min="1"
                step="1000"
                inputMode="numeric"
                placeholder={translate(language, 'amountPlaceholder')}
                value={draft.amount || ''}
                onChange={(event) => setDraft((current) => ({ ...current, amount: Number(event.target.value) }))}
                required
              />
              <span>₫</span>
            </div>
          </label>

          <div className="field-grid">
            <label className="field-label" htmlFor="transaction-category">
              {translate(language, 'category')} <span>*</span>
              <select
                id="transaction-category"
                value={draft.category}
                onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                required
              >
                {categories.map((category) => <option value={category} key={category}>{translateCategory(category, language)}</option>)}
              </select>
            </label>
            <label className="field-label" htmlFor="transaction-date">
              {translate(language, 'date')} <span>*</span>
              <input
                id="transaction-date"
                type="date"
                value={draft.date}
                onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))}
                required
              />
            </label>
          </div>

          <label className="field-label" htmlFor="transaction-merchant">
            {translate(language, 'merchant')} <span>*</span>
            <input
              id="transaction-merchant"
              type="text"
              placeholder={translate(language, 'merchantPlaceholder')}
              value={draft.merchant}
              onChange={(event) => setDraft((current) => ({ ...current, merchant: event.target.value }))}
              required
            />
          </label>

          <div className="field-grid">
            <label className="field-label" htmlFor="transaction-payment">
              {translate(language, 'paymentMethodLabel')}
              <select
                id="transaction-payment"
                value={draft.paymentMethod}
                onChange={(event) => setDraft((current) => ({ ...current, paymentMethod: event.target.value }))}
              >
                <option value="Chuyển khoản">{translatePaymentMethod('Chuyển khoản', language)}</option>
                <option value="Thẻ ngân hàng">{translatePaymentMethod('Thẻ ngân hàng', language)}</option>
                <option value="Ví điện tử">{translatePaymentMethod('Ví điện tử', language)}</option>
                <option value="Tiền mặt">{translatePaymentMethod('Tiền mặt', language)}</option>
              </select>
            </label>
            <label className="field-label" htmlFor="transaction-note">
              {translate(language, 'note')}
              <textarea
                id="transaction-note"
                rows={2}
                placeholder={translate(language, 'notePlaceholder')}
                value={draft.note}
                onChange={(event) => setDraft((current) => ({ ...current, note: event.target.value }))}
              />
            </label>
          </div>
        </div>

        <p className="form-error" aria-live="polite">{error}</p>
        <div className="dialog-actions">
          <span className="privacy-note"><Icon name="lock" /> {translate(language, 'localOnly')}</span>
          <button type="submit" className="primary-button">
            <Icon name="check" /> {translate(language, 'saveTransaction')}
          </button>
        </div>
      </form>
    </dialog>
  )
}
