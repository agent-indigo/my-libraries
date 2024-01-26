import { useEffect, useState } from 'react'
import EasyHTTP from '../utilities/EasyHTTP'
const useBootswatch = defaultThemeName => {
  if (!defaultThemeName) {
    throw new Error('No default Bootswatch theme provided.')
  }
  const toTitleCase = string => {
    return string.replace(/\w\S*/g, filteredString => {
      return filteredString.charAt(0).toUpperCase() + filteredString.substr(1).toLowerCase()
    })
  }
  const [themes, setThemes] = useState([])
  const [selectedTheme, setSelectedTheme] = useState(toTitleCase(defaultThemeName))
  const [themesFetched, setThemesFetched] = useState(false)
  const fetchThemes = async () => {
    try {
      const themesData = await EasyHTTP.get('https://bootswatch.com/api/5.json')
      setThemes(themesData.themes)
      setThemesFetched(true)
    } catch (error) {
      console.error('Error fetching themes:', error)
    }
  }
  useEffect(() => {
    const init = async () => {
      try {
        await fetchThemes()
      } catch (error) {
        console.error('Error initializing Bootswatch:', error)
      }
    }
    init()
  }, [])
  useEffect(() => {
    if (themesFetched) {
      const defaultThemeObject = themes.find(theme => theme.name === selectedTheme)
      applyTheme(defaultThemeObject)
    }
  }, [themesFetched, themes, selectedTheme])
  const handleThemeChange = themeName => {
    setSelectedTheme(themeName)
    const selectedThemeObject = themes.find(theme => theme.name === themeName)
    applyTheme(selectedThemeObject)
  }
  const applyTheme = selectedTheme => {
    const cssUrl = selectedTheme.cssCdn
    const existingStylesheet = document.querySelector('link#bootswatch-stylesheet')
    if (existingStylesheet) {
      existingStylesheet.remove()
    }
    const newStylesheet = document.createElement('link')
    newStylesheet.rel = 'stylesheet'
    newStylesheet.href = cssUrl
    newStylesheet.id = 'bootswatch-stylesheet'
    newStylesheet.crossOrigin = 'anonymous'
    document.head.appendChild(newStylesheet)
  }
  return {
    themes,
    selectedTheme,
    handleThemeChange
  }
}
export default useBootswatch