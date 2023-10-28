import { Avatar, Box, Chip, Stack, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import http from "../utils/Axios"
import { TextSkeleton, TitleSkeleton, VideoSkeleton } from "../components/Skeletons"
import { mockArray, numFormatter } from "../utils"
import { formatDistanceToNowStrict } from "date-fns"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import ErrorMessage from "../components/ErrorMessage"
import { useState } from "react"

const Channel = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  //fetch channel details
  const { data: channelData, isLoading: channelDetailsLoading } = useQuery(
    ["channel-details", id],
    () => http.get(`/channels?part=snippet,statistics&id=${id}&type=video`),
    {
      onSuccess: (res) => {
        if (!res?.data?.items) setError(res.message)
      },
      onError: (err) => {
        setError(err.message)
      },

      enabled: !!id,
    }
  )
  //fetch  channel videos
  const { data: channelVideos, isLoading: channelVideosLoading } = useQuery(
    ["channel-videos", id],
    () => http.get(`https://youtube-v31.p.rapidapi.com/search?channelId=${id}&part=snippet,id&order=date`),
    {
      onSuccess: (res) => {
        if (!res?.data?.items) setError(res.message)
      },
      onError: (err) => {
        setError(err.message)
      },
      enabled: !!id,
    }
  )
  return (
    <div>
      {error && !channelDetailsLoading && !channelVideosLoading && <ErrorMessage message={error} />}

      {/* banner */}
      {channelData?.data?.items?.[0]?.brandingSettings?.image?.bannerExternalUrl && (
        <div className="aspect-[16/3] bg-gray-500/10 mb-6 border-none">
          <img src={channelData?.data?.items?.[0]?.brandingSettings?.image?.bannerExternalUrl} className="w-full h-full object-cover object-center" />
        </div>
      )}
      <Stack direction={{ xs: "row" }} spacing={5} alignItems={"center"} mb={5}>
        {channelData?.data?.items?.[0]?.snippet?.thumbnails?.medium?.url && (
          <Avatar
            src={channelData?.data?.items?.[0]?.snippet?.thumbnails?.medium?.url}
            // alt={channelData?.data?.items?.[0]?.snippet?.title}
            sx={{
              width: 150,
              height: "auto",
              aspectRatio: "1",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
        {channelData && (
          <Box>
            <Typography variant="h3" component="p">
              {channelData?.data?.items?.[0]?.snippet?.title}
            </Typography>

            <Typography variant="body1" className="text-[var(--clr-secondary)]">
              {channelData?.data?.items?.[0]?.snippet?.customUrl} {channelData?.data?.items?.[0]?.statistics?.subscriberCount} subscribers{" "}
              {channelData?.data?.items?.[0]?.statistics?.videoCount} videos
            </Typography>
            <Typography variant="body1" className="text-[var(--clr-secondary)] mb-10">
              {channelData?.data?.items?.[0]?.snippet?.description}
            </Typography>

            <Box className="bg-black/90 flex items-center gap-2  rounded-full px-5 py-3 select-none w-fit mt-3">
              <NotificationsNoneOutlinedIcon />
              <span>Subscribe</span>
            </Box>
          </Box>
        )}
        {/* Profile details skeleton */}
        {channelDetailsLoading && (
          <Box className="skeleton flex-1 flex flex-col gap-2">
            <TitleSkeleton></TitleSkeleton>
            <TextSkeleton></TextSkeleton>
            <TextSkeleton></TextSkeleton>
            <TextSkeleton></TextSkeleton>
          </Box>
        )}
      </Stack>
      {/* VIDEOS CONTAINER */}
      <Box>
        <Typography variant="body1"></Typography>
        <Stack direction={{ xs: "row" }} alignItems={"flex-start"} justifyContent="center" flexWrap={"wrap"} spacing={3} useFlexGap>
          {channelVideos?.data?.items &&
            channelVideos?.data?.items?.map((video, index) => (
              <Box
                key={index}
                sx={{ flex: { xs: "1 0 100%", sm: "1 0 40%", md: "1 0 30%", lg: "1 0 20%" }, cursor: "pointer" }}
                onClick={() => {
                  navigate(`/video/${video?.id?.videoId}`)
                }}
              >
                <Box className="aspect-video bg-gray-500/10 rounded-lg overflow-hidden mb-2">
                  <img src={video.snippet?.thumbnails?.high?.url} className="w-full h-full object-cover" />
                </Box>
                <Typography variant="body2">{video.snippet?.title}</Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"} className="text-[var(--clr-secondary)]">
                  <Typography variant="caption">{numFormatter(Math.floor(Math.random() * 1000000) + 1)} views</Typography>
                  <p className="bg-[var(--clr-secondary)] rounded-full aspect-square w-1 "></p>
                  <Typography variant="caption">{formatDistanceToNowStrict(new Date(video.snippet?.publishedAt), { addSuffix: true })}</Typography>
                </Stack>
              </Box>
            ))}
          {/* videos skeleton */}
          {channelVideosLoading &&
            mockArray.map((video, index) => (
              <Box key={index} className="skeleton" sx={{ flex: { xs: "1 0 100%", sm: "1 0 40%", md: "1 0 30%", lg: "1 0 20%" }, cursor: "pointer" }}>
                <VideoSkeleton />
                <Stack spacing={1} mt={1}>
                  <TextSkeleton />
                  <TextSkeleton />
                </Stack>
              </Box>
            ))}
        </Stack>
      </Box>
    </div>
  )
}

export default Channel
