import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const recentScans = [
    { id: 1, video: "upload_2024_001.mp4", status: "match", movie: "RRR", confidence: 98.5, timestamp: "2 mins ago" },
    { id: 2, video: "video_test_002.mp4", status: "clean", movie: null, confidence: 0, timestamp: "15 mins ago" },
    {
      id: 3,
      video: "content_check_003.mp4",
      status: "match",
      movie: "Pushpa",
      confidence: 95.2,
      timestamp: "1 hour ago",
    },
    {
      id: 4,
      video: "upload_user_004.mp4",
      status: "match",
      movie: "Baahubali 2",
      confidence: 99.1,
      timestamp: "2 hours ago",
    },
  ]

  const topMatches = [
    { movie: "RRR", matches: 1250, trend: "+12%" },
    { movie: "Pushpa", matches: 980, trend: "+8%" },
    { movie: "Baahubali 2", matches: 850, trend: "+5%" },
    { movie: "KGF Chapter 2", matches: 720, trend: "+15%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950 dark:via-gray-900 dark:to-amber-950">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="3Netra Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                3Netra Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">Real-time Monitoring</p>
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
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Scans Today</CardDescription>
              <CardTitle className="text-3xl">1,247</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+18% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Matches Detected</CardDescription>
              <CardTitle className="text-3xl">856</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">68.6% detection rate</span>
              </div>
              <Progress value={68.6} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Claims</CardDescription>
              <CardTitle className="text-3xl">142</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span>23 pending review</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>System Status</CardDescription>
              <CardTitle className="text-3xl flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
                Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>99.8% uptime</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Scans */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Video Scans</CardTitle>
              <CardDescription>Latest copyright detection results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{scan.video}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {scan.status === "match" ? (
                          <>
                            <Badge variant="destructive" className="text-xs">
                              Match Found
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {scan.movie} ({scan.confidence}%)
                            </span>
                          </>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-green-500/20 text-green-700 dark:text-green-300"
                          >
                            Clean
                          </Badge>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{scan.timestamp}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/scan">View All Scans</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Top Matched Movies */}
          <Card>
            <CardHeader>
              <CardTitle>Top Matched Movies</CardTitle>
              <CardDescription>Most frequently detected content this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMatches.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.movie}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={(item.matches / 1500) * 100} className="flex-1" />
                        <span className="text-xs text-muted-foreground w-16">{item.matches}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600 dark:text-green-400 dark:border-green-400"
                    >
                      {item.trend}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/database">View Full Database</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Button asChild size="lg" variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
            <Link href="/register">
              <Shield className="w-6 h-6" />
              <span>Register New Content</span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
            <Link href="/scan">
              <AlertTriangle className="w-6 h-6" />
              <span>Scan Video Now</span>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-auto py-6 flex-col gap-2 bg-transparent">
            <Link href="/claims">
              <CheckCircle className="w-6 h-6" />
              <span>Manage Claims</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
