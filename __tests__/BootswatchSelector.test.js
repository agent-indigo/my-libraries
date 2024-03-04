import {render, fireEvent, screen} from '@testing-library/react'
import BootswatchSelector from '../components/BootswatchSelector'
jest.mock('../hooks/useBootswatch', () => ({
  __esModule: true,
  default: jest.fn(),
}))
describe('BootswatchSelector', () => {
  it('renders correctly and calls handleThemeChange on select change', () => {
    const mockHandleThemeChange = jest.fn()
    require('../hooks/useBootswatch').default.mockImplementation(() => ({
      themes: [{name: 'theme1'}, {name: 'theme2'}],
      selectedTheme: 'theme1',
      handleThemeChange: mockHandleThemeChange,
    }))
    render(<BootswatchSelector defaultThemeName="theme1"/>)
    const select = screen.getByLabelText('Theme:')
    fireEvent.change(select, {target: {value: 'theme2'}})
    expect(mockHandleThemeChange).toHaveBeenCalledWith('theme2')
  })
})