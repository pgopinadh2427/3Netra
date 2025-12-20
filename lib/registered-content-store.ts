export interface RegisteredVideo {
  id: string
  movieName: string
  productionHouse: string
  language: string
  fileName: string
  fileSize: number
  uploadDate: string
  status: "processing" | "active" | "ready"
  fingerprints: {
    videoHash: string
    audioHash: string
    totalFrames: number
    duration: string
  } | null
  detectedMatches: Array<{
    id: string
    platform: string
    uploader: string
    uploadDate: string
    views: number
    action: "blocked" | "monetized" | "tracked"
    status: "active" | "disputed" | "resolved"
  }>
}

// In-memory store for registered videos (in production, use a database)
const registeredVideos: RegisteredVideo[] = []

export const addRegisteredVideo = (
  video: Omit<RegisteredVideo, "id" | "uploadDate" | "status" | "fingerprints" | "detectedMatches">,
) => {
  const newVideo: RegisteredVideo = {
    ...video,
    id: `REG-${Date.now()}`,
    uploadDate: new Date().toISOString().split("T")[0],
    status: "processing",
    fingerprints: null,
    detectedMatches: [],
  }

  registeredVideos.push(newVideo)

  // Simulate fingerprint processing
  setTimeout(() => {
    const video = registeredVideos.find((v) => v.id === newVideo.id)
    if (video) {
      video.fingerprints = {
        videoHash: generateHash("video"),
        audioHash: generateHash("audio"),
        totalFrames: Math.floor(Math.random() * 100000) + 50000,
        duration: "2h 45m",
      }
      video.status = "active"
    }
  }, 3000)

  return newVideo.id
}

export const getRegisteredVideos = () => {
  return registeredVideos
}

export const getRegisteredVideoById = (id: string) => {
  return registeredVideos.find((v) => v.id === id)
}

export const addMatchToVideo = (videoId: string, match: RegisteredVideo["detectedMatches"][0]) => {
  const video = registeredVideos.find((v) => v.id === videoId)
  if (video) {
    video.detectedMatches.push(match)
  }
}

function generateHash(type: "video" | "audio"): string {
  const chars = "0123456789abcdef"
  let hash = type === "video" ? "VH-" : "AH-"
  for (let i = 0; i < 32; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}
