import axios from "axios"
import { useEffect, useRef } from "react"
import http from "../utils/Axios"
import { useState } from "react"
import { useMutation } from "react-query"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import { Box, Card, CardMedia } from "@mui/material"
import format from "date-fns/format"
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns"

const Home = () => {
  // const {data} = useMutation()
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k" : Math.sign(num) * Math.abs(num)
  }
  const [videos, setVideos] = useState([])

  const inputref = useRef()
  const options = {
    method: "GET",
    url: "search",
    params: {
      relatedToVideoId: "7ghhRHRP6t4",
      part: "id,snippet",
      type: "video",
      maxResults: "50",
    },
  }

  return (
    <div>
      <button
        className="border p-5 py-1"
        onClick={() => {
          http
            .request(options)
            .then((res) => {
              console.log(res)
              localStorage.setItem("videos", JSON.stringify(res))
              setVideos(res)
            })
            .catch((error) => {
              console.log(error.data)
            })
        }}
      >
        Make request
      </button>
      <button
        className="border p-5 py-1"
        onClick={() => {
          const videos = JSON.parse(localStorage.getItem("videos"))
          setVideos(videos)
        }}
      >
        Get requests
      </button>

      <Stack flexWrap="wrap" direction={"row"} spacing={2} useFlexGap justifyContent="center">
        {videos.length !== 0 &&
          videos.map((video, index) => (
            <Card
              className=" border"
              key={index}
              sx={{ backgroundColor: "transparent", width: { xs: "100%", sm: "45%", md: "31%" }, color: "white" }}
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
                    <p>{kFormatter(Math.floor(Math.random() * 10000) + 1)}</p>
                    <span className="rounded-full block w-1 aspect-square bg-neutral-600"></span>
                    <p>{formatDistanceToNowStrict(new Date(video.snippet?.publishedAt), { addSuffix: true })}</p>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          ))}
      </Stack>
      <p className="">the voy is good</p>
    </div>
  )
}

export default Home
