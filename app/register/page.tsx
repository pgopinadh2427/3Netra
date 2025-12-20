"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Upload, Film, CheckCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { addRegisteredVideo } from "@/lib/registered-content-store"

export default function RegisterPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [movieName, setMovieName] = useState("")
  const [productionHouse, setProductionHouse] = useState("")
  const [language, setLanguage] = useState("telugu")
  const [registeredId, setRegisteredId] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setUploadError(null)

    if (!file) {
      return
    }

    const validVideoTypes = ["video/mp4", "video/x-matroska", "video/avi", "video/quicktime", "video/x-msvideo"]
    if (!validVideoTypes.includes(file.type)) {
      setUploadError("Invalid file type. Please upload MP4, MKV, or AVI format.")
      return
    }

    const maxSize = 10 * 1024 * 1024 * 1024
    if (file.size > maxSize) {
      setUploadError("File size exceeds 10GB limit.")
      return
    }

    setSelectedFile(file)
    simulateUploadProgress()
  }

  const simulateUploadProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setUploadProgress(0)
    setUploadError(null)
    const fileInput = document.getElementById("video-file") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById("video-file") as HTMLInputElement
    fileInput?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      setUploadError("Please upload a master copy video file.")
      return
    }

    setIsProcessing(true)

    const videoId = addRegisteredVideo({
      movieName,
      productionHouse,
      language,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
    })

    setRegisteredId(videoId)

    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950 dark:via-gray-900 dark:to-amber-950">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="3Netra Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Register Content
              </h1>
              <p className="text-xs text-muted-foreground">Protect Your Intellectual Property</p>
            </div>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {isSuccess ? (
            <Card className="border-2 border-green-500/30 bg-green-500/5">
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400" />
                <h2 className="text-2xl font-bold mb-3">Content Successfully Registered!</h2>
                <p className="text-muted-foreground mb-2">
                  Your movie has been fingerprinted and added to the 3Netra database.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Registration ID: <span className="font-mono font-semibold">{registeredId}</span>
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => {
                      setIsSuccess(false)
                      setMovieName("")
                      setProductionHouse("")
                      setSelectedFile(null)
                      setUploadProgress(0)
                      setRegisteredId(null)
                    }}
                  >
                    Register Another
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/claims">View Claims</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Register Your Telugu Movie</CardTitle>
                <CardDescription>
                  Copyright holders with exclusive rights can register their content. Our system will create unique
                  digital fingerprints for automatic protection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="movie-name">Movie Name *</Label>
                    <Input
                      id="movie-name"
                      placeholder="Enter Telugu movie name"
                      value={movieName}
                      onChange={(e) => setMovieName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="production">Production House *</Label>
                    <Select value={productionHouse} onValueChange={setProductionHouse} required>
                      <SelectTrigger id="production">
                        <SelectValue placeholder="Select production house" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ntr-arts">NTR Arts</SelectItem>
                        <SelectItem value="mythri-movie-makers">Mythri Movie Makers</SelectItem>
                        <SelectItem value="hombale-films">Hombale Films</SelectItem>
                        <SelectItem value="geetha-arts">Geetha Arts</SelectItem>
                        <SelectItem value="dvv-entertainment">DVV Entertainment</SelectItem>
                        <SelectItem value="vyjayanthi-movies">Vyjayanthi Movies</SelectItem>
                        <SelectItem value="sri-venkateswara-creations">Sri Venkateswara Creations</SelectItem>
                        <SelectItem value="14-reels-plus">14 Reels Plus</SelectItem>
                        <SelectItem value="suresh-productions">Suresh Productions</SelectItem>
                        <SelectItem value="uv-creations">UV Creations</SelectItem>
                        <SelectItem value="dil-raju-productions">Dil Raju Productions</SelectItem>
                        <SelectItem value="aditya-music">Aditya Music</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language *</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="telugu-hindi">Telugu + Hindi Dub</SelectItem>
                        <SelectItem value="telugu-tamil">Telugu + Tamil Dub</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-file">Upload Master Copy *</Label>
                    {!selectedFile ? (
                      <div
                        onClick={handleUploadClick}
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                      >
                        <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">MP4, MKV, AVI (Max 10GB)</p>
                      </div>
                    ) : (
                      <div className="border-2 border-primary rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Film className="w-8 h-8 text-primary" />
                            <div>
                              <p className="font-medium">{selectedFile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile}>
                            <X className="w-5 h-5" />
                          </Button>
                        </div>
                        {uploadProgress < 100 ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>Upload complete</span>
                          </div>
                        )}
                      </div>
                    )}
                    <input
                      type="file"
                      id="video-file"
                      accept="video/mp4,video/x-matroska,video/avi,video/quicktime"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {uploadError && (
                      <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>Copyright Ownership *</Label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Checkbox id="copyright-holder" required />
                        <label htmlFor="copyright-holder" className="text-sm cursor-pointer">
                          I confirm that I am the copyright holder or authorized representative
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="exclusive-rights" required />
                        <label htmlFor="exclusive-rights" className="text-sm cursor-pointer">
                          I have exclusive rights to distribute this content
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="terms" required />
                        <label htmlFor="terms" className="text-sm cursor-pointer">
                          I agree to 3Netra's terms of service and content policy
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    disabled={isProcessing || !selectedFile || uploadProgress < 100}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing Fingerprints...
                      </>
                    ) : (
                      "Register Content"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
