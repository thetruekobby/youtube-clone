import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import SearchDetails from "./pages/SearchDetails"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchDetails />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
