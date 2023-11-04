// import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import SearchDetails from "./pages/SearchDetails"
import PlayVideo from "./pages/PlayVideo"
import Channel from "./pages/Channel"
import { useThemeContext } from "./context/ThemeContext"

function App() {
  const { theme } = useThemeContext()
  return (
    <div id="App" className={`${theme} overflow-x-hidden`}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchDetails />} />
          <Route path="video/:id" element={<PlayVideo />} />
          <Route path="channel/:id" element={<Channel />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
