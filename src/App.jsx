import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import SearchDetails from "./pages/SearchDetails"
import PlayVideo from "./pages/PlayVideo"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchDetails />} />
          <Route path="video/:id" element={<PlayVideo />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
