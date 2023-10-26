// import { useEffect, useRef } from "react"
import http from "../utils/Axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import { Box, Card, CardMedia } from "@mui/material"
import { formatDistanceToNowStrict } from "date-fns"
import { numFormatter, mockArray } from "../utils"
import { Link, useNavigate } from "react-router-dom"
import useSearchContext from "../context/SearchContext"
import { AvatarSkeleton, TextSkeleton, VideoSkeleton } from "../components/Skeletons"
import ErrorMessage from "../components/ErrorMessage"

const Home = () => {
  const { searchResults } = useSearchContext()
  //   const [videos, setVideos] = useState([])
  const navigate = useNavigate()
  const {
    isError,
    error,
    isLoading,
    data: videos,
  } = useQuery("suggested-videos", () => http.get(`/search?relatedToVideoId=${searchResults?.[0]?.id?.videoId ?? "7ghhRHRP6t4"}&type=video`), {
    onError: (err) => {
      console.log("🚀 ~ file: Home.jsx:24 ~ Home ~ err:", err)
    },
  })

  return (
    <div className="">
      {/* {isError && <div>{error.message}</div>} */}
      {!videos && <ErrorMessage/>}
      <Stack flexWrap="wrap" direction={"row"} spacing={2} useFlexGap justifyContent="center">
        {videos?.length !== 0 &&
          videos?.map((video, index) => (
            <Card
              elevation={0}
              key={index}
              sx={{ backgroundColor: "transparent", width: { xs: "100%", sm: "45%", md: "31%" }, color: "white", cursor: "pointer" }}
            >
              {/* <img src={video.snippet?.thumbnails?.default?.url} alt="thumbnail" /> */}
              <CardMedia
                sx={{ /* height: 140, */ borderRadius: 3, aspectRatio: "16/9" }}
                image={video.snippet?.thumbnails?.high?.url}
                alt="thumbnail"
                title="green iguana"
                onClick={() => {
                  navigate(`/video/${video?.id?.videoId}`)
                }}
              />
              <Stack spacing={1} direction="row" mt={2}>
                <Avatar alt={video.snippet?.title} src="/static/images/avatar/1.jpg" />
                <Box className="text-[var(--clr-gray-text)]">
                  <p className="font-bold text-white">
                    {video.snippet?.title} onClick=
                    {() => {
                      navigate(`/video/${video?.id?.videoId}`)
                    }}
                  </p>
                  <Link to={`/channel/${video.snippet?.channelId}`} className=" font-semibold">
                    {video.snippet?.channelTitle}
                  </Link>
                  <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ cursor: "default" }}>
                    <p>{numFormatter(Math.floor(Math.random() * 1000000000) + 1)} views</p>
                    <span className="rounded-full block w-1 aspect-square bg-neutral-600"></span>
                    <p>{formatDistanceToNowStrict(new Date(video.snippet?.publishedAt), { addSuffix: true })}</p>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          ))}
        {/* skeleton */}
        {isLoading &&
          mockArray.map((item, index) => (
            <Card
              elevation={0}
              key={index}
              sx={{ backgroundColor: "transparent", width: { xs: "100%", sm: "45%", md: "31%" }, color: "white", cursor: "pointer" }}
              className="skeleton"
            >
              <VideoSkeleton />
              <Stack spacing={1} direction="row" mt={2} alignItems={"center"}>
                <AvatarSkeleton />
                <div className="last:w-3/4 flex-1 flex flex-col gap-1">
                  <TextSkeleton />
                  <TextSkeleton />
                </div>
              </Stack>
            </Card>
          ))}
      </Stack>
    </div>
  )
}

export default Home
