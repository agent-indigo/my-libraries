import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DaisyUIthemeSelector from '../components/DaisyUIthemeSelector'
describe('DaisyUIthemeSelector', () => {
  test('renders with default theme and changes theme on select', () => {
    const defaultTheme = 'light'
    render(<DaisyUIthemeSelector defaultTheme={defaultTheme}/>)
    const themeSelector = screen.getByLabelText(/theme/i)
    const selectedOption = screen.getByDisplayValue(defaultTheme)
    expect(themeSelector).toBeInTheDocument()
    expect(selectedOption).toBeInTheDocument()
    fireEvent.change(themeSelector, {target: {value: 'dark'}})
    const updatedOption = screen.getByDisplayValue('dark')
    expect(updatedOption).toBeInTheDocument()
  })
})