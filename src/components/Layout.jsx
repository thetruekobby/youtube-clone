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
            <Box className="mt-[75px] mr-10" sx={{ marginLeft: { xs: "80px", md: "208px" } }}>
                <Outlet />
            </Box>
        </div>
    )
}

export default Layout
