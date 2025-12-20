"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Hash, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { getRegisteredVideos, type RegisteredVideo } from "@/lib/registered-content-store"

export default function ClaimsPage() {
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [showDisputeDialog, setShowDisputeDialog] = useState(false)
  const [showFingerprintDialog, setShowFingerprintDialog] = useState(false)
  const [selectedAction, setSelectedAction] = useState("")
  const [registeredVideos, setRegisteredVideos] = useState<RegisteredVideo[]>([])

  useEffect(() => {
    const loadVideos = () => {
      setRegisteredVideos(getRegisteredVideos())
    }
    loadVideos()
    // Refresh every 2 seconds to show updates
    const interval = setInterval(loadVideos, 2000)
    return () => clearInterval(interval)
  }, [])

  const claims = [
    {
      id: "CLM-2024-0123",
      video: "Pushpa2_The_Rule_Full_Movie.mp4",
      movie: "Pushpa 2: The Rule",
      poster: "/images/pushpa2-film-poster.jpg",
      productionHouse: "Mythri Movie Makers",
      status: "active",
      action: "blocked",
      date: "2024-12-18",
      uploader: "Emmadi Ravi",
      platform: "movierulz.com",
      views: 0,
    },
    {
      id: "CLM-2024-0122",
      video: "Devara_HD_Print.mp4",
      movie: "Devara",
      poster: "/images/devara-film-poster.jpg",
      productionHouse: "NTR Arts",
      status: "disputed",
      action: "monetized",
      date: "2024-12-17",
      uploader: "Kranthi Kumar",
      platform: "tamilrockers.ws",
      views: 15420,
      reason: "Fair use - Educational commentary",
    },
    {
      id: "CLM-2024-0121",
      video: "Salaar_Part1_Ceasefire.mp4",
      movie: "Salaar",
      poster: "/images/salaar-film-poster.jpg",
      productionHouse: "Hombale Films",
      status: "active",
      action: "tracked",
      date: "2024-12-17",
      uploader: "Venkat Reddy",
      platform: "ibomma.com",
      views: 8932,
    },
    {
      id: "CLM-2024-0120",
      video: "Guntur_Kaaram_2024.mp4",
      movie: "Guntur Kaaram",
      poster: "/images/guntur-kaaram-film-poster.jpg",
      productionHouse: "Haarika & Hassine Creations",
      status: "resolved",
      action: "removed",
      date: "2024-12-16",
      uploader: "Sai Prasad",
      platform: "jiorockers.net",
      views: 2341,
    },
    {
      id: "CLM-2024-0119",
      video: "RRR_Full_Movie_Telugu.mp4",
      movie: "RRR",
      poster: "/images/rrr-film-poster.jpg",
      productionHouse: "DVV Entertainment",
      status: "active",
      action: "blocked",
      date: "2024-12-15",
      uploader: "Naveen Chandra",
      platform: "movierulz.vpn",
      views: 0,
    },
  ]

  const disputes = [
    {
      id: "DSP-2024-0045",
      claimId: "CLM-2024-0122",
      video: "content_789.mp4",
      movie: "Devara",
      reason: "Fair use - Educational commentary",
      status: "under_review",
      submittedBy: "Kranthi Kumar",
      date: "2024-12-18",
    },
    {
      id: "DSP-2024-0044",
      claimId: "CLM-2024-0115",
      video: "review_video.mp4",
      movie: "Pushpa 2: The Rule",
      reason: "Fair use - Review with original commentary",
      status: "approved",
      submittedBy: "Rajesh Babu",
      date: "2024-12-15",
    },
  ]

  const handleViewDetails = (claim: any) => {
    setSelectedClaim(claim)
    setShowDetailsDialog(true)
  }

  const handleViewFingerprints = (video: RegisteredVideo) => {
    setSelectedClaim(video)
    setShowFingerprintDialog(true)
  }

  const handleModifyAction = (claim: any) => {
    setSelectedClaim(claim)
    setSelectedAction(claim.action)
    setShowActionDialog(true)
  }

  const handleReviewDispute = (claim: any) => {
    setSelectedClaim(claim)
    setShowDisputeDialog(true)
  }

  const handleApproveDispute = (dispute: any) => {
    alert(`Dispute ${dispute.id} has been approved. The claim will be removed.`)
  }

  const handleDenyDispute = (dispute: any) => {
    alert(`Dispute ${dispute.id} has been denied. The claim remains active.`)
  }

  const handleSaveAction = () => {
    alert(`Claim ${selectedClaim?.id} action updated to: ${selectedAction}`)
    setShowActionDialog(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950 dark:via-gray-900 dark:to-amber-950">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="3Netra Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Claims Management
              </h1>
              <p className="text-xs text-muted-foreground">Review and manage copyright claims</p>
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
        <Tabs defaultValue="registered" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="registered">Registered Content</TabsTrigger>
            <TabsTrigger value="claims">Active Claims</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>

          <TabsContent value="registered" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Registered Content</CardTitle>
                <CardDescription>Videos you've registered for copyright protection</CardDescription>
              </CardHeader>
              <CardContent>
                {registeredVideos.length === 0 ? (
                  <div className="text-center py-12">
                    <Image
                      src="/placeholder.svg"
                      alt="No content registered"
                      width={50}
                      height={50}
                      className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
                    />
                    <p className="text-muted-foreground mb-4">No content registered yet</p>
                    <Button asChild>
                      <Link href="/register">Register Your First Movie</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registeredVideos.map((video) => (
                      <Card key={video.id} className="border-2">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{video.movieName}</h3>
                                {video.status === "processing" && (
                                  <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
                                    <Clock className="w-3 h-3 mr-1 animate-spin" />
                                    Processing
                                  </Badge>
                                )}
                                {video.status === "active" && (
                                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Active
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">ID: {video.id}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">File Name</p>
                              <p className="font-medium text-sm">{video.fileName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Production House</p>
                              <p className="font-medium text-sm capitalize">
                                {video.productionHouse.replace(/-/g, " ")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">File Size</p>
                              <p className="font-medium text-sm">{(video.fileSize / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Upload Date</p>
                              <p className="font-medium text-sm">{video.uploadDate}</p>
                            </div>
                            {video.fingerprints && (
                              <>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Total Frames</p>
                                  <p className="font-medium text-sm">
                                    {video.fingerprints.totalFrames.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                                  <p className="font-medium text-sm">{video.fingerprints.duration}</p>
                                </div>
                              </>
                            )}
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Detected Matches</p>
                              <p className="font-medium text-sm text-red-600 dark:text-red-400">
                                {video.detectedMatches.length}
                              </p>
                            </div>
                          </div>

                          {video.fingerprints && (
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <Hash className="w-4 h-4" />
                                Digital Fingerprints Generated
                              </h4>
                              <div className="grid gap-2">
                                <div>
                                  <p className="text-xs text-muted-foreground">Video Hash</p>
                                  <p className="font-mono text-xs">{video.fingerprints.videoHash}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Audio Hash</p>
                                  <p className="font-mono text-xs">{video.fingerprints.audioHash}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2">
                            {video.fingerprints && (
                              <Button size="sm" variant="outline" onClick={() => handleViewFingerprints(video)}>
                                View Fingerprint Details
                              </Button>
                            )}
                            {video.detectedMatches.length > 0 && (
                              <Button size="sm" variant="default">
                                View Matches ({video.detectedMatches.length})
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claims" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Copyright Claims</CardTitle>
                <CardDescription>All detected matches and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claims.map((claim) => (
                    <Card key={claim.id} className="border-2">
                      <CardContent className="pt-6">
                        {claim.poster && (
                          <div className="mb-4 flex justify-center">
                            <Image
                              src={claim.poster || "/placeholder.svg"}
                              alt={`${claim.movie} poster`}
                              width={200}
                              height={300}
                              className="rounded-lg shadow-lg"
                            />
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{claim.movie}</h3>
                              {claim.status === "active" && (
                                <Badge className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Active
                                </Badge>
                              )}
                              {claim.status === "disputed" && (
                                <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Disputed
                                </Badge>
                              )}
                              {claim.status === "resolved" && (
                                <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Resolved
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">Claim ID: {claim.id}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Video File</p>
                            <p className="font-medium text-sm">{claim.video}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Production House</p>
                            <p className="font-medium text-sm">{claim.productionHouse}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Uploader</p>
                            <p className="font-medium text-sm">{claim.uploader}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Piracy Platform</p>
                            <p className="font-medium text-sm text-red-600 dark:text-red-400">{claim.platform}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Action Taken</p>
                            <p className="font-medium text-sm capitalize">{claim.action}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Views</p>
                            <p className="font-medium text-sm">{claim.views.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(claim)}>
                            View Details
                          </Button>
                          {claim.status === "disputed" && (
                            <Button size="sm" variant="outline" onClick={() => handleReviewDispute(claim)}>
                              Review Dispute
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleModifyAction(claim)}>
                            Modify Action
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Claim Disputes</CardTitle>
                <CardDescription>Users challenging copyright claims under fair use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <Card key={dispute.id} className="border-2">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">Dispute: {dispute.movie}</h3>
                              {dispute.status === "under_review" && (
                                <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Under Review
                                </Badge>
                              )}
                              {dispute.status === "approved" && (
                                <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Approved
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">Dispute ID: {dispute.id}</p>
                          </div>
                        </div>

                        <div className="bg-muted rounded-lg p-4 mb-4">
                          <p className="text-sm font-medium mb-1">Dispute Reason:</p>
                          <p className="text-sm text-muted-foreground">{dispute.reason}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Original Claim</p>
                            <p className="font-medium text-sm">{dispute.claimId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Submitted By</p>
                            <p className="font-medium text-sm">{dispute.submittedBy}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Date Submitted</p>
                            <p className="font-medium text-sm">{dispute.date}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {dispute.status === "under_review" && (
                            <>
                              <Button size="sm" variant="default" onClick={() => handleApproveDispute(dispute)}>
                                Approve Dispute
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDenyDispute(dispute)}>
                                Deny Dispute
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(dispute)}>
                            View Full Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Fair Use Guidelines
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Disputes are reviewed based on fair use principles including educational purposes, transformative
                    content, commentary, criticism, and review. Repeated false claims by copyright holders may result in
                    loss of 3Netra access.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Claim Details</DialogTitle>
            <DialogDescription>Complete information about this copyright claim</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              {selectedClaim.poster && (
                <div className="flex justify-center">
                  <Image
                    src={selectedClaim.poster || "/placeholder.svg"}
                    alt={`${selectedClaim.movie} poster`}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Claim ID</Label>
                  <p className="font-medium">{selectedClaim.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Movie</Label>
                  <p className="font-medium">{selectedClaim.movie}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Production House</Label>
                  <p className="font-medium">{selectedClaim.productionHouse}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Video File</Label>
                  <p className="font-medium text-sm">{selectedClaim.video}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Uploader</Label>
                  <p className="font-medium">{selectedClaim.uploader}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Platform</Label>
                  <p className="font-medium text-red-600 dark:text-red-400">{selectedClaim.platform}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium capitalize">{selectedClaim.status}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Action</Label>
                  <p className="font-medium capitalize">{selectedClaim.action}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Views</Label>
                  <p className="font-medium">{selectedClaim.views?.toLocaleString() || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Detection Date</Label>
                  <p className="font-medium">{selectedClaim.date}</p>
                </div>
              </div>
              {selectedClaim.reason && (
                <div>
                  <Label className="text-muted-foreground">Dispute Reason</Label>
                  <p className="mt-1 text-sm">{selectedClaim.reason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Claim Action</DialogTitle>
            <DialogDescription>Change how this copyright claim is handled</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Current Movie</Label>
                <p className="font-medium">{selectedClaim.movie}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="action">Select Action</Label>
                <Select value={selectedAction} onValueChange={setSelectedAction}>
                  <SelectTrigger id="action">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blocked">Block Video</SelectItem>
                    <SelectItem value="monetized">Monetize (Claim Revenue)</SelectItem>
                    <SelectItem value="tracked">Track Views Only</SelectItem>
                    <SelectItem value="removed">Remove Claim</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {selectedAction === "blocked" && "The video will be blocked from viewing"}
                  {selectedAction === "monetized" && "You will receive ad revenue from this video"}
                  {selectedAction === "tracked" && "The video will be tracked but remain available"}
                  {selectedAction === "removed" && "The claim will be removed entirely"}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAction}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Dispute</DialogTitle>
            <DialogDescription>Evaluate this fair use claim dispute</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">This claim is under dispute</p>
                <p className="text-xs text-muted-foreground">
                  The uploader claims fair use. Review their reasoning and decide whether to approve or deny.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Movie</Label>
                  <p className="font-medium">{selectedClaim.movie}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Uploader</Label>
                  <p className="font-medium">{selectedClaim.uploader}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDisputeDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                alert(`Dispute denied for claim ${selectedClaim?.id}`)
                setShowDisputeDialog(false)
              }}
            >
              Deny Dispute
            </Button>
            <Button
              variant="default"
              onClick={() => {
                alert(`Dispute approved for claim ${selectedClaim?.id}. Claim will be removed.`)
                setShowDisputeDialog(false)
              }}
            >
              Approve Dispute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showFingerprintDialog} onOpenChange={setShowFingerprintDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Digital Fingerprint Analysis</DialogTitle>
            <DialogDescription>
              Detailed view of video and audio fingerprints extracted from your master copy
            </DialogDescription>
          </DialogHeader>
          {selectedClaim && selectedClaim.fingerprints && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">{selectedClaim.movieName}</h3>
                <p className="text-sm text-muted-foreground">{selectedClaim.fileName}</p>
              </div>

              {/* Video Fingerprint Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold">Video Fingerprint</h4>
                </div>
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div>
                    <Label className="text-muted-foreground">Hash Signature</Label>
                    <p className="font-mono text-sm mt-1">{selectedClaim.fingerprints.videoHash}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Sample Frames Analysis</Label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((frame) => (
                        <div key={frame} className="relative">
                          <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-400">Frame {frame * 1000}</span>
                          </div>
                          <div className="mt-1 p-2 bg-blue-500/10 rounded text-xs">
                            <p className="font-mono truncate">{generateHash("video").substring(0, 16)}...</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Total Frames Analyzed</Label>
                      <p className="font-semibold">{selectedClaim.fingerprints.totalFrames.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Sampling Rate</Label>
                      <p className="font-semibold">Every 30 frames</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Fingerprint Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Waves className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-semibold">Audio Fingerprint</h4>
                </div>
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div>
                    <Label className="text-muted-foreground">Hash Signature</Label>
                    <p className="font-mono text-sm mt-1">{selectedClaim.fingerprints.audioHash}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Audio Waveform Pattern</Label>
                    <div className="mt-2 h-32 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded flex items-end justify-around px-2 py-2">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Duration</Label>
                      <p className="font-semibold">{selectedClaim.fingerprints.duration}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Sample Rate</Label>
                      <p className="font-semibold">44.1 kHz</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Channels</Label>
                      <p className="font-semibold">Stereo (2)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Protection Status: Active
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your content is now being monitored across all major piracy platforms. Any matching uploads will be
                  automatically detected and action will be taken according to your preferences.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFingerprintDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper function for demo
function generateHash(type: "video" | "audio"): string {
  const chars = "0123456789abcdef"
  let hash = type === "video" ? "VH-" : "AH-"
  for (let i = 0; i < 32; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}
