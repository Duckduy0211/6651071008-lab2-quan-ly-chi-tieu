import { describe, expect, it } from 'vitest'
import { truncateText } from './utils'

describe('truncateText boundary', () => {
  it('không thêm dấu ba chấm khi chuỗi bằng maxLength', () => {
    expect(truncateText('Hello', 5)).toBe('Hello')
  })
})
