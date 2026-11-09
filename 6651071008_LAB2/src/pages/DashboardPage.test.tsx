import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import type { Transaction } from '../types'
import { DashboardPage } from './DashboardPage'

afterEach(cleanup)

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

    fireEvent.click(screen.getByRole('checkbox', { name: 'So sánh giao dịch: Quán Cà Phê' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'So sánh giao dịch: Hiệu sách' }))

    const comparison = screen.getByRole('region', { name: 'So sánh giao dịch' })
    expect(within(comparison).getByText(/200\.000/)).toBeTruthy()
    expect(within(comparison).getByText(/50\.000/)).toBeTruthy()
    expect(within(comparison).getByText('Ăn uống')).toBeTruthy()
    expect(within(comparison).getByText('Giáo dục')).toBeTruthy()
  })
})
