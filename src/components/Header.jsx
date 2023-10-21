import React, { useState } from "react"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { Box, Stack, TextField, IconButton, AppBar, Toolbar, Input, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { Link, useNavigate } from "react-router-dom"

const Header = ({ headerRef }) => {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const handleSearch = () => {
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
                            <YouTubeIcon color="error" fontSize="large" />
                            <Typography variant="h6" component="h1" sx={{ userSelect: "none" }}>
                                PTube
                            </Typography>
                        </Stack>
                    </a>
                    <Box sx={{ borderRadius: 999, border: "1px solid gray", overflow: "hidden", display: "flex", backgroundColor: "rgb(38 38 38)" }}>
                        <input
                            type="text"
                            className="leading-10 outline-none text-gray-300 px-2 bg-inherit w-96"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value)
                            }}
                        />
                        <Box className="flex items-center justify-center bg-neutral-500 px-5" onClick={handleSearch}>
                            <SearchIcon color="" />
                        </Box>
                    </Box>
                    {/* </Stack> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
