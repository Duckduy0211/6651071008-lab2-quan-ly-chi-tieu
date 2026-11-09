import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

afterEach(cleanup)

describe('VI/EN language toggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
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

  it('switches the interface language without reloading the page', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }))
    expect(screen.getByRole('heading', { name: 'Transactions' })).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')

    fireEvent.click(screen.getByRole('button', { name: 'Chuyển sang Tiếng Việt' }))
    expect(screen.getByRole('heading', { name: 'Giao dịch gần đây' })).toBeTruthy()
    expect(document.documentElement.lang).toBe('vi')
  })

  it('adds a transaction and persists it locally', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Thêm giao dịch' }))
    const dialog = screen.getByRole('dialog', { name: 'Thêm giao dịch' })
    fireEvent.change(within(dialog).getByLabelText(/Số tiền/), { target: { value: '55000' } })
    fireEvent.change(within(dialog).getByLabelText(/Nơi giao dịch/), { target: { value: 'Giao dịch mới' } })
    fireEvent.submit(dialog.querySelector('form') as HTMLFormElement)

    expect(screen.getByText('Giao dịch mới')).toBeTruthy()
    const savedTransactions = JSON.parse(window.localStorage.getItem('6651071008-expense-transactions') ?? '[]')
    expect(savedTransactions).toEqual(expect.arrayContaining([
      expect.objectContaining({ amount: 55000, merchant: 'Giao dịch mới' }),
    ]))
  })
})
