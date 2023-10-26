import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import { useState } from "react"
// import ReactPlayer from "react-player/youtube"
import http from "../utils/Axios"
import { useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNowStrict } from "date-fns"
import { numFormatter, mockArray } from "../utils"
import { useQuery } from "react-query"
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"
import { AvatarSkeleton, TextSkeleton } from "../components/Skeletons"
import ErrorMessage from "../components/ErrorMessage"

const PlayVideo = () => {
  const [channelId, setChannelId] = useState()
  const [relatedVideos, setRelatedVideos] = useState([])
  const { id } = useParams()

  //fetch related videos
  const { isLoading: relatedVideosLoading } = useQuery("related-videos", () => http.get(`/search?relatedToVideoId=${id}&type=video`), {
    onSuccess: (data) => {
      if (data) setRelatedVideos(data)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!id,
  })

  //fetch video details
  const { data } = useQuery("video-details", () => http.get(`/videos?part=contentDetails,snippet,statistics&id=${id}&type=video`), {
    onSuccess: (data) => {
      if (data) setChannelId(data?.[0]?.snippet?.channelId)
    },

    enabled: !!id,
  })

  //fetch channel details
  const { data: channel } = useQuery(["channel-details", channelId], () => http.get(`/channels?part=snippet,statistics&id=${channelId}&type=video`), {
    enabled: !!channelId,
  })

  //fetch video comments
  const { data: comments, isLoading: commentsLoading } = useQuery(
    ["comments", channelId],
    () => http.get(`/commentThreads?part=snippet&videoId=${id}&maxResults=30`),
    {
      onSuccess: (data) => {
        console.log("🚀 ~ file: PlayVideo.jsx:25 ~ const{data}=useQuery ~ commets", data)
      },

      enabled: !!id,
    }
  )
  return (
    <div className="">
      {!data && <ErrorMessage />}

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="start">
        <Box flex={2}>
          <iframe src={`https://www.youtube.com/embed/${id}`} allowFullScreen={true} width="100%" className="aspect-video rounded-lg mb-3"></iframe>
          <Typography variant="h6" className="" mb={1}>
            {data?.[0]?.snippet?.title}
          </Typography>

          <Stack direction={"row"} spacing={2} className="mb-3">
            <Avatar alt="Profile photo" src={channel?.[0]?.snippet?.thumbnails?.default?.url} />
            <Box>
              <Typography variant="body1">{data?.[0]?.snippet?.channelTitle}</Typography>
              <Typography variant="body2" className="text-gray-300">
                {channel?.[0]?.statistics?.subscriberCount} subscribers
              </Typography>
            </Box>
            {/* like and unlike */}
            <Stack
              direction={"row"}
              alignItems={"center"}
              divider={<Divider orientation="vertical" flexItem />}
              className="rounded-full bg-neutral-700 "
            >
              <IconButton sx={{ px: 2 }}>
                <ThumbUpOutlinedIcon sx={{ color: "white" }} fontSize="small" />
                <p className="text-base">{data?.[0]?.statistics?.likeCount}</p>
              </IconButton>
              <IconButton sx={{ px: 2 }}>
                <ThumbDownOffAltOutlinedIcon sx={{ color: "white" }} fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
          {/* video description */}
          <Box className="rounded-lg bg-neutral-700 p-2">
            <Typography>
              {data?.[0]?.statistics?.viewCount} views
              {/* {formatDistanceToNowStrict(new Date(data?.[0]?.snippet?.publishedAt), { addSuffix: true })} */}
            </Typography>
            <Typography>{data?.[0]?.snippet?.description}</Typography>
          </Box>
          {/* COMMENTS */}

          <Box>
            <Typography variant="h6" mt={3}>
              {data?.[0]?.statistics?.commentCount} comments
            </Typography>
            {comments &&
              comments.map((comment, index) => (
                <Box key={index} mb={2} className=" ">
                  <Stack direction={"row"} spacing={2}>
                    <Avatar
                      src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                      alt={comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                    />
                    <Box>
                      <Typography variant="body1">{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</Typography>
                      <Typography variant="body1">{comment?.snippet?.topLevelComment?.snippet?.textOriginal}</Typography>
                      <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <ThumbUpOutlinedIcon sx={{ color: "white" }} />
                        {comment?.snippet?.topLevelComment?.snippet?.likeCount != 0 && (
                          <Typography variant="caption" className="-ml-[5px_!important]">
                            {comment?.snippet?.topLevelComment?.snippet?.likeCount}
                          </Typography>
                        )}
                        <ThumbDownOffAltOutlinedIcon sx={{ color: "white" }} />
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              ))}
            {/* comments skeleton */}
            {commentsLoading &&
              mockArray.map((comment, index) => (
                <Box key={index} mb={2} className="skeleton">
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <AvatarSkeleton />
                    <Box className="flex-1 flex flex-col gap-2">
                      <TextSkeleton />
                      <TextSkeleton />
                      <TextSkeleton />
                    </Box>
                  </Stack>
                </Box>
              ))}
          </Box>
        </Box>
        {/* related videos */}
        <Box flex={1} className="">
          {relatedVideos?.length !== 0 &&
            relatedVideos.map((video, index) => (
              <Stack
                width={"100%"}
                direction="row"
                key={index}
                mb={2}
                spacing={1}
                className=" text-gray-400"
                onClick={() => {
                  // navigate(`/video/${video?.id?.videoId}`)
                  location.assign(`/video/${video?.id?.videoId}`)
                }}
              >
                <Box flex={1}>
                  <img src={video.snippet?.thumbnails?.high?.url} alt="" className="w-full rounded-lg" />
                </Box>
                <Stack flex={{ xs: 2, md: 1 }}>
                  <div className="line-clamp-2 font-bold text-white">{video.snippet?.title}</div>
                  <div className="">{video.snippet?.channelTitle}</div>
                  <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                    <p>{numFormatter(Math.floor(Math.random() * 10000) + 1)} views</p>
                    <span className="rounded-full block w-1 aspect-square bg-neutral-600"></span>
                    <p>{formatDistanceToNowStrict(new Date(video.snippet?.publishedAt), { addSuffix: true })}</p>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          {/* related videos skeleton */}
          {relatedVideosLoading &&
            mockArray.map((video, index) => (
              <Stack width={"100%"} direction="row" key={index} mb={2} spacing={1} className="skeleton">
                <div className="flex-1 bg-gray-500/10 aspect-video w-10 rounded"></div>
                <Stack flex={{ xs: 2, md: 1 }}>
                  <div className="bg-gray-500/10 h-4 rounded last:w-3/4 mb-2"></div>
                  <div className="bg-gray-500/10 h-4 rounded last:w-3/4 mb-2"></div>
                  <div className="bg-gray-500/10 h-4 rounded last:w-3/4 mb-2"></div>
                  <div className="bg-gray-500/10 h-4 rounded last:w-3/4 mb-2"></div>
                </Stack>
              </Stack>
            ))}
        </Box>
      </Stack>

      {/* <ReactPlayer url="https://www.youtube.com/watch?v=7ghhRHRP6t4" controls/> */}
    </div>
  )
}

export default PlayVideo
