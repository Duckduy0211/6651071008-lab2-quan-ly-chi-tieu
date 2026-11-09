import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import type { Transaction } from '../types'
import { DashboardPage } from './DashboardPage'

afterEach(cleanup)

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.setAttribute('open', '')
    },
  })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.removeAttribute('open')
    },
  })
})

const transactions: Transaction[] = [
  {
    id: 'coffee',
    kind: 'expense',
    amount: 200000,
    category: 'Ăn uống',
    merchant: 'Quán Cà Phê',
    date: '2025-05-10',
    note: 'Cà phê cuối tuần',
    paymentMethod: 'Tiền mặt',
  },
  {
    id: 'book',
    kind: 'expense',
    amount: 50000,
    category: 'Giáo dục',
    merchant: 'Hiệu sách',
    date: '2025-05-12',
    note: 'Sách tham khảo',
    paymentMethod: 'Ví điện tử',
  },
]

function renderDashboard() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <DashboardPage transactions={transactions} onAddTransaction={vi.fn()} language="vi" />
    </MemoryRouter>,
  )
}

describe('DashboardPage F=8 features', () => {
  it('filters transactions by an amount range', () => {
    renderDashboard()

    fireEvent.change(screen.getByLabelText('Giá thấp nhất'), { target: { value: '100000' } })
    fireEvent.change(screen.getByLabelText('Giá cao nhất'), { target: { value: '250000' } })

    expect(screen.getByText('Quán Cà Phê')).toBeTruthy()
    expect(screen.queryByText('Hiệu sách')).toBeNull()
    expect(screen.getAllByText('1 giao dịch')).toHaveLength(2)
  })

  it('filters transactions by a date range', () => {
    renderDashboard()

    fireEvent.change(screen.getByLabelText('Từ ngày'), { target: { value: '2025-05-10' } })
    fireEvent.change(screen.getByLabelText('Đến ngày'), { target: { value: '2025-05-11' } })

    expect(screen.getByText('Quán Cà Phê')).toBeTruthy()
    expect(screen.queryByText('Hiệu sách')).toBeNull()
  })

  it('compares multiple selected transactions side by side', () => {
    renderDashboard()

    expect(screen.getByRole('region', { name: 'So sánh giao dịch' })).toBeTruthy()
    expect(screen.getByText('Chọn giao dịch để bắt đầu so sánh')).toBeTruthy()
    fireEvent.click(screen.getByRole('checkbox', { name: 'So sánh giao dịch: Quán Cà Phê' }))
    expect(screen.getByText(/Đã chọn một giao dịch/)).toBeTruthy()
    fireEvent.click(screen.getByRole('checkbox', { name: 'So sánh giao dịch: Hiệu sách' }))

    const comparison = screen.getByRole('region', { name: 'So sánh giao dịch' })
    expect(within(comparison).getByRole('table')).toBeTruthy()
    expect(within(comparison).getByText(/200\.000/)).toBeTruthy()
    expect(within(comparison).getByText(/50\.000/)).toBeTruthy()
    expect(within(comparison).getByText('Ăn uống')).toBeTruthy()
    expect(within(comparison).getByText('Giáo dục')).toBeTruthy()

    fireEvent.click(within(comparison).getByRole('button', { name: 'Bỏ so sánh: Quán Cà Phê' }))
    expect(within(comparison).queryByRole('table')).toBeNull()
    expect(within(comparison).getByText(/Đã chọn một giao dịch/)).toBeTruthy()
    fireEvent.click(within(comparison).getByRole('button', { name: 'Bỏ chọn tất cả' }))
    expect(within(comparison).getByText('Chọn giao dịch để bắt đầu so sánh')).toBeTruthy()
  })

  it('keeps the comparison anchor available and links to it after selection', () => {
    renderDashboard()

    expect(document.getElementById('comparison-title')).toBeTruthy()
    fireEvent.click(screen.getByRole('checkbox', { name: 'So sánh giao dịch: Quán Cà Phê' }))
    expect(screen.getByRole('link', { name: 'Xem so sánh' }).getAttribute('href')).toBe('#comparison-title')
  })

  it('opens the transaction form and saves a new transaction', () => {
    const onAddTransaction = vi.fn()
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <DashboardPage transactions={transactions} onAddTransaction={onAddTransaction} language="vi" />
      </MemoryRouter>,
    )

    const addButton = screen.getByRole('button', { name: 'Thêm giao dịch' })
    fireEvent.click(addButton)

    expect(addButton.getAttribute('aria-expanded')).toBe('true')
    const dialog = screen.getByRole('dialog', { name: 'Thêm giao dịch' })
    const amountInput = within(dialog).getByLabelText(/Số tiền/) as HTMLInputElement
    const merchantInput = within(dialog).getByLabelText(/Nơi giao dịch/) as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '75000' } })
    fireEvent.change(merchantInput, { target: { value: 'Tiệm bánh' } })
    expect(amountInput.value).toBe('75000')
    expect(amountInput.checkValidity()).toBe(true)
    expect(merchantInput.value).toBe('Tiệm bánh')
    fireEvent.submit(dialog.querySelector('form') as HTMLFormElement)

    expect(onAddTransaction).toHaveBeenCalledWith(expect.objectContaining({
      amount: 75000,
      merchant: 'Tiệm bánh',
      kind: 'expense',
    }))
  })
})
