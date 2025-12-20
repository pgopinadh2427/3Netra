"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Film, Calendar, Eye, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { teluguMovies } from "@/lib/telugu-movies-data"

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMovies = teluguMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-blue-950 dark:via-gray-900 dark:to-amber-950">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="3Netra Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                Telugu Movie Database
              </h1>
              <p className="text-xs text-muted-foreground">Protected Content Library</p>
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Protected Movies</CardTitle>
            <CardDescription>
              Browse {teluguMovies.length}+ registered Telugu movies in our copyright protection database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by movie name or director..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="hover:shadow-lg transition-shadow border-2 hover:border-primary overflow-hidden"
            >
              {movie.poster && (
                <div className="relative h-80 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={`${movie.title} poster`}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-green-500/90 text-white border-green-500/30 backdrop-blur-sm">
                    <Shield className="w-3 h-3 mr-1" />
                    Protected
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{movie.title}</CardTitle>
                <CardDescription className="line-clamp-2">{movie.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Released:</span>
                    <span className="font-medium">{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Director:</span>
                    <span className="font-medium">{movie.director}</span>
                  </div>
                  {movie.detections && (
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{movie.detections} matches detected</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <Card className="mt-8">
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No movies found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
