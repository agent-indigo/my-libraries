import {useEffect, useState} from 'react'
import axios from 'axios'
const useBootswatch = (selectedDefaultTheme = 'Simplex') => {
  const toTitleCase = string => {
    return string.replace(/\w\S*/g, filteredString => {
      return filteredString.charAt(0).toUpperCase() + filteredString.substr(1).toLowerCase()
    })
  }
  const [themes, setThemes] = useState([])
  const [selectedTheme, setSelectedTheme] = useState(toTitleCase(selectedDefaultTheme))
  const handleThemeChange = themeName => {
    setSelectedTheme(themeName)
    const selectedThemeObject = themes.find(theme => theme.name === themeName)
    applyTheme(selectedThemeObject)
  }
  const applyTheme = selectedTheme => {
    const existingStylesheet = document.querySelector('link#bootswatch-stylesheet')
    if (existingStylesheet) existingStylesheet.remove()
    const newStylesheet = document.createElement('link')
    newStylesheet.rel = 'stylesheet'
    newStylesheet.href = selectedTheme.cssCdn
    newStylesheet.id = 'bootswatch-stylesheet'
    newStylesheet.crossOrigin = 'anonymous'
    document.head.appendChild(newStylesheet)
  }
  useEffect((async () => {
    try {
      const themesData = await axios.get('https://bootswatch.com/api/5.json')
      setThemes(themesData.themes)
      const defaultThemeObject = themes.find(theme => theme.name === selectedTheme)
      applyTheme(defaultThemeObject)
    } catch (error) {
      console.error(`Error fetching themes:\n${error}`)
    }
  })(), [themes, selectedTheme])
  return {
    themes,
    selectedTheme,
    handleThemeChange
  }
}
export default useBootswatch