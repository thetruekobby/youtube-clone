import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined"
import { Box, Stack } from "@mui/material"
const Navbar = ({ headerRef, sidebarRef }) => {
  const navList = [
    { icon: <HomeOutlinedIcon fontSize="medium" />, name: "home" },
    { icon: <SubscriptionsOutlinedIcon />, name: "subscriptions" },
  ]
  const headerHeight = /* headerRef?.current?.offsetHeight ?? */ 80
  return (
    <>
      <Box
        ref={sidebarRef}
        sx={{ width: 208, height: `calc(100vh - ${headerHeight}px)`, display: { xs: "none", md: "block" } }}
        className={`px-2 fixed left-0 bottom-0 overflow-y-auto overflow-x-hidden shadow`}
      >
        {navList.map((item, index) => (
          <div
            className="nav-item flex p-2 capitalize gap-4 items-center border-neutral-600  cursor-pointer rounded-lg hover:bg-neutral-800"
            key={index}
          >
            <span className="ml-2">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
        <hr className="my-4" />
      </Box>
      <Box
        ref={sidebarRef}
        sx={{ height: `calc(100vh - ${headerHeight}px)`, display: { md: "none", xs: "block" } }}
        className={`fixed left-0 bottom-0 overflow-y-auto overflow-x-hidden shadow`}
      >
        {navList.map((item, index) => (
          <Stack
            justifyContent={"center"}
            px={1}
            py={2}
            spacing={1}
            className="capitalize items-center text-[0.6rem] border-neutral-600  cursor-pointer rounded-lg hover:bg-neutral-800"
            key={index}
          >
            <span className="">{item.icon}</span>
            <span>{item.name}</span>
          </Stack>
        ))}
      </Box>
    </>
  )
}

export default Navbar
