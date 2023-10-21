import { Avatar, Box, Card, CardMedia, Stack } from "@mui/material"
import { kFormatter } from "../utils"
import { formatDistanceToNowStrict } from "date-fns"
import http from "../utils/Axios"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import useSearchContext from "../context/SearchContext"
// import { second } from "tailwindcss/colors"
// console.log("🚀 ~ file: SearchDetails.jsx:10 ~ second:", second)
const videos = JSON.parse(localStorage.getItem("videos"))

const SearchDetails = () => {
    const { searchResults, setSearchResults } = useSearchContext()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")

    useQuery(["search", q], () => http.get(`search?q=${q}`), {
        onSuccess: (data) => {
            console.log("🚀 ~ file: SearchDetails.jsx:17 ~ useQuery ~ data:", data)
            setSearchResults(data)
        },
        onError: (err) => {
            console.log("🚀 ~ file: SearchDetails.jsx:17 ~ useMutation ~ err:", err)
        },
        enabled: !!q,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    return (
        <Stack /* sx={{ border: "1px solid gray" }} */ spacing={5} useFlexGap mx={3}>
            {/* {[1, 2, 3, 4, 5].map((video, index) => (
        <Card
          elevation={0}
          key={index}
          sx={{ backgroundColor: "transparent", width: { xs: "100%", sm: "45%", md: "31%" }, color: "white", cursor: "pointer" }}
        >
          <CardMedia
            sx={{ borderRadius: 1, aspectRatio: "16/9" }}
            image={video.snippet?.thumbnails?.high?.url}
            alt="thumbnail"
            title="green iguana"
          />
          <Stack spacing={1} direction="row" mt={2}>
            <Avatar alt={video.snippet?.title} src="/static/images/avatar/1.jpg" />
            <Box className="text-neutral-600">
              <p className="font-bold text-white">{video.snippet?.title}</p>
              <p className=" font-semibold">{video.snippet?.channelTitle}</p>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <p>{kFormatter(Math.floor(Math.random() * 10000) + 1)} views</p>
                <span className="rounded-full block w-1 aspect-square bg-neutral-600"></span>
                <p>{formatDistanceToNowStrict(new Date(video.snippet?.publishedAt), { addSuffix: true })}</p>
              </Stack>
            </Box>
          </Stack>
        </Card>
      ))} */}
            {searchResults &&
                searchResults.map((video, index) => (
                    <Card elevation={0} key={index} sx={{ backgroundColor: "transparent", color: "white", cursor: "pointer" }}>
                        <Stack direction={{ sm: "row" }} spacing={2} sx={{ color: "gray" }}>
                            {/* <img src="./vite.svg" alt="" className="border" /> */}
                            <CardMedia
                                sx={{ borderRadius: 1, aspectRatio: "16/9" /* , width: "100%" */, flex: 1 }}
                                image={video.snippet?.thumbnails?.high?.url}
                                alt="thumbnail"
                                title="green iguana"
                            />
                            <Stack spacing={0.5} sx={{ flex: { xs: 1, md: 2 } }}>
                                <p className="font-bold text-white">{video.snippet?.title}</p>
                                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                    <p>{kFormatter(Math.floor(Math.random() * 10000) + 1)} views</p>
                                    <span className="rounded-full block w-1 aspect-square bg-neutral-600"></span>
                                    <p>{formatDistanceToNowStrict(new Date(video.snippet?.publishedAt), { addSuffix: true })}</p>
                                </Stack>
                                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                    <Avatar alt={video.snippet?.channelTitle} src="/static/images/avatar/1.jpg" />
                                    <p>{video.snippet?.channelTitle}</p>
                                </Stack>
                                <p className="line-clamp-2">{video.snippet?.description}</p>
                            </Stack>
                        </Stack>
                    </Card>
                ))}
        </Stack>
    )
}

export default SearchDetails
