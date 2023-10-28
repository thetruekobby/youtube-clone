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
    document.documentElement.style.setProperty("--header-height", headerRef.current.offsetHeight + "px")
  }, [])
  return (
    // <div className="shadow fixed w-full top-0 z-10 bg-[var(--clr-background-primary)]">
    <AppBar ref={headerRef} color="transparent" position="fixed" sx={{ background: "var(--clr-background-secondary)" }}>
      <Toolbar>
        {/* <Stack ref={headerRef} className="border" direction="row" alignItems={`center`}> */}
        {/* <IconButton>
            <MenuOutlinedIcon fontSize="large" className="text-white" />
          </IconButton> */}

        <a href="/">
          <Stack direction={"row"} alignItems={"center"} mr={10} spacing={1} sx={{ cursor: "pointer" }}>
            <SlowMotionVideoOutlinedIcon color="error" fontSize="large" />
            <Typography variant="h6" component="h1" sx={{ userSelect: "none", color: "var(--clr-primary)" }}>
              PTube
            </Typography>
          </Stack>
        </a>
        <Box sx={{ borderRadius: 999, border: "1px solid gray", overflow: "hidden", display: "flex", backgroundColor: "rgb(38 38 38)" }}>
          <input
            placeholder="Search"
            type="text"
            className="leading-10 outline-none text-gray-300 px-4 bg-inherit flex-[1_0_0%]"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />
          <Box className="flex items-center justify-center bg-neutral-500 w-16 cursor-pointer" onClick={handleSearch}>
            <SearchIcon />
          </Box>
        </Box>
        {theme === "dark" ? (
          <LightModeIcon sx={{ color: "var(--clr-primary)",cursor:"pointer", position:"absolute", right:"20px" }} onClick={changeTheme} />
        ) : (
          <DarkModeIcon sx={{ color: "var(--clr-primary)" ,cursor:"pointer", position:"absolute", right:"20px"}} onClick={changeTheme} />
        )}
      </Toolbar>
    </AppBar>
    // </div>
  )
}

export default Header
