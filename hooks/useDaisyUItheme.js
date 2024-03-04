import {useEffect, useState} from 'react'
const useDaisyUItheme = (defaultTheme = 'light') => {
  const [theme, setTheme] = useState(defaultTheme)
  const handleThemeChange = event => {
    setTheme(event.target.value)
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    return () => {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [theme])
  return {theme, handleThemeChange}
}
export default useDaisyUItheme