import React, { useState } from "react"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { Box, Stack, TextField, IconButton, AppBar, Toolbar, Input, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { Link, useNavigate } from "react-router-dom"
import SlowMotionVideoOutlinedIcon from "@mui/icons-material/SlowMotionVideoOutlined"

const Header = ({ headerRef }) => {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const handleSearch = () => {
        if (searchValue === "") return
        setSearchValue("")
        navigate(`/search?q=${searchValue}`)
    }
    return (
        <div className="bg-neutral-900 fixed w-full top-0 z-10">
            <AppBar color="transparent" position="static">
                <Toolbar>
                    {/* <Stack ref={headerRef} className="border" direction="row" alignItems={`center`}> */}
                    {/* <IconButton>
            <MenuOutlinedIcon fontSize="large" className="text-white" />
          </IconButton> */}

                    <a href="/">
                        <Stack direction={"row"} alignItems={"center"} mr={10} spacing={1} sx={{ cursor: "pointer" }}>
                            <SlowMotionVideoOutlinedIcon color="error" fontSize="large" />
                            <Typography variant="h6" component="h1" sx={{ userSelect: "none" }}>
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
                    {/* </Stack> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
