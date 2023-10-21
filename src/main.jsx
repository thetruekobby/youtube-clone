import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {SearchContextProvider} from "./context/SearchContext.jsx"
import { QueryClient, QueryClientProvider } from "react-query"

const queryclient = new QueryClient()

const theme = createTheme({
  palette: {
    black: { main: "#000" },
  },
})
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryclient}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <SearchContextProvider>
                        <App />
                    </SearchContextProvider>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
