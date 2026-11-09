export type TransactionKind = 'expense' | 'income'

export interface Transaction {
  id: string
  kind: TransactionKind
  amount: number
  category: string
  merchant: string
  date: string
  note: string
  paymentMethod: string
}

export interface TransactionDraft
  extends Omit<Transaction, 'id' | 'paymentMethod'> {
  paymentMethod: string
}
