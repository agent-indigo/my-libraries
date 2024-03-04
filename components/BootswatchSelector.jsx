import useBootswatch from '../hooks/useBootswatch'
const BootswatchSelector = ({defaultThemeName}) => {
  const {themes, selectedTheme, handleThemeChange} = useBootswatch(defaultThemeName)
  return (
    <div className="form-group">
      <label htmlFor="bootswatch-selector">Theme:</label>
      <select
        name="bootswatch-selector"
        className="custom-select form-control text-center"
        id="bootswatch-selector"
        onChange={event => handleThemeChange(event.target.value)}
        value={selectedTheme}
      >
        {themes.map(theme => (
          <option key={theme.name} value={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  )
}
export default BootswatchSelector