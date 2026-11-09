export function formatCurrency(amount: number, currency = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new RangeError('maxLength must be zero or greater')
  }

  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

// The assignment requires this exact generic function signature.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return ((...args: Parameters<T>) => {
    if (timeout !== undefined) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => fn(...args), delay)
  }) as T
}
