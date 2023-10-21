import axios from "axios"
import { useEffect, useRef } from "react"
import http from "../utils/Axios"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import { Box, Card, CardMedia } from "@mui/material"
import format from "date-fns/format"
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns"
import { kFormatter } from "../utils"

const Home = () => {
    const [videos, setVideos] = useState([])
    // const {data} = useMutation()
    const { isError, error, isLoading } = useQuery("suggested-videos", () => http.get("/search? relatedToVideoId=7ghhRHRP6t4&type=video"), {
        onSuccess: (data) => {
            setVideos(data)
        },
    })

    const inputref = useRef()

    return (
        <>
            {isError && <div>{error.message}</div>}
            <Stack flexWrap="wrap" direction={"row"} spacing={2} useFlexGap justifyContent="center">
                {videos.length !== 0 &&
                    videos.map((video, index) => (
                        <Card
                            elevation={0}
                            key={index}
                            sx={{ backgroundColor: "transparent", width: { xs: "100%", sm: "45%", md: "31%" }, color: "white", cursor: "pointer" }}
                        >
                            {/* <img src={video.snippet?.thumbnails?.default?.url} alt="thumbnail" /> */}
                            <CardMedia
                                sx={{ /* height: 140, */ borderRadius: 1, aspectRatio: "16/9" }}
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
                    ))}
                {isLoading &&
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                        <Card
                            elevation={0}
                            key={index}
                            sx={{ backgroundColor: "transparent", width: { xs: "100%", sm: "45%", md: "31%" }, color: "white", cursor: "pointer" }}
                        >
                            {/* <img src={video.snippet?.thumbnails?.default?.url} alt="thumbnail" /> */}

                            <div className="aspect-video rounded bg-gray-700"></div>
                            <Stack spacing={1} direction="row" mt={2}>
                                <div className="rounded-full aspect-square w-bg-gray-700"></div>
                                <div className=" roundebg-gray-700 last:w-3/4 h-3"></div>
                            </Stack>
                        </Card>
                    ))}
            </Stack>
        </>
    )
}

export default Home
