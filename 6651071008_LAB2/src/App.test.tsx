import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

afterEach(cleanup)

describe('VI/EN language toggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
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
})
