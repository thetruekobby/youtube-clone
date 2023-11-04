import Header from "./Header"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { useRef } from "react"
import { Box } from "@mui/material"

const Layout = () => {
    const headerRef = useRef()
    const sidebarRef = useRef()
    return (
        <div>
            <Header headerRef={headerRef} />
            <Navbar headerRef={headerRef} sidebarRef={sidebarRef} />
            <Box className="mt-[var(--header-height,64px)] mr-10 min-h-[calc(100vh_-_var(--header-height,64px))]" sx={{ marginLeft: { xs: "80px", md: "208px" },paddingTop:5 }}>
                <Outlet />
            </Box>
        </div>
    )
}

export default Layout
