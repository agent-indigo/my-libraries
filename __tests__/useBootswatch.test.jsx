import { renderHook, act, waitFor } from '@testing-library/react'
import useBootswatch from '../hooks/useBootswatch'
import EasyHTTP from '../utilities/EasyHTTP'
jest.mock('../utilities/EasyHTTP')
describe('useBootswatch', () => {
  let createElementSpy
  let appendChildSpy
  beforeEach(() => {
    createElementSpy = jest.spyOn(document, 'createElement')
    appendChildSpy = jest.spyOn(document.head, 'appendChild')
  })
  afterEach(() => {
    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
  })
  it('should fetch themes and apply the default theme', async () => {
    const mockThemes = [
      { name: 'Default', cssCdn: 'https://bootswatch.com/5/default/bootstrap.min.css' },
      { name: 'Cerulean', cssCdn: 'https://bootswatch.com/5/cerulean/bootstrap.min.css' }
    ]
    EasyHTTP.get.mockResolvedValueOnce({ themes: mockThemes })
    const { result } = renderHook(() => useBootswatch('Default'))
    expect(result.current.themes).toEqual([])
    expect(result.current.selectedTheme).toEqual('Default')
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await waitFor(() => result.current.themes.length > 0)
    })
    expect(result.current.themes).toEqual(mockThemes)
    expect(createElementSpy).toHaveBeenCalledWith('link')
    expect(appendChildSpy).toHaveBeenCalled()
    act(() => result.current.handleThemeChange('Cerulean'))
    expect(result.current.selectedTheme).toEqual('Cerulean')
    expect(createElementSpy).toHaveBeenCalledWith('link')
    expect(appendChildSpy).toHaveBeenCalled()
  })
})