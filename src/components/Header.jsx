import React from "react"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { Box, Stack, TextField, IconButton, AppBar, Toolbar, Input } from "@mui/material"
import { green } from "@mui/material/colors"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import SearchIcon from "@mui/icons-material/Search"

const Header = ({ headerRef }) => {
  return (
    <div className="bg-neutral-900 fixed w-full top-0 z-10">
      <AppBar color="transparent" position="static">
        <Toolbar>
          {/* <Stack ref={headerRef} className="border" direction="row" alignItems={`center`}> */}
          <IconButton>
            <MenuOutlinedIcon fontSize="large" className="text-white" />
          </IconButton>

          <YouTubeIcon color="error" fontSize="large" />
          <Box sx={{ borderRadius: 999, border: "1px solid gray", overflow: "hidden", display: "flex" }}>
            {/* <TextField
            placeholder="Search"
            size="small"
            variant="outlined"
            color=""
            InputProps={{
              sx: { borderRadius: 0, borderColor: "green" },
            }}
          /> */}
            <input type="text" className="leading-8 border-2  outline-none text-black px-2" />
            <div className="w-10 flex items-center justify-center bg-gray-200">
              <SearchIcon color="" />
            </div>
          </Box>
          {/* </Stack> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
