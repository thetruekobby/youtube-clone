import { createContext, useContext, useState } from "react"

const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem("searchResults")) ?? [])
    return <SearchContext.Provider value={{ searchResults, setSearchResults }}>{children}</SearchContext.Provider>
}

export const useSearchContext = () => {
    const context = useContext(SearchContext)
    if (!context) throw Error("useSearchContext must be called within the SearchContextProvider")
    return context
}

export default useSearchContext
