"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Shield, Video, AlertCircle, Database, TrendingUp, CheckCircle, Upload, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false)
  const [demoStep, setDemoStep] = useState(0)

  const handleStartDemo = () => {
    setShowDemo(true)
    setDemoStep(0)

    const steps = [1, 2, 3, 4, 5]
    steps.forEach((step, index) => {
      setTimeout(
        () => {
          setDemoStep(step)
        },
        (index + 1) * 2500,
      )
    })
  }

  const handleCloseDemo = () => {
    setShowDemo(false)
    setDemoStep(0)
  }

  const demoSteps = [
    {
      step: 0,
      title: "Master Copy Upload",
      description: "Copyright holder uploads the original movie file to 3Netra",
      icon: Upload,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      step: 1,
      title: "Video Frame Analysis",
      description: "AI extracts and analyzes key frames, creating unique visual fingerprints for each scene",
      icon: Video,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      showFrames: true,
    },
    {
      step: 2,
      title: "Audio Pattern Recognition",
      description: "System analyzes audio waveforms, dialogue, and music to create audio fingerprints",
      icon: Shield,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      showAudio: true,
    },
    {
      step: 3,
      title: "Database Registration",
      description: "All fingerprints are stored in 3Netra's protected database with copyright information",
      icon: Database,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      step: 4,
      title: "Continuous Monitoring",
      description: "System scans all new uploads on platforms for matching fingerprints in real-time",
      icon: Play,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      step: 5,
      title: "Match Detection & Action",
      description: "When pirated content is detected, automatic actions are triggered (block, monetize, track)",
      icon: X,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950 dark:via-gray-900 dark:to-amber-950">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="3Netra Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                3Netra
              </h1>
              <p className="text-xs text-muted-foreground">Copyright Protection System</p>
            </div>
          </div>
          <nav className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/register">Register Content</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/scan">Scan Video</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/claims">Claims</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/database">Movie Database</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
            Powered by Advanced AI Recognition
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-blue-600 via-amber-600 to-blue-600 bg-clip-text text-transparent">
            Protect Movies from Piracy by 3Netra
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            3Netra automatically scans uploaded videos against a comprehensive database of movies, identifying matches
            through digital fingerprinting and protecting your creative rights.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              <Link href="/register">Register Your Content</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/scan">Scan a Video</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">How 3Netra Works</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
                <Database className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle>Content Registration</CardTitle>
              <CardDescription>
                Copyright holders register their movies with exclusive rights. Our system creates unique digital
                fingerprints for each frame and audio segment.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Automatic Scanning</CardTitle>
              <CardDescription>
                Every uploaded video is scanned frame-by-frame and second-by-second against our database, detecting
                exact or near matches instantly upon upload.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle>Claims Management</CardTitle>
              <CardDescription>
                Copyright owners can block videos, monetize with ads, or track viewership. Creators can dispute claims
                under fair use provisions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3">See Digital Fingerprinting in Action</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch how 3Netra analyzes video frames and audio patterns to create unique fingerprints that protect your
              content
            </p>
          </div>

          <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-blue-500/5">
            <CardContent className="py-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Play className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-3">Interactive Demo</h4>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                See sample video frames and audio waveforms being analyzed in real-time to understand how our AI
                identifies and protects copyrighted content
              </p>
              <Button
                size="lg"
                onClick={handleStartDemo}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 gap-2"
              >
                <Play className="w-5 h-5" />
                Start Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {showDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Digital Fingerprinting Process</CardTitle>
                  <CardDescription>See how 3Netra analyzes video and audio to protect your content</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCloseDemo}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-6">
                {/* Progress indicator */}
                <div className="flex items-center justify-between mb-8">
                  {demoSteps.map((step, index) => (
                    <div key={step.step} className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          demoStep >= step.step ? "bg-amber-500 text-white scale-110" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {demoStep > step.step ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      {index < demoSteps.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-2 transition-all ${
                            demoStep > step.step ? "bg-amber-500" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Demo steps */}
                {demoSteps.map((step) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.step}
                      className={`transition-all duration-500 ${
                        demoStep === step.step
                          ? "opacity-100 scale-100"
                          : demoStep > step.step
                            ? "opacity-50 scale-95"
                            : "opacity-30 scale-90"
                      }`}
                    >
                      <div
                        className={`${step.bgColor} border-2 ${
                          demoStep === step.step ? "border-amber-500 shadow-lg" : "border-transparent"
                        } rounded-xl p-6 transition-all`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`${step.bgColor} p-4 rounded-xl`}>
                            <Icon className={`w-8 h-8 ${step.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{step.title}</h3>
                              {demoStep === step.step && (
                                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full animate-pulse">
                                  Active
                                </span>
                              )}
                              {demoStep > step.step && (
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                              )}
                            </div>
                            <p className="text-muted-foreground mb-4">{step.description}</p>

                            {/* Video frames visualization */}
                            {demoStep === step.step && step.showFrames && (
                              <div className="mt-4 space-y-3">
                                <p className="text-sm font-semibold">Sample Video Frames:</p>
                                <div className="grid grid-cols-4 gap-3">
                                  {[1, 2, 3, 4].map((frame) => (
                                    <div
                                      key={frame}
                                      className="relative aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden border-2 border-amber-500/30"
                                    >
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <Video className="w-8 h-8 text-white/50" />
                                      </div>
                                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2">
                                        <div className="text-[10px] text-white font-mono">Frame {frame * 250}</div>
                                        <div className="text-[9px] text-amber-400">
                                          Hash: {Math.random().toString(36).substring(7)}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                  <span>Analyzing frames: 1,234 / 10,000</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                  <div className="bg-amber-500 h-2 rounded-full w-[12%] animate-pulse" />
                                </div>
                              </div>
                            )}

                            {/* Audio waveform visualization */}
                            {demoStep === step.step && step.showAudio && (
                              <div className="mt-4 space-y-3">
                                <p className="text-sm font-semibold">Audio Pattern Analysis:</p>
                                <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg p-4 border-2 border-amber-500/30">
                                  <div className="flex items-end justify-around h-32 gap-1">
                                    {Array.from({ length: 50 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className="bg-amber-500 w-1 rounded-t animate-pulse"
                                        style={{
                                          height: `${Math.random() * 100}%`,
                                          animationDelay: `${i * 0.05}s`,
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <div className="mt-3 space-y-1">
                                    <div className="flex justify-between text-xs text-white/70">
                                      <span>Dialogue Detection</span>
                                      <span className="text-green-400">95% Match</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-white/70">
                                      <span>Background Music</span>
                                      <span className="text-green-400">98% Match</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-white/70">
                                      <span>Sound Effects</span>
                                      <span className="text-green-400">92% Match</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                  <span>Processing audio segments: 567 / 2,400</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2">
                                  <div className="bg-purple-500 h-2 rounded-full w-[24%] animate-pulse" />
                                </div>
                              </div>
                            )}

                            {/* Monitoring visualization */}
                            {demoStep === step.step && step.step === 4 && (
                              <div className="mt-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>
                                    Scanning YouTube uploads... <span className="text-amber-600">3,245 videos/min</span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>
                                    Monitoring Facebook videos...{" "}
                                    <span className="text-amber-600">1,892 videos/min</span>
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span>
                                    Checking piracy sites... <span className="text-amber-600">567 sources</span>
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Match detection visualization */}
                            {demoStep === step.step && step.step === 5 && (
                              <div className="mt-4 p-4 bg-card border-2 border-red-500/30 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                  <div className="flex-1">
                                    <p className="font-semibold text-red-600 dark:text-red-400 mb-1">
                                      Pirated Content Detected!
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      Unauthorized upload found - Video match: 96% | Audio match: 98%
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                      <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs rounded">
                                        Action: Blocked
                                      </span>
                                      <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs rounded">
                                        Copyright Claim Filed
                                      </span>
                                      <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded">
                                        Owner Notified
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <div className="flex justify-between items-center pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Step {demoStep + 1} of {demoSteps.length}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDemoStep(0)
                        handleStartDemo()
                      }}
                    >
                      Restart Demo
                    </Button>
                    <Button onClick={handleCloseDemo}>Close</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-amber-500 to-blue-600 text-white border-0">
          <CardContent className="py-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-4xl font-bold mb-1">1,500+</div>
                <div className="text-sm opacity-90">Registered Movies</div>
              </div>
              <div>
                <Video className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-4xl font-bold mb-1">50K+</div>
                <div className="text-sm opacity-90">Videos Scanned</div>
              </div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-4xl font-bold mb-1">98.5%</div>
                <div className="text-sm opacity-90">Detection Accuracy</div>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <div className="text-4xl font-bold mb-1">25K+</div>
                <div className="text-sm opacity-90">Claims Resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-2 border-amber-500/30 bg-amber-500/5">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-2xl font-bold mb-3">Ready to Protect Your Content?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join major Telugu film studios and production houses using 3Netra to protect their intellectual property.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              <Link href="/register">Get Started Now</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 3Netra Copyright Protection System. Protecting Telugu Cinema.</p>
        </div>
      </footer>
    </div>
  )
}
