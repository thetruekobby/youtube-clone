import { Avatar, Card, CardMedia, Stack } from "@mui/material"
import { numFormatter, mockArray } from "../utils"
import { formatDistanceToNowStrict } from "date-fns"
import http from "../utils/Axios"
import { useQuery } from "react-query"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import useSearchContext from "../context/SearchContext"
import ErrorMessage from "../components/ErrorMessage"
import { useState } from "react"

const SearchDetails = () => {
  const { searchResults, setSearchResults } = useSearchContext()
  console.log("🚀 ~ file: SearchDetails.jsx:12 ~ SearchDetails ~ searchResults:", searchResults)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const q = searchParams.get("q")
  const [error, setError] = useState("")

  const { isLoading } = useQuery(["search", q], () => http.get(`search?q=${q}`), {
    onSuccess: (data) => {
      console.log("🚀 ~ file: SearchDetails.jsx:21 ~ const{isLoading}=useQuery ~ data:", data)
      if (data?.data?.items) {
        setSearchResults(data?.data?.items)
        localStorage.setItem("searchResults", JSON.stringify(data?.data?.items))
      } else {
        setError(data.message)
      }
    },
    onError: (err) => {
      setError(err.message)
    },
    enabled: !!q,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {error && searchResults.length === 0 && <ErrorMessage message={error} />}

      <Stack /* sx={{ border: "1px solid gray" }} */ spacing={5} useFlexGap mx={3}>
        {searchResults &&
          searchResults.map((video, index) => (
            <Card elevation={0} key={index} sx={{ backgroundColor: "transparent", color: "white" }}>
              <Stack direction={{ sm: "row" }} spacing={2} sx={{ color: "var(--clr-secondary)" }}>
                {/* <img src="./vite.svg" alt="" className="border" /> */}
                <CardMedia
                  sx={{ borderRadius: 1, aspectRatio: "16/9" /* , width: "100%" */, flex: 1, cursor: "pointer" }}
                  image={video.snippet?.thumbnails?.high?.url}
                  alt="thumbnail"
                  onClick={() => {
                    navigate(`/video/${video?.id?.videoId}`)
                  }}
                />
                <Stack spacing={0.5} sx={{ flex: { xs: 1, md: 2 } }}>
                  <p
                    className="font-bold text-[var(--clr-primary)] cursor-pointer"
                    onClick={() => {
                      navigate(`/video/${video?.id?.videoId}`)
                    }}
                  >
                    {video.snippet?.title}
                  </p>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <p>{numFormatter(Math.floor(Math.random() * 10000) + 1)} views</p>
                    <span className="rounded-full block w-1 aspect-square bg-neutral-600"></span>
                    <p>{video.snippet?.publishedAt && formatDistanceToNowStrict(new Date(video.snippet?.publishedAt), { addSuffix: true })}</p>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Avatar alt={video.snippet?.channelTitle} src="/static/images/avatar/1.jpg" />
                    <Link to={`/channel/${video.snippet?.channelId}`} className=" font-semibold cursor-pointer">
                      {video.snippet?.channelTitle}
                    </Link>
                  </Stack>
                  <p className="line-clamp-2">{video.snippet?.description}</p>
                </Stack>
              </Stack>
            </Card>
          ))}
        {/* skeleton */}
        {isLoading &&
          mockArray.map((video, index) => (
            <Card elevation={0} key={index} sx={{ backgroundColor: "transparent", color: "white", cursor: "pointer" }} className="skeleton">
              <Stack direction={{ sm: "row" }} spacing={2} sx={{ color: "gray" }}>
                <div className="bg-gray-500/10 aspect-video rounded flex-1"></div>
                <Stack spacing={0.5} sx={{ flex: { xs: 1, md: 2 } }}>
                  <p className="bg-gray-500/10 h-4 rounded"></p>
                  <p className="bg-gray-500/10 h-4 rounded"></p>
                  <p className="bg-gray-500/10 h-4 rounded"></p>

                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <div className="rounded-full w-10 aspect-square bg-gray-500/10"></div>
                    <div className="flex-1">
                      <p className=" bg-gray-500/10 h-4 rounded mb-1"></p>
                      <p className=" bg-gray-500/10 h-4 rounded last:w-3/4"></p>
                    </div>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          ))}
      </Stack>
    </>
  )
}

export default SearchDetails
