import { createContext, useContext, useState } from "react"

const ThemeContext = createContext()

const checkSystemTheme = () => {
  return matchMedia("prefers-color-scheme:dark").matches ? "dark" : "light"
}

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? checkSystemTheme())
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw Error("useThemeContext must be called within the ThemeContextProvider")
  return context
}
