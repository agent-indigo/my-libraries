import {renderHook, act} from '@testing-library/react'
import useDaisyUItheme from '../hooks/useDaisyUItheme'
test('useDaisyUItheme initializes with default theme', () => {
  const {result} = renderHook(() => useDaisyUItheme('light'))
  expect(result.current.theme).toBe('light')
})
test('useDaisyUItheme changes theme on handleThemeChange', () => {
  const {result} = renderHook(() => useDaisyUItheme('light'))
  act(() => {
    result.current.handleThemeChange({target: {value: 'dark'}})
  })
  expect(result.current.theme).toBe('dark')
})