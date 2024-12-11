import React, { useEffect, useState } from "react"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { Box, Stack, TextField, IconButton, AppBar, Toolbar, Input, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { Link, useNavigate } from "react-router-dom"
import SlowMotionVideoOutlinedIcon from "@mui/icons-material/SlowMotionVideoOutlined"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useThemeContext } from "../context/ThemeContext"

const Header = ({ headerRef }) => {
  const { theme, setTheme } = useThemeContext()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState("")
  const handleSearch = () => {
    if (searchValue === "") return
    setSearchValue("")
    navigate(`/search?q=${searchValue}`)
  }

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
    } else {
      setTheme("light")
      localStorage.setItem("theme", "light")
    }
  }

  useEffect(() => {
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-height", headerRef.current.offsetHeight + "px")
    }
    window.addEventListener("resize", setHeaderHeight)

    return () => {
      window.removeEventListener("resize", setHeaderHeight)
    }
  }, [])
  return (
    <AppBar ref={headerRef} sx={{ backgroundColor: "var(--clr-background-secondary)" }} position="fixed" elevation={0}>
      <div className={`flex justify-between items-center px-4 py-2 gap-3 " ${theme !== "dark" && "border-b shadow "}`}>
        <a href="/">
          <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ cursor: "pointer" }}>
            <SlowMotionVideoOutlinedIcon color="error" fontSize="large" />
            <Typography variant="h6" component="h1" sx={{ userSelect: "none", color: "var(--clr-primary)" }}>
              PTube
            </Typography>
          </Stack>
        </a>
        {/* search box */}
        <div className="border border-[var(--clr-foreground)] overflow-hidden rounded-full flex-1 flex max-w-[600px]">
          <input
            placeholder="Search"
            type="text"
            className="leading-10 outline-none text-[var(--clr-secondary)] px-4 bg-inherit flex-[1_0_0%]"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />
          <Box
            className={`flex items-center justify-center ${theme === "dark" ? "bg-neutral-500" : "bg-neutral-500"} w-16 cursor-pointer`}
            onClick={handleSearch}
          >
            <SearchIcon />
          </Box>
        </div>
        {theme === "dark" ? (
          <LightModeIcon sx={{ color: "var(--clr-secondary)", cursor: "pointer", position: "static", right: "20px" }} onClick={changeTheme} />
        ) : (
          <DarkModeIcon sx={{ color: "var(--clr-secondary)", cursor: "pointer", position: "static", right: "20px" }} onClick={changeTheme} />
        )}
      </div>
    </AppBar>
    // </div>
  )
}

export default Header
