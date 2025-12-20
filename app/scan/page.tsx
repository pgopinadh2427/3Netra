"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Upload, AlertTriangle, CheckCircle, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [progress, setProgress] = useState(0)

  const handleScan = () => {
    setIsScanning(true)
    setProgress(0)
    setScanResult(null)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          const movies = ["Pushpa 2: The Rule", "Devara", "Salaar", "Guntur Kaaram", "RRR"]
          const platforms = ["movierulz.com", "tamilrockers.ws", "ibomma.com", "jiorockers.net", "movierulz.vpn"]
          const randomMovie = movies[Math.floor(Math.random() * movies.length)]
          const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)]

          setScanResult({
            hasMatch: Math.random() > 0.3,
            movie: randomMovie,
            platform: randomPlatform,
            confidence: 97.8,
            matchedSegments: 145,
            duration: "2:45:30",
            fingerprints: 8234,
          })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950 dark:via-gray-900 dark:to-amber-950">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="3Netra Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Scan Video
              </h1>
              <p className="text-xs text-muted-foreground">Copyright Detection Scan</p>
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
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Upload Video for Scanning</CardTitle>
              <CardDescription>
                Our system will scan your video frame-by-frame against the Telugu movie database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2 text-lg">Drag and drop your video here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <Input type="file" accept="video/*" className="hidden" id="video-upload" onChange={handleScan} />
                <label htmlFor="video-upload">
                  <Button type="button" asChild>
                    <span>Select Video File</span>
                  </Button>
                </label>
              </div>

              {isScanning && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Scanning video...</span>
                    <span className="text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    Creating digital fingerprints and comparing against database
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scan Results */}
          {scanResult && (
            <>
              {scanResult.hasMatch ? (
                <Card className="border-2 border-red-500/30 bg-red-500/5">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Copyright Match Detected</CardTitle>
                          <CardDescription>This video contains copyrighted content</CardDescription>
                        </div>
                      </div>
                      <Badge variant="destructive">MATCH FOUND</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-card rounded-lg p-4 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Matched Movie</p>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">{scanResult.movie}</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Detected Platform</p>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">{scanResult.platform}</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Confidence Score</p>
                        <p className="text-lg font-bold">{scanResult.confidence}%</p>
                      </div>
                      <div className="bg-card rounded-lg p-4 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Matched Segments</p>
                        <p className="text-lg font-bold">{scanResult.matchedSegments} frames</p>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Film className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        Copyright Claim Actions
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        The copyright owner has configured the following actions for this content:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span>
                            Video will be <strong>blocked</strong> from public access
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span>
                            Copyright owner will <strong>monetize</strong> with ads
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span>
                            View statistics will be <strong>tracked</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" asChild className="flex-1 bg-transparent">
                        <Link href="/claims">Dispute Claim</Link>
                      </Button>
                      <Button variant="outline" onClick={() => setScanResult(null)} className="flex-1">
                        Scan Another Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-green-500/30 bg-green-500/5">
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400" />
                    <h2 className="text-2xl font-bold mb-3">No Copyright Matches Found</h2>
                    <p className="text-muted-foreground mb-6">
                      This video is clear to use. No copyrighted Telugu movie content detected.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
                      <div className="bg-card rounded-lg p-3 border border-border">
                        <p className="text-sm text-muted-foreground">Fingerprints Checked</p>
                        <p className="text-lg font-bold">{scanResult.fingerprints.toLocaleString()}</p>
                      </div>
                      <div className="bg-card rounded-lg p-3 border border-border">
                        <p className="text-sm text-muted-foreground">Movies Scanned</p>
                        <p className="text-lg font-bold">1,500+</p>
                      </div>
                      <div className="bg-card rounded-lg p-3 border border-border">
                        <p className="text-sm text-muted-foreground">Scan Time</p>
                        <p className="text-lg font-bold">5.2s</p>
                      </div>
                    </div>
                    <Button onClick={() => setScanResult(null)}>Scan Another Video</Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Info Card */}
          {!scanResult && !isScanning && (
            <Card>
              <CardHeader>
                <CardTitle>How Video Scanning Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Digital Fingerprinting</h4>
                      <p className="text-sm text-muted-foreground">
                        We create unique fingerprints from your video's frames and audio signatures
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Database Comparison</h4>
                      <p className="text-sm text-muted-foreground">
                        Fingerprints are compared against 1,500+ registered Telugu movies
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instant Results</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive detailed match results with confidence scores and claim actions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
